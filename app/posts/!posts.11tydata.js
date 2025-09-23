// app/posts/posts.11tydata.js
const slugify = (s) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

module.exports = {
  layout: "post.njk",
  tags: ["post"],

  eleventyComputed: {
    project: (data) => {
      const parts = data.page.filePathStem.split("/");
      return slugify(parts[3] || "unassigned"); // app/posts/<project>/...
    },

    permalink: (data) => {
      const project = data.project;
      const parts = data.page.filePathStem.split("/");
      const stem  = parts[parts.length - 1];

      const dated = stem.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);

      let slug = slugify(data.page.fileSlug || stem);
      let dateSeg = null;

      if (dated) {
        dateSeg = dated[1];
        slug    = slugify(dated[2]);
      }
      if (slug === "index") slug = "";

      const includeDate =
        typeof data.includeDateInUrl === "boolean"
          ? data.includeDateInUrl
          : Boolean(dateSeg);

      if (includeDate && !dateSeg && data.date instanceof Date) {
        dateSeg = new Date(
          data.date.getTime() - data.date.getTimezoneOffset() * 60000
        ).toISOString().slice(0, 10);
      }

      if (includeDate && dateSeg) {
        return `/posts/${project}/${dateSeg}/${slug ? slug + "/" : ""}`;
      }
      return `/posts/${project}/${slug ? slug + "/" : ""}`;
    },

    date: (data) => {
      if (data.date) return data.date;
      const parts = data.page.filePathStem.split("/");
      const stem  = parts[parts.length - 1];
      const m = stem.match(/^(\d{4}-\d{2}-\d{2})-/);
      if (m) {
        const d = new Date(`${m[1]}T00:00:00Z`);
        if (!isNaN(d)) return d;
      }
      return data.date;
    },

    eleventyNavigation: (data) => {
      const fm = data.eleventyNavigation || {};
      const parts = data.page.filePathStem.split("/");
      const stem  = parts[parts.length - 1];
      const dated = stem.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);

      const baseSlug = slugify((dated ? dated[2] : data.page.fileSlug) || stem);
      const key      = slugify(fm.key || baseSlug);
      const parent   = slugify(fm.parent || data.project);
      const title    = fm.title || data.title || baseSlug;

      return { ...fm, key, parent, title, order: fm.order || 100 };
    },
  },
};