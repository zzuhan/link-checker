# 链接检查工具

此为chrome插件，辅助做a链接的检测。

![预览图](http://p2.qhimg.com/d/inn/cf3ea878/preview.png)

## 功能

- 检查链接的target 

### 检查链接的target 

target为空(默认为_self)或_self，则显示`当`  
target为_blank，则显示`新`  

## 使用

1. 打开chrome扩展中心，或地址栏输入[chrome://extensions](chrome://extensions)
2. 勾选开发者模式，点加载正在开发的扩展程序，载入此文件夹
3. 点击右上角的图标，即会在页面上显示。

## TODO

- 检查链接地址 (是否为空，是否为javascript:;)
    - 检查链接是否为#
    - 连接是否合法，是否会有多个?号，
- 借鉴这个 http://www.feedthebot.com/tools/linkcount/
    - image links

## 连接合法性检查

http://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url

将来

## 疑问

- 如果链接是隐藏的，是否还显示
- 链接 href哪种比较好 `/enternewzone?gkey=$item[gkey]`还是带上完整前缀，

## 参考

https://developer.chrome.com/extensions/tabs