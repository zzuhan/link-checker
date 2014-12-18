// 动态插入css
// var style = document.createElement('link');
// style.rel = 'stylesheet';
// style.type = 'text/css';
// style.href = chrome.extension.getURL('styles/style.css');
// (document.
// head||document.documentElement).appendChild(style);
// 

var helper = {
  // 获取dom的坐标信息
  getDOMObjectPosition: function(obj, defaultZIndex) {
    function imgInChildren(obj) {
      var _filter = Array.prototype.filter;

      var childs = obj.children;

      var imgChilds = _filter.call(childs, function(child) {
        return child.tagName === 'IMG';
      });

      return imgChilds.length > 0;
    }

    // a直接包含img的情况，直接a inline-block来包裹img
    if (obj.firstChild && imgInChildren(obj)) {
      var containImg = true;
      var oldDisplay = obj.style.display;
      // a标签里是img的化，img撑不起来a标签
      obj.style.display = 'inline-block';

    }

    var info = {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    };
    if (obj.getBoundingClientRect) {
      var rect = obj.getBoundingClientRect();
      var pageXOffset, pageYOffset, zoomFactor;
      if ("pageXOffset" in window && "pageYOffset" in window) {
        pageXOffset = window.pageXOffset;
        pageYOffset = window.pageYOffset;
      } else {
        // zoomFactor = _getZoomFactor();
        pageXOffset = Math.round(document.documentElement.scrollLeft / zoomFactor);
        pageYOffset = Math.round(document.documentElement.scrollTop / zoomFactor);
      }
      var leftBorderWidth = document.documentElement.clientLeft || 0;
      var topBorderWidth = document.documentElement.clientTop || 0;
      info.left = rect.left + pageXOffset - leftBorderWidth;
      info.top = rect.top + pageYOffset - topBorderWidth;
      info.width = "width" in rect ? rect.width : rect.right - rect.left;
      info.height = "height" in rect ? rect.height : rect.bottom - rect.top;
    }

    // 还原
    if (containImg) {
      obj.style.display = oldDisplay;
    }

    return info;
  },

  // 获取链接信息
  getLinkInfo: function(obj) {
    var info = {
      target: '',
      href: ''
    }

    info.target = obj.getAttribute('target');
    info.href = obj.getAttribute('href');

    return info;
  }

}

var infoStyles = {};

var checker = {
  $links: null,

  getAllLinks: function() {
    this.$links = $('a');
  },

  init: function() {

    // bend
    this.bindEvents();
  },

  check: function(type) {
    if(!type) return;
    this.getAllLinks();

    var _this = this,
      methodName = 'check' + type[0].toUpperCase() + type.slice(1);

    if (!_this[methodName]) return;

    this.$links.each(function(i, link) {

      var pos = helper.getDOMObjectPosition(link);


      var meta = _this[methodName](link);

      meta.styles = pos;

      _this.handlerMeta(meta);
    });
  },

  bindEvents: function() {
    $(document).on('click', '.check-info', function() {
      $(this).hide();
    });
  },

  handlerMeta: function(meta) {
    if (meta.show) {

      $('<div class="check-info" />').css(meta.styles)
        .text(meta.text)
        .appendTo(document.body)
    }
  },

  checkTarget: function(obj) {
    var result = {
      show: true,
      text: ''
    }

    var map = {
      '_blank': '新',
      'null': '当',
      '_self': '当',
      '_top': '_top',
      '_parent': '_parent'
    },
    target;

    target = obj.getAttribute('target');

    result.text = map[target];

    return result;
  },

  checkHref: function(obj) {
    var result = {
      show: false,
      text: ''
    },
    urlReg = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
    // 跟getAttribute结果不同，obj.href是最后真实的absolute地址，
    // 如<a href="/"></a> 如果在baidu.com下，则会返回baidu.com    
    href = obj.href;

    // 链接内容检查
    if (href == '') {
      result.text = '空'
    } else if (href == null) {
      result.text = 'null';
    }

    // 连接合法性检查
    if(href && href.length > 0) {
      if(urlReg.test(href)) result.text = '不法';
    }
    

    if (result.text) result.show = true;
    return result;
  }

  // // 每个返回一个meta信息
  // {
  //   show: true | false
  //   text: '',
  //   styles: 
  // }
}

checker.init();

// checker.check('target');
// checker.check('empty');
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  // switch(request.name) {
  //   case "styleDeleted":
  //     removeStyle(request.id);
  //     break;
  //   case "styleUpdated":
  //     removeStyle(request.style.id);
  //     //fallthrough
  //   case "styleAdded":
  //     if (request.style.enabled == "true") {
  //       applyStyle(request.style);
  //     }
  // }

  // switch(request.name) {
  //   case 'checkTarget':
  //     checker.check("target");
  //     break;
  // }
});

// chrome.extension.sendMessage({method: "getStyles",