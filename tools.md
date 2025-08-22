---
title: 工具箱
---

# 📦  工具箱

:::tip
这里会收录一些`好用的`、`好玩的`各类小工具 🔩
:::

## 📚 参考文档

<!-- ================= 按钮区 ================= -->
<!-- 想加按钮，就复制一行 <a> 然后改文字/链接/图标/颜色 -->

<div id="tool-wall">
 
  <a class="btn alt" href="https://vitepress.dev/guide/what-is-vitepress">
    <img src="/参考文档/vp.svg" class="ico"/>
    VitePress
  </a>

  <a class="btn alt" href="https://markdown.com.cn/basic-syntax/">
    <img src="/参考文档/markdown.svg" class="ico"/>
    Markdown
  </a>

  <!-- 继续复制添加即可 -->
</div>

## 📂 资源获取

<!-- ================= 按钮区 ================= -->
<!-- 想加按钮，就复制一行 <a> 然后改文字/链接/图标/颜色 -->

<div id="tool-wall">
 
  <a class="btn alt" href="https://www.iconfont.cn/">
    <img src="/资源获取/iconfont.svg" class="ico"/>
    Iconfont
  </a>

  <a class="btn alt" href="https://iconpark.oceanengine.com/home">
    <img src="/资源获取/iconpark.svg" class="ico"/>
    IconPark
  </a>

  <!-- 继续复制添加即可 -->
</div>

<style>
/* =========== 仅本页生效的变量 =========== */
#tool-wall {
  /* 图标大小 */
  --ico-size: 20px;
  /* 按钮整体高度（药丸高度） */
  --btn-height: 36px;
  /* 按钮左右间距（横向） */
  --gap-x: 12px;
  /* 按钮上下间距（纵向） */
  --gap-y: 8px;
  /* 圆角：9999px=药丸；50%=正圆；8px=小圆角 */
  --btn-radius: 9999px;
  /* 按钮内文字大小 */
  --font-size: 14px;

  /* 布局：先左右排，排不下自动换行 */
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-y) var(--gap-x);
  width: 100%;              /* 占满正文栏 */
  max-width: var(--vp-layout-max-width); /* 与正文同宽 */
}

/* 按钮本体 */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;               /* 图标与文字之间的间距 */
  padding: 0 1rem;        /* 左右内边距，决定药丸“胖瘦” */
  height: var(--btn-height);
  border-radius: var(--btn-radius);
  font-size: var(--font-size);
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s ease;
}

/* 图标尺寸 */
.btn .ico {
  width: var(--ico-size);
  height: var(--ico-size);
  flex-shrink: 0;         /* 防止图标被文字挤压 */
}

/* ===== 颜色：复用官方变量，无需改动 ===== */
.btn.brand {
  color: var(--vp-button-brand-text);
  background: var(--vp-button-brand-bg);
  border: 1px solid var(--vp-button-brand-border);
}
.btn.brand:hover {
  background: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-hover-text);
}

.btn.alt {
  color: var(--vp-button-alt-text);
  background: var(--vp-button-alt-bg);
  border: 1px solid var(--vp-button-alt-border);
}
.btn.alt:hover {
  background: var(--vp-button-alt-hover-bg);
}
</style>