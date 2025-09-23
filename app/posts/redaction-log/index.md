---
override:tags: []
layout: collection

description: A tool to log redactions made to CPS cases
pagination:
  data: collections.redaction-log
  reverse: true
  size: 50
permalink: "/posts/redaction-log/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}{% endif %}/"
eleventyComputed:
  eleventyNavigation:
    key: redaction-log
    title: Redaction log
    excerpt: "{{ description }}"
    parent: home
---