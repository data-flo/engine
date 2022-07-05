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

      // append-to-list
    }
  }

  doc.version = 3;

  return doc;
};
