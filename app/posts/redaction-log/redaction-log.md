---
override:tags: []
layout: collection
title: Redaction log
description: A tool to log redactions made to CPS cases
pagination:
  data: collections.redaction-log
  reverse: true
  size: 50
permalink: "redaction-log/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}{% endif %}/"
eleventyComputed:
  eleventyNavigation:
    key: redaction-log
    excerpt: "{{ description }}"
    parent: home
---