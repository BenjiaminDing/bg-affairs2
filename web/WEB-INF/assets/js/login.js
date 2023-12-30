// 入口函数
$(function () {
    // 点击注册账号
    $('#link_reg').on('click',function () {
      $('.login-box').hide();
      $('.reg-box').show();

    })

    $('#link_login').on('click',function () {
        $('.login-box').show();
        $('.reg-box').hide();

    })
})
