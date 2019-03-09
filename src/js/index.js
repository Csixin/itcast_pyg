$(function () {

  init();

  function init() {
    swiperDate();
  }

  function swiperDate(){
    $.ajax({
      type: "get",
      url: "http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata",
      dataType: "json",
      success: function (res) {
        if (res.meta.status == 200) {
          let data = res.data;
          let html = template('swiperTpl',{arr:data});
          $('.mui-slider').html(html);
          var gallery = mui('.mui-slider');
          gallery.slider({
            interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
          });
        }
      }
    });
  }

})