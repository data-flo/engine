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

function renameAdaptorOutput(adaptorName, oldName, newName) {
  for (const step of doc.transform) {
    if (step.type === "adaptor") {
      if (step.adaptor === oldName) {
        step.adaptor = newName;
      }
    }
  }
}

module.exports = function (doc) {
  for (const step of doc.transform) {
    if (step.type === "adaptor") {
      if (step.adaptor === "csv-file-to-datatable") {
        step.adaptor = "import-csv-file";
        for (const binding of step.binding) {
          if (binding.target === "separator") {
            binding.target = "delimiter";
          }
        }
      }

      if (step.adaptor === "join-datatables") {
        const columnsBindings = step.binding.find((x) => x.target === "columns");
        if (columnsBindings && columnsBindings.type === "value") {
          columnsBindings.value = columnsBindings.value.map(([ key ]) => key);
        }
      }

      if (step.adaptor === "calculate-time-difference") {
        for (const binding of step.binding) {
          if (binding.target === "reference column") {
            binding.target = "column two";
          }
          if (binding.target === "reference format") {
            binding.target = "column two format";
          }
          if (binding.target === "value column") {
            binding.target = "column one";
          }
          if (binding.target === "value format") {
            binding.target = "column one format";
          }
          if (binding.target === "target column") {
            binding.target = "difference column";
          }
        }
      }

      if (step.adaptor === "columns-concatenation") {
        step.adaptor = "concatenate-columns";
        for (const binding of step.binding) {
          if (binding.target === "delimiter") {
            binding.target = "separator";
          }
          if (binding.target === "target") {
            binding.target = "concatenated column";
          }
        }
      }

      if (step.adaptor === "concatenate-columns") {
        for (const binding of step.binding) {
          if (binding.target === "left") {
            binding.target = "text one";
          }
          if (binding.target === "right") {
            binding.target = "text two";
          }
        }
      }

      if (step.adaptor === "create-google-drive-folder") {
        for (const binding of step.binding) {
          if (binding.target === "parent") {
            binding.target = "parent folder";
          }
          if (binding.target === "name") {
            binding.target = "folder name";
          }
        }
      }

      if (step.adaptor === "csv-to-datatable") {
        step.adaptor = "convert-text-to-datatable";
        for (const binding of step.binding) {
          if (binding.target === "separator") {
            binding.target = "delimiter";
          }
        }
      }

      if (step.adaptor === "datatable-columns") {
        step.adaptor = "list-datatable-columns";
        for (const binding of step.binding) {
          if (binding.target === "separator") {
            binding.target = "delimiter";
          }
        }
        // TODO: columns => column names
      }

      if (step.adaptor === "datatable-to-csv") {
        step.adaptor = "export-to-csv-file";
        for (const binding of step.binding) {
          if (binding.target === "separator") {
            binding.target = "delimiter";
          }
          if (binding.target === "filename") {
            binding.target = "output file name";
          }
        }
        // TODO: csv => file
      }

      if (step.adaptor === "datatable-to-dbf-file") {
        step.adaptor = "export-to-dbf-file";
        for (const binding of step.binding) {
          if (binding.target === "columns") {
            binding.target = "column types";
          }
          if (binding.target === "filename") {
            binding.target = "output file name";
          }
        }
        // TODO: dbf => file
      }

      if (step.adaptor === "datatable-to-graph") {
        step.adaptor = "create-graph-from-datatable";
        for (const binding of step.binding) {
          if (binding.target === "from") {
            binding.target = "from column";
          }
          if (binding.target === "to") {
            binding.target = "to column";
          }
          if (binding.target === "direction") {
            binding.target = "directed";
            if (binding.type === "value") {
              binding.value = (binding.value !== "none");
            }
          }
        }
        // TODO: csv => file
      }

      /******/
      
      if (step.adaptor === "reverse-geocoding") {
        for (const binding of step.binding) {
          if (binding.target === "mapboxApiKey") {
            binding.target = "api key";
          }
          if (binding.target === "longitudeColumn") {
            binding.target = "longitude column";
          }
          if (binding.target === "latitudeColumn") {
            binding.target = "latitude column";
          }
          if (binding.target === "placeType") {
            binding.target = "feature type";
          }
          if (binding.target === "resultColumn") {
            binding.target = "feature column";
          }
        }
      }

      if (step.adaptor === "forward-geocoding") {
        for (const binding of step.binding) {
          if (binding.target === "placeColumn") {
            binding.target = "query column";
          }
          if (binding.target === "mapboxApiKey") {
            binding.target = "api key";
          }
          if (binding.target === "longitudeColumn") {
            binding.target = "longitude column";
          }
          if (binding.target === "latitudeColumn") {
            binding.target = "latitude column";
          }
          if (binding.target === "placeType") {
            binding.target = "feature type";
          }
          if (binding.target === "resultColumn") {
            binding.target = "feature column";
          }
        }
      }

    }
  }

  renameAdaptor("datatable-to-list", "create-list-from-datatable");
  renameAdaptor("create-list-from-datatable", "column", "column name");

  renameAdaptor("datatable-to-map", "create-map-from-datatable");

  renameAdaptor("date-to-text", "convert-date-to-text");

  renameAdaptor("dot-to-graph", "create-graph-from-dot");

  renameAdaptor("download-file", "import-file-from-url");

  renameAdaptor("dropbox-file", "import-file-from-dropbox");

  renameAdaptor("epicollect-project", "import-epicollect-project");

  renameAdaptor("figshare-file", "import-file-from-figshare");

  renameAdaptor("filter-blank-values", "filter-blank-rows");

  renameAdaptor("find-value", "find-value-in-list");

  renameAdaptor("", "");

  doc.version = 3;

  return doc;
};
