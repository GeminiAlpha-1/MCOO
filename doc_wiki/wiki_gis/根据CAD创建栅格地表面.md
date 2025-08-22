# 根据CAD创建栅格地表面<Badge type="danger" text="报错" />

:::danger
❗️❗️❗️在ArcGIS 10.8中本操作大概率会玄学报错，每次报错提示都不一样。
:::

## 导入【等高线.dwg Polyline】【建筑.dwg Polyline和Polygon】【水面.dwg Polyline和Polygon】【高程点.dwg Point】

## 工具箱→栅格插值→地形转栅格

  a. 输入要素：全部

  b. 输出目录：实践数据7-1至7-3\栅格地形

  c. 输出像元大小：1

## 工具箱→转换→由栅格转出→栅格转TIN

  a. 输入栅格：栅格地形

  b. 输出TIN：实践数据7-1至7-3\TIN来自栅格

  c. 容差：0.5
