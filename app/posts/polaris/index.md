---
override:tags: []
layout: collection
title: Polaris case review
description: A tool for reviewing and redacting cases
pagination:
  data: collections.polaris
  reverse: true
  size: 50
permalink: "polaris/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}{% endif %}/"
eleventyComputed:
  eleventyNavigation:
    key: "{{ title }}"
    excerpt: "{{ description }}"
    parent: home
---