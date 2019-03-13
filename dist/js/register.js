"use strict";

$(function () {
  //获取验证码
  $("#security").on("tap", function () {
    var mobile_text = $("input[name='mobile']").val();
    var residue = 5;
    $("#security").attr("disabled", "disabled").text("\u5269\u4F59".concat(residue, "\u79D2\u91CD\u65B0\u53D1\u9001"));
    var timerId = setInterval(function () {
      residue--;
      $("#security").text("\u5269\u4F59".concat(residue, "\u79D2\u91CD\u65B0\u53D1\u9001"));

      if (residue == 0) {
        $("#security").text("\u83B7\u53D6\u9A8C\u8BC1\u7801").removeAttr("disabled", "disabled");
        clearInterval(timerId);
      }
    }, 1000);
    $.ajax({
      type: "post",
      url: "http://api.pyg.ak48.xyz/api/public/v1/users/get_reg_code",
      data: {
        mobile: mobile_text
      },
      dataType: "json",
      success: function success(res) {
        console.log(res);
      }
    });
  }); //注册按钮,发送请求前先做表单验证

  $(".pyg-register").on("tap", function () {
    var mobile_text = $("input[name='mobile']").val().trim();
    var code_text = $("input[name='code']").val().trim();
    var email_text = $("input[name='email']").val().trim();
    var pwd_text = $("input[name='pwd']").val().trim();
    var rePwd_text = $(".re-pwd").val().trim();
    var gender_text = $("input[name='gender']:checked").val().trim(); //验证手机号码

    if (checkPhone(mobile_text)) {
      console.log("手机号验证成功");
    } else {
      mui.toast("请输入正确的手机号");
      return;
    } //验证验证码是否合法


    if (code_text.length == 4) {
      console.log("验证码验证成功");
    } else {
      mui.toast("请输入合法的验证码");
      return;
    } //验证邮箱是否合法


    if (checkEmail(email_text)) {
      console.log("邮箱验证成功");
    } else {
      mui.toast("请输入正确的邮箱地址");
      return;
    } //验证密码长度


    if (pwd_text.length >= 6 && pwd_text.length <= 12) {
      console.log("密码允许");
    } else {
      mui.toast("密码长度应在6-12位");
      return;
    } //验证再次输入的密码是否一致


    if (rePwd_text === pwd_text) {
      console.log("两次密码输入一致");
    } else {
      mui.toast("两次密码输入不一致");
      return;
    }

    $.ajax({
      type: "post",
      url: "http://api.pyg.ak48.xyz/api/public/v1/users/reg",
      data: {
        mobile: mobile_text,
        code: code_text,
        email: email_text,
        pwd: pwd_text,
        gender: gender_text
      },
      dataType: "json",
      success: function success(res) {
        if (res.meta.status != 200) {
          mui.toast(res.meta.msg);
        }
      }
    });
  }); //手机号码验证

  function checkPhone(phone) {
    if (!/^1[34578]\d{9}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  }

  ; //邮箱验证

  function checkEmail(myemail) {
    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

    if (myReg.test(myemail)) {
      return true;
    } else {
      return false;
    }
  }
});
//# sourceMappingURL=register.js.map
