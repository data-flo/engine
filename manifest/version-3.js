function renameBindings(bindings, map) {
  for (const binding of bindings) {
    if (binding.target in map && map[binding.target]) {
      binding.target = map[binding.target];
    }
  }
}

module.exports = function (doc) {
  for (const step of doc.transform) {
    if (step.type === "adaptor") {
      if (step.adaptor === "csv-file-to-datatable") {
        step.adaptor = "import-csv-file";
        renameBindings(
          step.bindings,
          {
            "separator": "delimiter",
            "newline": null,
          },
        );
      }

      if (step.adaptor === "join-datatables") {
        renameBindings(
          step.bindings,
          {
            "overwrite": null,
            "distance": null,
          },
        );
        const columnsBindings = step.bindings.find((x) => x.target === "columns");
        if (columnsBindings && columnsBindings.type === "value") {
          columnsBindings.value = columnsBindings.value.map(([ key ]) => key);
        }
      }

      if (step.adaptor === "calculate-time-difference") {
        for (const binding of step.bindings) {
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
        for (const binding of step.bindings) {
          if (binding.target === "delimiter") {
            binding.target = "separator";
          }
          if (binding.target === "target") {
            binding.target = "concatenated column";
          }
        }
      }
    }
  }

  doc.version = 3;

  return doc;
};
