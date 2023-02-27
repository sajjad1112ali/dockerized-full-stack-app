const removeDefaults = (model) => {
  const obj = { ...JSON.parse(model) };
  let removedObj = {};
  for (const key in obj) {
    const element = obj[key];
    delete element.default;
    delete element.required;
    removedObj[key] = { ...element };
  }
  return removedObj;
};

module.exports = {
  removeDefaults,
};
