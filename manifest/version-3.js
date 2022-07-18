module.exports = function (doc) {

  function renameAdaptor(oldName, newName) {
    for (const step of doc.transform) {
      if (step.type === "adaptor") {
        if (step.adaptor === oldName) {
          step.adaptor = newName;
        }
      }
    }
  }

  function renameAdaptorInput(adaptorName, oldName, newName) {
    for (const step of doc.transform) {
      if (step.type === "adaptor") {
        if (step.adaptor === adaptorName) {
          for (const binding of step.binding) {
            if (binding.target === oldName) {
              binding.target = newName;
            }
          }
        }
      }
    }
  }

  function changeAdaptorInput(adaptorName, oldName, func) {
    for (const step of doc.transform) {
      if (step.type === "adaptor") {
        if (step.adaptor === adaptorName) {
          for (const binding of step.binding) {
            if (binding.target === oldName) {
              func(binding);
            }
          }
        }
      }
    }
  }

  function renameAdaptorOutput(adaptorName, oldName, newName) {
    const renamedStepNames = [];

    // Find all the steps which use the renamed adaptor
    for (const step of doc.transform) {
      if (step.type === "adaptor" && step.adaptor === adaptorName) {
        renamedStepNames.push(step.name);
      }
    }

    // Find the steps which having bindings to the renamed steps
    for (const step of doc.transform) {
      for (const binding of step.binding) {
        if (
          binding.type === "transformation"
          &&
          binding.argument === oldName
          &&
          renamedStepNames.includes(step.transformation)
        ) {
          binding.name = newName;
        }
      }
    }

    // Find the outputs which having bindings to the renamed steps
    for (const binding of doc.output) {
      if (
        binding.argument === oldName
        &&
        renamedStepNames.includes(binding.transformation)
      ) {
        binding.name = newName;
      }
    }
  }

  renameAdaptor("csv-file-to-datatable", "import-from-csv-file");
  renameAdaptorInput("import-from-csv-file", "csv", "file");
  renameAdaptorInput("import-from-csv-file", "separator", "delimiter");

  changeAdaptorInput("join-datatables", "columns", (binding) => {
    if (binding.type === "value") {
      binding.value = binding.value.map(([ key ]) => key);
    }
  });
  renameAdaptorOutput("join-datatable", "skipped", "unmatched");

  renameAdaptorInput("calculate-time-difference", "reference column", "column two");
  renameAdaptorInput("calculate-time-difference", "reference format", "column two format");
  renameAdaptorInput("calculate-time-difference", "value column", "column one");
  renameAdaptorInput("calculate-time-difference", "value format", "column one format");
  renameAdaptorInput("calculate-time-difference", "target column", "difference column");

  renameAdaptor("columns-concatenation", "concatenate-columns");
  renameAdaptorInput("concatenate-columns", "delimiter", "separator");
  renameAdaptorInput("concatenate-columns", "target", "concatenated column");

  renameAdaptorInput("concatenate-columns", "left", "text one");
  renameAdaptorInput("concatenate-columns", "right", "text two");

  renameAdaptorInput("create-google-drive-folder", "parent", "parent folder");
  renameAdaptorInput("create-google-drive-folder", "name", "folder name");

  renameAdaptor("csv-to-datatable", "convert-text-to-datatable");
  renameAdaptorInput("convert-text-to-datatable", "separator", "delimiter");

  renameAdaptor("datatable-columns", "list-datatable-columns");
  renameAdaptorOutput("list-datatable-columns", "columns", "column names");

  renameAdaptor("datatable-to-graph", "create-graph-from-datatable");
  renameAdaptorInput("create-graph-from-datatable", "from", "from column");
  renameAdaptorInput("create-graph-from-datatable", "to", "to column");
  renameAdaptorInput("create-graph-from-datatable", "direction", "directed");
  changeAdaptorInput("create-graph-from-datatable", "directed", (binding) => {
    if (binding.type === "value") {
      binding.value = (binding.value !== "none");
    }
  });

  renameAdaptor("datatable-to-dbf-file", "export-to-dbf-file");
  renameAdaptorInput("export-to-dbf-file", "columns", "column types");
  renameAdaptorInput("export-to-dbf-file", "filename", "output file name");
  renameAdaptorOutput("export-to-csv-file", "dbf", "file");

  renameAdaptor("datatable-to-csv", "export-to-csv-file");
  renameAdaptorInput("export-to-csv-file", "separator", "delimiter");
  renameAdaptorInput("export-to-csv-file", "filename", "output file name");
  renameAdaptorOutput("export-to-csv-file", "csv", "file");

  renameAdaptor("datatable-to-list", "create-list-from-datatable");
  renameAdaptor("create-list-from-datatable", "column", "column name");

  renameAdaptor("datatable-to-map", "create-map-from-datatable");

  renameAdaptor("date-to-text", "convert-date-to-text");

  renameAdaptor("dbf-file", "import-from-dbf-file");

  renameAdaptor("dot-to-graph", "create-graph-from-dot");

  renameAdaptor("download-file", "import-file-from-url");

  renameAdaptor("dropbox-file", "import-file-from-dropbox");

  renameAdaptor("epicollect-project", "import-from-epicollect-project");

  renameAdaptor("figshare-file", "import-file-from-figshare");

  renameAdaptor("filter-blank-values", "filter-blank-rows");

  renameAdaptor("find-value", "find-value-in-list");

  renameAdaptor("ftp-file", "import-file-from-url");

  renameAdaptor("force-directed-layout", "apply-force-directed-layout");

  renameAdaptorInput("format-date-column", "source column", "original column name");
  renameAdaptorInput("format-date-column", "source format", "original format");
  renameAdaptorInput("format-date-column", "target column", "new column name");
  renameAdaptorInput("format-date-column", "target format", "new format");

  renameAdaptor("gather-rows", "reshape-wide-to-long");

  renameAdaptor("google-drive-file", "import-file-from-google-drive");

  renameAdaptor("google-spreadsheet", "import-from-google-spreadsheet");

  renameAdaptor("graph-to-dot", "export-graph-to-dot-file");

  /* ******************** */

  renameAdaptorInput("reverse-geocoding", "mapboxApiKey", "api key");
  renameAdaptorInput("reverse-geocoding", "longitudeColumn", "longitude column");
  renameAdaptorInput("reverse-geocoding", "latitudeColumn", "latitude column");
  renameAdaptorInput("reverse-geocoding", "placeType", "feature type");
  renameAdaptorInput("reverse-geocoding", "resultColumn", "feature column");

  renameAdaptorInput("forward-geocoding", "placeColumn", "query column");
  renameAdaptorInput("forward-geocoding", "mapboxApiKey", "api key");
  renameAdaptorInput("forward-geocoding", "longitudeColumn", "longitude column");
  renameAdaptorInput("forward-geocoding", "latitudeColumn", "latitude column");
  renameAdaptorInput("forward-geocoding", "placeType", "feature type");
  renameAdaptorInput("forward-geocoding", "resultColumn", "feature column");

  renameAdaptor("list-to-datatable", "convert-list-to-datatable");
  renameAdaptorInput("list-to-datatable", "column", "column name");

  renameAdaptor("lookup-map-value", "find-value-in-map");
  renameAdaptorInput("find-value-in-map", "dictionary", "map");
  renameAdaptorInput("find-value-in-map", "query", "key");
  renameAdaptorInput("find-value-in-map", "default", "default value");

  renameAdaptor("map-columns", "rename-columns");

  renameAdaptor("merge-datatables", "append-datatables");
  renameAdaptorInput("append-datatables", "intersect columns", "exclude unmatched columns");

  doc.version = 3;

  return doc;
};
