module.exports = function() {
  return require("../.eleventy.js")().pathPrefix || "";
};