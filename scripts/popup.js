'use strict';

console.log('\'Allo \'Allo! Popup');

console.log('\'Allo \'Allo! Popup');

// checkTarget();

function checkTarget(checkType){
    console.log('check ' + checkType);
    var executeCode = "checker.check('" + checkType + "')";
    chrome.tabs.executeScript(null, {code: executeCode});
}

$(".j-check").click(function () {
    var checkType = $(this).data('type');
    checkTarget(checkType);
})