# content script

即运行环境是页面，可访问页面中dom，进行操作，但是不可访问页面中的js。

插入方式

- manifest.json 设置 `content_scripts`
- chrome.tabs.executeScript 动态插入，执行
 
# 通信 comm

消息传递
消息传递很重要，因为前后台的分工不同，要完成一件事情，通常需要前后台相互协作才能完成。

1 后台send
chrome.tabs.sendMessage
chrome.extension.onMessage.addListener

2 前台send
chrome.extension.sendMessage
chrome.extension.onMessage.addListener

3 直接execute执行前台方法


# 一些坑

chrome.browserAction.onClicked 和 browser_action中default_popup不能同时生效。

# 一些常用api

- 新建标签chrome.tabs.create


# 参考链接

http://www.itzhai.com/chrome-plugin-development-example-switch-lights-browser-action.html
