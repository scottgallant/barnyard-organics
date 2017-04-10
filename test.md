---
title: test
permalink: /test/
layout: default
---
<h3>Categories</h3>
{% for category in site.categories %}
    <a href="/category/{{ category[0] }}/" style="text-decoration: none;">{% if category[0] == 'aws' %}{{ category[0] | upcase }}{% else %}{{ category[0] | capitalize }}{% endif %}</a><br />
{% endfor %}

<hr>
<ul>
  {% for post in site.categories.jekyll %}
    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
