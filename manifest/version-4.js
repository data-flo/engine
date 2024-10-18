module.exports = function (doc) {

  for (const step of doc.transform) {
    if (step.adaptor === "add-column") {
      const columnNameBinding = step.binding?.find((x) => x.binding.target === "column name");
      if (columnNameBinding) {
        if (columnNameBinding.type === "value") {
          columnNameBinding.target = "column names";
          columnNameBinding.value = [ columnNameBinding.value ];
        }
        else {
          step.binding.splice(step.binding.indoxOf(columnNameBinding), 1);
        }
      }
    }

    if (step.adaptor === "map-column-values") {
      const originalColumnBinding = step.binding?.find((x) => x.target === "original column");
      const newColumnBinding = step.binding?.find((x) => x.target === "new column");
      if (originalColumnBinding) {
        if (originalColumnBinding.type === "value") {
          originalColumnBinding.target = "columns";
          const entry = { key: originalColumnBinding.value };
          if (newColumnBinding?.type === "value") {
            entry.value = newColumnBinding.value;
          }
          originalColumnBinding.value = [ entry ];
        }
        else {
          step.binding.splice(step.binding.indexOf(originalColumnBinding), 1);
        }
      }
      if (newColumnBinding) {
        step.binding.splice(step.binding.indexOf(newColumnBinding), 1);
      }
    }
  }

  doc.version = 4;

  return doc;
};
