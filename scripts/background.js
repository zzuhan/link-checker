'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');


// 监听点击动作，插入想执行的脚本
// 
// chrome.browserAction.onClicked.addListener(function (tab) {

//     chrome.tabs.insertCSS(null, {file: 'styles/style.css'});

//     chrome.tabs.executeScript(null, {file: 'scripts/jquery.js'}, function  () {
//         chrome.tabs.executeScript(null, {file: 'scripts/checker.js'});
//     });

// });