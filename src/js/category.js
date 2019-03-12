$(function () {

    init();
    var CateDatas;

    function init() {
        renderDate();
        leftTap();
    }

    function renderDate(){
        //获取会话储存，判断是否要发请求
        let sessStr = sessionStorage.getItem("cates");
        if(!sessStr){
            cates();
        }else{
            let sessObj = JSON.parse(sessStr);
            if(Date.now()-sessObj.time > 5000){
                console.log("数据过期")
                cates();
            } else{
                console.log("使用会话储存")
                CateDatas = sessObj.data;
                getLeft();
                getRight(0);
            }
        }
    }

    function cates() {
        $.ajax({
            type: "get",
            url: "http://api.pyg.ak48.xyz/api/public/v1/categories",
            dataType: "json",
            success: function (res) {
                if (res.meta.status == 200) {
                    CateDatas = res;
                    getLeft();

                    getRight(0);
                    let sessionObj = {data:CateDatas,time:Date.now()};
                    sessionStorage.setItem("cates",JSON.stringify(sessionObj));
                    //本地存储
                }
            }
        });
    }

    //点击左栏事件
    function leftTap() {
        $(".left_memu").on("tap", "li", function () {
            $(this).addClass("active").siblings().removeClass("active"); // 获取 被点击的li标签的索引 $(this).index()
            let index = $(this).index();
            getRight(index);
          });
    }

  
    function getLeft() {
        let arr = CateDatas.data;
        let html = ``;
        for (let i = 0; i < arr.length; i++) {
            html += `
            <li class="${i == 0?'active':''}">
                <a href="javascript:;">
                    ${arr[i].cat_name}
                </a>
            </li>
            `
        }
        $('.left_memu').html(html);
        var leftScroll = new IScroll('.left_box')
    }

    function getRight(i) {
        let data = CateDatas.data[i].children;
        let rightHtml = template("cateTml", {
            arr: data
        });
        $('.right_item').html(rightHtml);
        let img = $('.item_list img');
        //iscoll 在图片未完全load完前触发会导致滑动区域错误
        img.on('load',() => {
            img.length --;
            if(img.length == 0){
                var rightScroll = new IScroll('.right_box');
            }
        })
        
    }


})