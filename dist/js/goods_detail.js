"use strict";

$(function () {
  init();
  eventList();
  var GoodObj = {};

  function eventList() {
    // 绑定 加入购物车 点击 事件
    $(".shopping_car_btn").on("tap", function () {
      var userInfo = sessionStorage.getItem("userInfo");

      if (userInfo) {
        var token = JSON.parse(userInfo).token;
        var info = {
          cat_id: GoodObj.cat_id,
          goods_id: GoodObj.goods_id,
          goods_name: GoodObj.goods_name,
          goods_number: GoodObj.goods_number,
          goods_price: GoodObj.goods_price,
          goods_small_logo: GoodObj.goods_small_logo,
          goods_weight: GoodObj.goods_weight
        };
        mui.confirm("是否要加入购物车", "提示", ["确认", "取消"], function (btnIndex) {
          if (btnIndex.index == 0) {
            //确认
            $.ajax({
              type: "post",
              url: "http://api.pyg.ak48.xyz/api/public/v1/my/cart/add",
              data: {
                info: JSON.stringify(info)
              },
              // 请求头的配置
              headers: {
                Authorization: token
              },
              dataType: "json",
              success: function success(res) {
                console.log(res);
              }
            });
          } else if (btnIndex.index == 1) {
            mui.toast("取消加入购物车");
          }
        });
      } else {
        sessionStorage.setItem("pageUrl", location.href);
        location.href = "login.html";
      }
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
          GoodObj = res.data;
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
