# 「知识库」栏目说明

<update />

## 这里收录了什么：

我所学的，

我想学的。



> *“少而好学，如日出之阳；壮而好学，如日中之光；老而好学，如秉烛之明。”——刘向*

---

::: warning
**⬅️ 电脑端用户请在`侧边栏`内查找自己需要的内容。**
:::

::: warning
**⬆️ 手机端用户请点击左上角`Menu`查找自己需要的内容。**
:::

## 文章插件示例

### 添加彩色信息块

```md
::: info
这是一个信息框
:::

::: tip
这是一个提示框
:::

::: warning
这是一个警告框
:::

::: danger
这是一个危险警告框
:::

::: details
这是一个折叠框
:::
```

::: info
这是一个信息框
:::

::: tip
这是一个提示框
:::

::: warning
这是一个警告框
:::

::: danger
这是一个危险警告框
:::

::: details
这是一个折叠框
:::

---

### 插入代码组

::: code-group

```sh [名称1]
#查询pnpm版本
pnpm -v
```

```sh [名称2]
#查询yarn版本
yarn -v
```

:::

---

### BiliVideo

```js
<BiliVideo bvid="视频链接或BV号" />
```

---

### NeteaseMusic

```js
<NeteaseMusic id="单曲id" :auto="false" height="150"/>
```

```js
<NeteaseMusic id="歌单id" type="0" :auto="false" height="450"/>
```

`auto=false`时禁用自动播放，`=true`时开启自动播放

`height=""`自定义组件高度

---

### 在特定界面隐藏侧边栏

```md
---
sidebar: false
---
```

---

### 添加标题徽章

```html
### 标题 <Badge type="info" text="信息" />
### 标题 <Badge type="tip" text="提示" />
### 标题 <Badge type="warning" text="警告" />
### 标题 <Badge type="danger" text="危险" />
```

上面的代码呈现如下：

#### 标题 <Badge type="info" text="信息" />
#### 标题 <Badge type="tip" text="提示" />
#### 标题 <Badge type="warning" text="警告" />
#### 标题 <Badge type="danger" text="危险" />

---

### 显示最后编辑时间

```js
<update />
```

---

### 嵌入链接卡片

```js
<Linkcard url="你的网址" title="标题" description="描述" logo="logo图片路径"/>
```
---

### 链接图标

```md
油管链接图标：[Youtube](https://www.youtube.com/)

B站链接图标：[哔哩哔哩](https://space.bilibili.com/1323019347)

爱发电链接图标：[爱发电](https://afdian.com/a/mcooooo)

Github链接图标：[Github](https://github.com/GeminiAlpha-1)

QQ频道链接图标：[QQ频道](https://pd.qq.com/)
```

---

### 插入记号笔效果

```md
<sapn class="marker-text">这里是重重点</sapn>
```

输出：
<sapn class="marker-text">这里是重重点</sapn>

输入：
```md
<sapn class="marker-text-highlight">这里是荧光笔</sapn>
```

输出：
<sapn class="marker-text-highlight">这里是荧光笔</sapn>

输入：
```md
<sapn class="marker-evy">这里是尤雨溪的主页样式，鼠标放在我上面看效果</sapn>
```

输出：
<sapn class="marker-evy">这里是尤雨溪的主页样式，鼠标放在我上面看效果</sapn>

---

### 导航页重点标记

```js
{
        icon: '/自制工具/color.svg',
        title: '颜色转换器',
        badge: {
          text: '内容',
          type: 'info',
        },
        desc: '便捷的进行十六进制、CMYK、RGB颜色的互相转化',
        link: '/tools/颜色转换器'
      }
```