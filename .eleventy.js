// .eleventy.js
module.exports = function (eleventyConfig) {
  // ---------------------------
  // BrowserSync
  // ---------------------------
  eleventyConfig.setBrowserSyncConfig({
    rewriteRules: [
      {
        match: /\/image\/(\d+)(x)?(\d+)?/g,
        replace: "/images",
      },
    ],
    serveStatic: ["public"],
    serveStaticOptions: {
      extensions: ["html"],
    },
  }); // <-- close setBrowserSyncConfig properly

  // ---------------------------
  // Collections
  // ---------------------------
  // Recursively pick up posts in subfolders under app/posts/
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("app/posts/**/*.md");
  });

  // ---------------------------
  // Template libraries
  // ---------------------------
  eleventyConfig.setLibrary("njk", require("./lib/libraries/nunjucks"));
  eleventyConfig.setLibrary("md", require("./lib/libraries/markdown"));

  // ---------------------------
  // Plugins
  // ---------------------------
 // eleventyConfig.addPlugin(require("@11ty/eleventy-navigation"));
    // After: eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'))
eleventyConfig.addFilter("navHasKey", function (tree, key) {
  if (!key || !tree) return false;
  const stack = Array.isArray(tree) ? [...tree] : [tree];
  while (stack.length) {
    const n = stack.pop();
    if (!n) continue;
    if (n.key === key) return true;
    if (n.children) stack.push(...n.children);
  }
  return false;
});

  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));



  // ---------------------------
  // Filters
  // ---------------------------
  eleventyConfig.addFilter("date", require("./lib/filters/date"));
  eleventyConfig.addFilter("markdown", require("./lib/filters/markdown"));
  eleventyConfig.addFilter("pretty", require("./lib/filters/pretty"));
  eleventyConfig.addFilter("tokenize", require("./lib/filters/tokenize"));
  eleventyConfig.addFilter("widont", require("./lib/filters/widont"));

  // ---------------------------
  // Passthrough
  // ---------------------------
  // Copies app/images/* into output. If you prefer them under /images,
  // change "." to "images".
  eleventyConfig.addPassthroughCopy({ "app/images": "." });
  eleventyConfig.addPassthroughCopy({
    "node_modules/govuk-frontend/govuk/assets": "assets",
  });






  // ---------------------------
  // Eleventy config
  // ---------------------------
  return {
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "app",
      output: "public",
      layouts: "_layouts",
      includes: "_components",
    },
    templateFormats: ["njk", "md", "11ty.js"],
  };
};