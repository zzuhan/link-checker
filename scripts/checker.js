// 动态插入css
// var style = document.createElement('link');
// style.rel = 'stylesheet';
// style.type = 'text/css';
// style.href = chrome.extension.getURL('styles/style.css');
// (document.head||document.documentElement).appendChild(style);


var helper = {
  // 获取dom的坐标信息
  getDOMObjectPosition: function(obj, defaultZIndex) {
    if(obj.firstChild && obj.firstChild.tagName === 'IMG') {
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

    if(containImg) obj.style.display = oldDisplay;

    return info;
  },

  // 获取链接信息
  getLinkInfo: function(obj){
    var info = {
      target: '',
      href: ''
    }

    info.target = obj.getAttribute('target');
    info.href = obj.getAttribute('href');

    return info;
  }

}

var infoStyles =  {
    position: 'absolute',
    background: '#c9394a',
    opacity: .8,
    'z-index': 9999,
    'color': '#FFF',
    'text-align': 'center',
    'font-size': '18px'
}
var infoStyles = {};

var checker = {
  $links: null,

  getAllLinks: function  () {
    this.$links = $('a');
  },

  run: function () {
      this.getAllLinks();

      this.showInfo();

      this.hideOnClicked();
  },

  hideOnClicked: function  () {
     $(document).on('click', '.check-info', function  () {
        $(this).hide();     
     });
  },

  showInfo: function () {
      var _this = this;
      this.$links.each(function (i, link) {
        var pos =  helper.getDOMObjectPosition(link);
        var info = helper.getLinkInfo(link);

        _this.createAndShowLinkInfo(pos, info);
      });
  },

  createAndShowLinkInfo: function (pos, info) {
      var styles = $.extend({}, infoStyles, {
        left: pos.left, 
        top: pos.top,
        width: pos.width,
        height: pos.height
      });

      var abbrs = {
        '_blank': '新',
        'null': '当'
      }

      // var content = 'target:' + abbrs[info.target];
      var content = abbrs[info.target];

      $('<div class="check-info" />').css(styles).text(content).appendTo(document.body);
  }
}

checker.run();