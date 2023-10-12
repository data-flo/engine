const Papaparse = require("papaparse");

function parseCsvHeaderRow(input) {
  let headerRow;

  Papaparse.parse(
    input,
    {
      download: false,
      dynamicTyping: true,
      step: (results, parser) => {
        parser.abort();
        const row = results.data;
        // Test the row
        headerRow = row;
      },
    },
  );

  return (
    headerRow
      .filter(Boolean)
      .map((x) => (x.trim ? x.trim() : x))
  );
}

function createFileDescriptor(id, format, name, data, url) {
  const file = {
    id,
    format,
    name,
  };

  if (url) {
    file.url = url;
  }
  else if (data) {
    file.blob = data;
  }

  return file;
}

module.exports = function (originalDoc) {
  const doc = {
    charts: {},
    datasets: {},
    files: {},
    filters: {},
    maps: {},
    meta: {},
    networks: {},
    notes: {},
    panes: {},
    styles: {},
    tables: {},
    timelines: {},
    trees: {},
    version: 1,
  };

  //#region Metadata
  doc.meta = {
    name: originalDoc.name,
    description: originalDoc.description,
    email: originalDoc.email,
    website: originalDoc.website,
  };
  //#endregion

  // #region Convert datasets
  const fields = parseCsvHeaderRow(originalDoc.dataFile);

  const fieldNameMap = new Map();
  // const fields = [];
  for (const item of fields) {
    if (item) {
      fieldNameMap.set(item, item);
      fieldNameMap.set(item.toLowerCase && item.toLowerCase(), item);
    }
  }

  const idFieldName = fieldNameMap.get(originalDoc?.settings?.id) ?? fieldNameMap.get("__id") ?? fieldNameMap.get("id");

  doc.files["data-file-1"] = createFileDescriptor(
    "data-file-1",
    "text/csv",
    "data.csv",
    originalDoc.dataFile,
    originalDoc.dataUrl,
  );

  doc.datasets["dataset-1"] = {
    file: "data-file-1",
    idFieldName,
  };

  doc.tables["table-1"] = {
    dataset: "dataset-1",
    file: "data-file-1",
    title: "Metadata",
    columns: fields
      .filter((x) => x.match && !x.match(/(.+)__(color|colour|shape|pattern|url)$/i))
      .map((field) => ({ field })),
  };

  if (originalDoc?.savedState?.table) {
    const {
      controls,
      mode,
      filters,
      sort,
    } = originalDoc.savedState.table;
    Object.assign(
      doc.tables["table-1"],
      {
        displayMode: mode,
        controls,
      },
    );
    if (Array.isArray(filters)) {
      doc.filters.dataFilters = filters.map(
        (x) => ({
          field: fieldNameMap.get(x.field),
          operator: x.operator,
          value: [ x.value ],
        })
      );
    }

    if (sort?.column && sort?.direction) {
      const tableColumn = doc.tables["table-1"].columns.find((x) => x.field === fieldNameMap.get(sort.column));
      if (tableColumn) {
        tableColumn.sort = sort.direction;
      }
    }
  }

  //#endregion

  //#region Add a map if the data file includes default LATITUDE and LONGITUDE columns
  const latitudeField = fields.find((x) => (x === doc?.settings?.map_latitude) || /(__LATITUDE$)|(^LATITUDE$)/i.test(x));
  const longitudeField = fields.find((x) => (x === doc?.settings?.map_longitude) || /(__LONGITUDE$)|(^LONGITUDE$)/i.test(x));
  if (latitudeField && longitudeField) {
    doc.maps["map-1"] = {
      title: "Map",
      dataType: "geographic-coordinates",
      "coordinate-unit": "decimal-degrees",
      latitudeField,
      longitudeField,
      viewport: null,
    };
    if (originalDoc.savedState && originalDoc.savedState.map) {
      const {
        centre,
        zoom,
        controls,
        lasso,
        path,
        style,
        scaleMarkers,
        nodeSize,
        // tileLayerUrl,
        // tileLayerOpts,
        geojson,
      } = originalDoc.savedState.map;
      if (Array.isArray(centre) && Number.isInteger(zoom)) {
        doc.maps["map-1"].viewport = {
          latitude: centre[0],
          longitude: centre[1],
          zoom: (zoom - 1),
        };
      }
      if (path && Array.isArray(path)) {
        doc.maps["map-1"].path = path.map(({ lng, lat }) => ([ lng, lat ]));
      }
      if (typeof lasso === "boolean") {
        doc.maps["map-1"].lasso = lasso;
      }
      if (geojson) {
        doc.maps["map-1"].geodata = {
          file: "geo-file-1",
          format: "geojson",
        };
        doc.files["geo-file-1"] = createFileDescriptor(
          "geo-file-1",
          "application/geo+json",
          "regions.geojson",
          geojson,
        );
      }
      Object.assign(
        doc.maps["map-1"],
        {
          controls,
          style,
          nodeSize,
          scaleMarkers,
        },
      );
    }
  }
  //#endregion

  // #region Add trees
  if (originalDoc.treeFile || originalDoc.treeUrl) {
    doc.files["tree-file-1"] = createFileDescriptor(
      "tree-file-1",
      "text/x-nh",
      "tree.nwk",
      originalDoc.treeFile,
      originalDoc.treeUrl,
    );
    doc.trees["tree-1"] = {
      title: "Tree",
      file: "tree-file-1",
      labelField: idFieldName,
    };
    if (Array.isArray(originalDoc?.savedState?.filters?.blockFilter)) {
      doc.trees["tree-1"].blocks = originalDoc.savedState.filters.blockFilter.map((x) => fieldNameMap.get(x));
    }
    if (originalDoc?.savedState?.tree) {
      const {
        path,
        ids,
        lasso,
      } = originalDoc.savedState.tree;
      if (path && Array.isArray(path)) {
        doc.trees["tree-1"].path = path.map(({ x, y }) => ([ x, y ]));
      }
      Object.assign(
        doc.trees["tree-1"],
        {
          ids,
          lasso,
        },
      );
    }
    if (originalDoc?.savedState?.tree?.phylocanvas) {
      const treeSavedState = originalDoc.savedState.tree;
      doc.trees["tree-1"].nodeSize = treeSavedState.phylocanvas.nodeSize;
      doc.trees["tree-1"].type = treeSavedState.phylocanvas.type;
      doc.trees["tree-1"].blockSize = treeSavedState.phylocanvas.blockLength;
      doc.trees["tree-1"].showLeafLabels = treeSavedState.phylocanvas.showLeafLabels;
      // doc.trees["tree-1"].showShapeBorders = treeSavedState.phylocanvas.showShapeBorders;
      doc.trees["tree-1"].rootId = treeSavedState.phylocanvas.rootId;
      doc.trees["tree-1"].ids = treeSavedState.ids || treeSavedState.subtreeIds;
    }
  }
  // #endregion

  //#region Add a timeline if data include YEAR, MONTH, and DAY columns
  {
    const timelineField = fields.find((x) => x === originalDoc?.settings?.timeline_field);
    if (timelineField) {
      doc.timelines["timeline-1"] = {
        title: "Timeline",
        dataType: "formatted-value",
        valueField: timelineField,
      };
    }
    else {
      const yearField = fields.find((x) => /(__year$)|(^year$)/i.test(x));
      const monthField = fields.find((x) => /(__month$)|(^month$)/i.test(x));
      const dayField = fields.find((x) => /(__day$)|(^day$)/i.test(x));
      if (yearField) {
        doc.timelines["timeline-1"] = {
          title: "Timeline",
          dataType: "year-month-day",
          yearField,
          monthField: monthField || undefined,
          dayField: dayField || undefined,
        };
      }
    }
    if (doc.timelines["timeline-1"] && originalDoc.savedState && originalDoc.savedState.timeline) {
      const {
        // bounds,
        nodeSize,
        playing,
        speed,
        // unit,
      } = originalDoc.savedState.timeline;
      Object.assign(
        doc.timelines["timeline-1"],
        {
          nodeSize,
          playing,
          speed,
          unit: null, // set unit to auto
        },
      );
    }
  }
  //#endregion

  //#region Add networks

  if (originalDoc.networkFile || originalDoc.networkUrl) {
    doc.files["network-file-1"] = createFileDescriptor(
      "network-file-1",
      "text/vnd.graphviz",
      "network.dot",
      originalDoc.networkFile,
      originalDoc.networkUrl,
    );
    doc.networks["network-1"] = {
      title: "Network",
      file: "network-file-1",
      nodeField: idFieldName,
    };
    if (originalDoc.savedState && originalDoc.savedState.network) {
      const {
        controls,
        edgeColourFilter,
        edgeLabelFilter,
        edgeLineStyleFilter,
        edgeLineWidthFilter,
        fontSize,
        lasso,
        layout,
        nodeSize,
        path,
        randomSeed,
        showLabels,
        showNodes,
        viewport,
      } = originalDoc.savedState.network;
      Object.assign(
        doc.networks["network-1"],
        {
          controls,
          edgeColourField: fieldNameMap.get(edgeColourFilter),
          edgeLabelField: fieldNameMap.get(edgeLabelFilter),
          edgeLineStyleField: fieldNameMap.get(edgeLineStyleFilter),
          edgeLineWidthField: fieldNameMap.get(edgeLineWidthFilter),
          fontSize,
          lasso,
          layout,
          nodeSize,
          randomSeed,
          showLabels,
          showNodes,
          viewport,
        },
      );
      if (path && Array.isArray(path)) {
        doc.networks["network-1"].path = path.map(({ x, y }) => ([ x, y ]));
      }
    }
  }

  //#endregion

  //#region Add charts

  if (
    originalDoc.savedState
    &&
    originalDoc.savedState.chart
    &&
    originalDoc.savedState.layout
    &&
    originalDoc.savedState.layout.availableComponents
    &&
    originalDoc.savedState.layout.availableComponents.includes("Chart")
  ) {
    const {
      controls,
      interpolate,
      seriesField,
      // seriesFieldType,
      seriesStacking,
      type,
      xAxisField,
      // xAxisType,
      yAxisField,
      // yAxisType,
      spec,
    } = originalDoc.savedState.chart;
    doc.charts["chart-1"] = {
      title: "Chart",
      controls,
      interpolate,
      seriesStacking,
      type,
      xAxisField: fieldNameMap.get(xAxisField),
      yAxisField: fieldNameMap.get(yAxisField),
      seriesField: fieldNameMap.get(seriesField),
      spec,
      // xAxisType,
      // yAxisType,
      // seriesType: seriesFieldType,
    };
  }

  //#endregion

  //#region Add notes

  if (
    originalDoc.savedState
    &&
    originalDoc.savedState.data
    &&
    originalDoc.savedState.data.note
  ) {
    doc.notes["note-1"] = {
      title: "Note",
      source: originalDoc.savedState.data.note,
    };
  }

  //#endregion

  //#region Filters and styles
  if (
    originalDoc.savedState
    &&
    originalDoc.savedState.filters
  ) {
    doc.styles.coloursField = fieldNameMap.get(originalDoc.savedState.filters.colourFilter);
    doc.styles.labelsField = fieldNameMap.get(originalDoc.savedState.filters.labelFilter);
    doc.styles.shapesField = fieldNameMap.get(originalDoc.savedState.filters.shapeFilter);
  }

  if (originalDoc?.savedState?.filters?.search) {
    const { operator, value } = originalDoc.savedState.filters.search;
    if ((value ?? undefined) !== undefined) {
      doc.filters.searchValue = value;
      doc.filters.searchOperator = operator;
    }
  }

  if (originalDoc?.savedState?.filters?.highlightedIds) {
    doc.filters.selection = originalDoc.savedState.filters.highlightedIds;
  }

  //#endregion

  doc.schema = "https://microreact.org/schema/v1.json";

  return doc;
};
