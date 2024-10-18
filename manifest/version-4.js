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

    if (step.adaptor === "create-list-from-datatable") {
      const binding = step.binding?.find((x) => x.binding.target === "column name");
      if (binding) {
        if (binding.type === "value") {
          binding.target = "column names";
          binding.value = [ binding.value ];
        }
        else {
          step.binding.splice(step.binding.indoxOf(binding), 1);
        }
      }
    }

    if (step.adaptor === "map-column-values") {
      const originalColumnBinding = step.binding?.find((x) => x.binding.target === "original column");
      const newColumnBinding = step.binding?.find((x) => x.binding.target === "new column");
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
          step.binding.splice(step.binding.indoxOf(originalColumnBinding), 1);
        }
      }
      if (newColumnBinding) {
        step.binding.splice(step.binding.indoxOf(newColumnBinding), 1);
      }
    }
  }

  doc.version = 4;

  return doc;
};
