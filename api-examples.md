---
outline: deep
---

# 运行API实例

本页演示了 VitePress 提供的一些运行时 API 的用法。

 `useData()` API 可用于访问当前页面的站点、主题和页面数据。它适用于 `.md` 和 `.vue` 文件:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>
```

## 你是怎么找到这儿的呢？
我记得我将该文章隐藏了呢 🤔

## 更多

查看官方文档 [运行时 API 的完整列表](https://vitepress.dev/reference/runtime-api#usedata).
