$(function () {

    $("#pyg-login").on("tap", () => {
        let username_text = $("input[name='username']").val().trim();
        let password_text = $("input[name='password']").val().trim();
        //验证账号和密码合法性
        if (checkPhone(username_text)) {
            console.log("手机号格式正确");
        } else {
            mui.toast("请输入正确的手机号码");
            return;
        }
        if (password_text.length < 6 || password_text.length > 12) {
            mui.toast("密码应在6-12位");
            return;
        } else {
            console.log("密码格式正确");
        }
        $.ajax({
            type: "post",
            url: "http://api.pyg.ak48.xyz/api/public/v1/login",
            data: {
                username: username_text,
                password: password_text
            },
            dataType: "json",
            success: function (res) {
                if(res.meta.status == 200){
                    mui.toast("成功登陆");
                    let pageUrl = sessionStorage.getItem("pageUrl");
                    
                    //把token存进sessinStorage,顺手把res.data全塞进去
                    sessionStorage.setItem("userInfo",JSON.stringify(res.data));
                    let timeId = setTimeout(() => {
                        if(pageUrl){
                            location.href = pageUrl;
                        }else{
                            location.href = "index.html"
                        }
                    }, 1000);
                }
            }
        });

    });

    function checkPhone(phone) {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            return false;
        } else {
            return true;
        }
    }
})