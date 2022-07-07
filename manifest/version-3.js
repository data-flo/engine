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

  doc.version = 3;

  return doc;
};
