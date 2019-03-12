"use strict";

$(function () {
  init();
  eventList();

  function eventList() {
    // 绑定 加入购物车 点击 事件
    $(".shopping_car_btn").on("tap", function () {
      // 弹出 mui的消息提示框 自动消失
      mui.toast("您还没有登录");
    });
  }

  function init() {
    $.ajax({
      type: "get",
      url: "http://api.pyg.ak48.xyz/api/public/v1/goods/detail",
      data: {
        goods_id: getUrl("goods_id")
      },
      dataType: "json",
      success: function success(res) {
        if (res.meta.status == 200) {
          var html = template("contTml", res.data);
          $(".pyg_view").html(html);
          var gallery = mui('.mui-slider');
          gallery.slider({
            interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；

          });
        }
      }
    });
  }

  function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }
});
//# sourceMappingURL=goods_detail.js.map
