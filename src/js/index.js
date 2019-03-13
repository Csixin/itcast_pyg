$(function () {

  init();

  function init() {
    swiperDate();
    getCates();
    getPro();
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

  function getCates(){
    $.get("http://api.pyg.ak48.xyz/api/public/v1/home/catitems",(res) => {
        if(res.meta.status == 200){
          let html = ``;
          for(let i = 0;i < res.data.length;i++){
              html += `
              <a href="javascript:;">
                <img src="${res.data[i].image_src}" alt="">
              </a>
              `
          }
          $('.pyg_cates').html(html);
        }   
    })
  }

  function getPro(){
    $.ajax({
      type: "get",
      url: "http://api.pyg.ak48.xyz/api/public/v1/home/goodslist",
      dataType: "json",
      success: function (res) {
        if(res.meta.status == 200){
            let data = res.data;
            let html = template("proTpl",{arr:data});
            $('.pyg_items').html(html);
        }

        
      }
    });
  }

})