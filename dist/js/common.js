"use strict";

$(function () {
  init();

  function init() {
    $.ajaxSettings.beforeSend = function () {
      $(".loadding").css({
        "display": "block"
      });
    };

    $.ajaxSettings.complete = function () {
      $(".loadding").css({
        "display": "none"
      });
    };
  }
});
//# sourceMappingURL=common.js.map
