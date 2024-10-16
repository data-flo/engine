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
  }

  doc.version = 4;

  return doc;
};
