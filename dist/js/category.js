"use strict";

$(function () {
  init();
  var CateDatas;

  function init() {
    cates();
    leftTap();
  }

  function cates() {
    $.ajax({
      type: "get",
      url: "http://api.pyg.ak48.xyz/api/public/v1/categories",
      dataType: "json",
      success: function success(res) {
        if (res.meta.status == 200) {
          CateDatas = res;
          getLeft();
          getRight(0);
        }
      }
    });
  } //点击左栏事件


  function leftTap() {
    $(".left_memu").on("tap", "li", function () {
      $(this).addClass("active").siblings().removeClass("active"); // 获取 被点击的li标签的索引 $(this).index()

      var index = $(this).index();
      getRight(index);
    });
  }

  function getLeft() {
    var arr = CateDatas.data;
    var html = "";

    for (var i = 0; i < arr.length; i++) {
      html += "\n            <li class=\"".concat(i == 0 ? 'active' : '', "\">\n                <a href=\"javascript:;\">\n                    ").concat(arr[i].cat_name, "\n                </a>\n            </li>\n            ");
    }

    $('.left_memu').html(html);
  }

  function getRight(i) {
    var data = CateDatas.data[i].children;
    var rightHtml = template("cateTml", {
      arr: data
    });
    $('.right_item').html(rightHtml);
  }
});
//# sourceMappingURL=category.js.map
