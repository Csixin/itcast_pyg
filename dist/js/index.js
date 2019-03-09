"use strict";

$(function () {
  init();

  function init() {
    swiperDate();
  }

  function swiperDate() {
    $.ajax({
      type: "get",
      url: "http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata",
      dataType: "json",
      success: function success(res) {
        if (res.meta.status == 200) {
          var data = res.data;
          var html = template('swiperTpl', {
            arr: data
          });
          $('.mui-slider').html(html);
          var gallery = mui('.mui-slider');
          gallery.slider({
            interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；

          });
        }
      }
    });
  }
});
//# sourceMappingURL=index.js.map
