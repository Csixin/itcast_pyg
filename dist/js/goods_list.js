"use strict";

$(function () {
  var sendDate = {
    query: "",
    cid: getUrl("cid"),
    pagenum: "1",
    pagesize: "5"
  };
  var totalPages;
  mui.init({
    pullRefresh: {
      container: ".pyg_view",
      down: {
        auto: true,
        //  触发下拉刷新时自动触发
        callback: function callback() {
          sendDate.pagenum = 1;

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
              });
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

          if (sendDate.pagenum == totalPages) {
            mui(".pyg_view").pullRefresh().endPullupToRefresh(true);
          }
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
