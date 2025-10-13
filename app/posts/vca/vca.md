---
override:tags: []
layout: collection
title: VCA
description: A tool for doing the thing
pagination:
  data: collections.vca
  reverse: true
  size: 50
permalink: "vca/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}{% endif %}/"
eleventyComputed:
  eleventyNavigation:
    title: Victims case app
    key: vca
    excerpt: "{{ description }}"
    parent: home
---