"use strict";

$(function () {
  //将要发送的数据作为全局变量，方便操作
  var sendDate = {
    query: "",
    cid: getUrl("cid"),
    pagenum: "1",
    pagesize: "5"
  };
  var totalPages; //在mui框架上下拉组件中a默认没有跳转功能，需手动js安排跳转

  aTap();

  function aTap() {
    $(".list").on("tap", "a", function () {
      var target = this.href;
      console.log(target);
      location.href = target;
    });
  }

  mui.init({
    pullRefresh: {
      container: ".pyg_view",
      down: {
        auto: true,
        //  触发下拉刷新时自动触发
        callback: function callback() {
          sendDate.pagenum = 1; //定义函数作为sendAjax的回调

          var muban = function muban(data) {
            var html = template("goodsTml", {
              arr: data
            });
            $('.list').html(html);
            mui('.pyg_view').pullRefresh().endPulldownToRefresh();
            mui('.pyg_view').pullRefresh().refresh(true);
          };

          sendAjax(muban);
        }
      },
      up: {
        //  触发上拉刷新时自动触发
        callback: function callback() {
          console.log(sendDate.pagenum);
          console.log(totalPages);

          if (sendDate.pagenum >= totalPages) {
            console.log("NO DATA");
            mui(".pyg_view").pullRefresh().endPullupToRefresh(true);
          } else {
            console.log("还有数据");
            sendDate.pagenum++;

            var muban = function muban(data) {
              var html = template("goodsTml", {
                arr: data
              }); //第二次时用append

              $('.list').append(html);
              mui(".pyg_view").pullRefresh().endPullupToRefresh(false);
            };

            sendAjax(muban);
          }
        }
      }
    }
  });

  function sendAjax(func) {
    $.ajax({
      type: "get",
      url: "http://api.pyg.ak48.xyz/api/public/v1/goods/search",
      data: sendDate,
      dataType: "json",
      success: function success(res) {
        console.log(res);

        if (res.meta.status == 200) {
          totalPages = Math.ceil(res.data.total / sendDate.pagesize);
          func(res.data.goods);
        }
      }
    });
  } //截取url的cid


  function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }
});
//# sourceMappingURL=goods_list.js.map
