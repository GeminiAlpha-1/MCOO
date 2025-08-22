# 根据CAD创建不规则三角网地表面

## 创建TIN地表面

    a. 导入【等高线.dwg Polyline】【高程点.dwg Point】【水面.dwg Polyline】

    b. 工具箱→数据管理→TIN→创建TIN

        ⅰ. 输出目录：实践数据7-1至7-3\TIN地表面

        ⅱ. 输入要素：
            【等高线、Elevation、Soft_Line】
            【高程点、height、Mass_Points】
            【水面、Elevation、Hard_Replace】
            【建筑、Elevation、Hard_Replace】

## 不规则三角网转栅格地表面

    a. 工具箱→转换→由TIN转出→TIN转栅格

        ⅰ. 输入TIN：TIN地表面

        ⅱ. 输出目录：实践数据7-1至7-3\栅格来自TIN

        ⅲ. 采样距离：OBSERVATIONS 1
