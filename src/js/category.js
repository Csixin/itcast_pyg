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
            success: function (res) {
                if (res.meta.status == 200) {
                    CateDatas = res;
                    getLeft();

                    getRight(0);
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
    }

    function getRight(i) {
        let data = CateDatas.data[i].children;
        let rightHtml = template("cateTml", {
            arr: data
        });
        $('.right_item').html(rightHtml)
    }


})