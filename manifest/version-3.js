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

  function changeAdaptor(oldName, func) {
    for (const step of doc.transform) {
      if (step.type === "adaptor") {
        if (step.adaptor === oldName) {
          func(step);
        }
      }
    }
  }

  function renameStepInput(step, oldName, newName) {
    for (const binding of step.binding) {
      if (binding.target === oldName) {
        binding.target = newName;
      }
    }
  }

  function changeStepInput(step, oldName, func) {
    for (const binding of step.binding) {
      if (binding.target === oldName) {
        func(binding);
      }
    }
  }

  function addInput(step, inputName, value) {
    step.binding.push({
      target: inputName,
      type: "value",
      value,
    });
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

  function deleteAdaptorInput(adaptorName, oldName) {
    for (const step of doc.transform) {
      if (step.type === "adaptor") {
        if (step.adaptor === adaptorName) {
          const index = step.binding.findIndex((x) => x.target === oldName);
          if (index > -1) {
            step.binding.splice(index, 1);
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
        binding.argument = newName;
      }
    }
  }

  renameAdaptorInput("add-column", "column", "column name");

  renameAdaptor("csv-file-to-datatable", "import-from-csv-file");
  renameAdaptorInput("import-from-csv-file", "csv", "file");
  renameAdaptorInput("import-from-csv-file", "columns", "column names");
  renameAdaptorInput("import-from-csv-file", "separator", "delimiter");

  changeAdaptorInput("join-datatables", "columns", (binding) => {
    if (binding.type === "value") {
      binding.value = binding.value.map(([key]) => key);
    }
  });
  changeAdaptorInput("join-datatables", "inner join", (binding) => {
    if (binding.type === "value") {
      binding.target = "join type";
      binding.value = binding.value ? "Inner Join" : "Left Join";
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

  renameAdaptor("create-microreact-project", "export-to-microreact-project");
  renameAdaptorInput("export-to-microreact-project", "name", "project name");

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
  renameAdaptorOutput("export-to-dbf-file", "dbf", "file");

  renameAdaptor("datatable-to-csv", "export-to-csv-file");
  renameAdaptor("datatable-to-csv-file", "export-to-csv-file");
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

  renameAdaptor("extend-datatable", "map-column-values");
  renameAdaptorInput("map-column-values", "source", "original column");
  renameAdaptorInput("map-column-values", "target", "new column");

  renameAdaptor("epicollect-project", "import-from-epicollect-project");

  renameAdaptor("figshare-file", "import-file-from-figshare");

  changeAdaptor("filter-blank-values", (step) => {
    step.adaptor = "filter-rows";
    renameStepInput(step, "column", "column name");
    addInput(step, "filter type", "is-blank");
  });

  changeAdaptor("filter-rows-numerically", (step) => {
    step.adaptor = "filter-rows";
    renameStepInput(step, "column", "column name");
    changeStepInput(step, "operator", (binding) => {
      if (binding.type === "value") {
        binding.target = "filter type";
        binding.value = ({
          "<": "less-than",
          "<=": "less-than-or-equal",
          ">": "greater-than",
          ">=": "greater-than-or-equal",
        })[binding.value];
      }
      else {
        throw new Error("Invalid binding type");
      }
    });
    renameStepInput(step, "check", "filter value");
  });

  renameAdaptor("find-value", "find-value-in-list");

  renameAdaptor("ftp-file", "import-file-from-url");

  renameAdaptor("force-directed-layout", "apply-force-directed-layout");

  renameAdaptorInput("format-date-column", "source column", "original column name");
  renameAdaptorInput("format-date-column", "source format", "original format");
  renameAdaptorInput("format-date-column", "target column", "new column name");
  renameAdaptorInput("format-date-column", "target format", "new format");

  renameAdaptor("forward-geocoding", "geocoding");
  renameAdaptorInput("geocoding", "placeColumn", "query column");
  renameAdaptorInput("geocoding", "mapboxApiKey", "api key");
  deleteAdaptorInput("geocoding", "api key");
  renameAdaptorInput("geocoding", "longitudeColumn", "longitude column");
  renameAdaptorInput("geocoding", "latitudeColumn", "latitude column");
  renameAdaptorInput("geocoding", "placeType", "feature type");
  renameAdaptorInput("geocoding", "resultColumn", "location column");

  renameAdaptor("gather-rows", "reshape-wide-to-long");
  renameAdaptorInput("reshape-wide-to-long", "key", "key column name");
  renameAdaptorInput("reshape-wide-to-long", "value", "value column name");

  renameAdaptor("google-drive-file", "import-file-from-google-drive");

  renameAdaptor("google-spreadsheet", "import-from-google-sheet");

  renameAdaptor("graph-to-dot", "export-graph-to-dot-file");

  renameAdaptor("list-to-datatable", "convert-list-to-datatable");
  renameAdaptorInput("list-to-datatable", "column", "column name");

  renameAdaptor("lookup-map-value", "find-value-in-map");
  renameAdaptorInput("find-value-in-map", "dictionary", "map");
  renameAdaptorInput("find-value-in-map", "query", "key");
  renameAdaptorInput("find-value-in-map", "default", "default value");

  renameAdaptor("map-columns", "rename-columns");

  renameAdaptor("merge-datatables", "append-datatables");
  renameAdaptorInput("append-datatables", "intersect columns", "exclude unmatched columns");

  renameAdaptor("merge-lists", "append-lists");
  renameAdaptorInput("append-lists", "first list", "first");
  renameAdaptorInput("append-lists", "second list", "second");
  renameAdaptorOutput("append-lists", "merged", "list");

  renameAdaptor("microreact-project", "import-from-microreact-project");

  renameAdaptor("mysql-database", "import-from-mysql");

  renameAdaptor("newick-leaf-labels", "list-newick-leaf-labels");

  renameAdaptor("oracle-database", "import-from-oracle");
  renameAdaptorInput("import-from-oracle", "connectionString", "connection string");

  renameAdaptor("postgres-database", "import-from-postgres");

  renameAdaptor("sql-server-database", "import-from-sql-server");

  renameAdaptorInput("rename-columns", "mapping", "column names");
  renameAdaptorInput("rename-columns", "discard", "discard unmapped");

  renameAdaptorInput("remove-duplicate-rows", "columns", "column names");

  renameAdaptorInput("reverse-geocoding", "mapboxApiKey", "api key");
  deleteAdaptorInput("reverse-geocoding", "api key");
  renameAdaptorInput("reverse-geocoding", "longitudeColumn", "longitude column");
  renameAdaptorInput("reverse-geocoding", "latitudeColumn", "latitude column");
  renameAdaptorInput("reverse-geocoding", "placeType", "location type");
  renameAdaptorInput("reverse-geocoding", "resultColumn", "location column");

  renameAdaptor("sqlite-database", "import-from-sqlite");
  renameAdaptorInput("import-from-sqlite", "sqlite", "sqlite file");

  renameAdaptor("spreadsheet-file", "import-from-spreadsheet-file");

  renameAdaptorInput("select-columns", "columns", "column names");

  renameAdaptorInput("send-email-message", "stmp host", "smto host");
  renameAdaptorInput("send-email-message", "stmp port", "smto port");
  renameAdaptorInput("send-email-message", "stmp username", "smto username");
  renameAdaptorInput("send-email-message", "stmp password", "smto password");
  renameAdaptorInput("send-email-message", "stmp secure", "smto secure");
  renameAdaptorOutput("send-email-message", "response", "status code");

  renameAdaptor("slice-datatable", "select-rows");

  renameAdaptor("slice-list", "select-list-values");

  renameAdaptor("smb-file", "import-file-from-shared-drive");
  renameAdaptorInput("import-file-from-shared-drive", "share", "drive address");

  renameAdaptor("spread-rows", "reshape-long-to-wide");
  renameAdaptorInput("reshape-long-to-wide", "key", "key column name");
  renameAdaptorInput("reshape-long-to-wide", "value", "value column name");

  renameAdaptor("s3-file", "import-file-from-s3");
  renameAdaptorInput("import-file-from-s3", "key", "access key");
  renameAdaptorInput("import-file-from-s3", "secret", "secret key");

  renameAdaptor("mysql-database", "import-from-mysql");

  renameAdaptorInput("split-column", "source", "column name");
  renameAdaptorInput("split-column", "columns", "new column names");

  renameAdaptorInput("replace-blank-values", "replacement", "new value");

  renameAdaptor("split-text", "convert-text-to-list");
  renameAdaptorOutput("convert-text-to-list", "subtexts", "list");

  renameAdaptor("text-template", "create-text-from-template");
  renameAdaptorOutput("create-text-from-template", "output", "text");

  renameAdaptor("unique-list-items", "remove-duplicate-list-values");
  renameAdaptorOutput("remove-duplicate-list-values", "set", "list");

  renameAdaptor("update-smb-file", "export-file-to-share-drive");
  renameAdaptorInput("export-file-to-share-drive", "share", "drive address");
  renameAdaptorInput("export-file-to-share-drive", "update", "drive");

  renameAdaptor("upload-file-to-google-drive", "export-file-to-google-drive");
  renameAdaptorInput("export-file-to-google-drive", "folder", "folder url");
  renameAdaptorOutput("export-file-to-google-drive", "name", "output file name");

  renameAdaptor("update-google-spreadsheet", "export-to-google-sheet");
  renameAdaptorInput("export-to-google-sheet", "sheetname", "sheet name");
  renameAdaptorOutput("export-to-google-sheet", "updated", "updated row ids");
  renameAdaptorOutput("export-to-google-sheet", "created", "created row ids");
  renameAdaptorOutput("export-to-google-sheet", "skipped", "skipped row ids");

  renameAdaptor("update-microreact-project", "export-to-microreact-project");
  renameAdaptorInput("export-to-microreact-project", "name", "project name");

  // renameAdaptor("", "new");
  // renameAdaptorInput("new", "", "");
  // renameAdaptorOutput("new", "", "");

  for (let index = 0; index < doc.input.length; index++) {
    const item = doc.input[index];
    // const currentName = item.name;
    // const newId = `input-${index + 1}`;
    // item.id = newId;
    // for (const step of doc.transform) {
    //   for (const binding of step.binding) {
    //     if (binding.type === "input" && binding.input === currentName) {
    //       binding.input = newId;
    //     }
    //   }
    // }
    item.required = item.required ?? item.isRequired;
  }

  // for (let index = 0; index < doc.transform.length; index++) {
  //   const item = doc.transform[index];
  //   item.id = item.name;
  //   item.name = undefined;
  // }

  // for (let index = 0; index < doc.output.length; index++) {
  //   const item = doc.output[index];
  //   const newId = `output-${index + 1}`;
  //   item.id = newId;
  // }

  doc.version = 3;

  return doc;
};
