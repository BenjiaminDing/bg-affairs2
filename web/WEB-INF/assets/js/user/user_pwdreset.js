
const resetPwdForm = layui.form
const  preUrl=getBaseUrl();

resetPwdForm.verify({

    // 必填项
    pwd: [/^[\S]{6,12}$/,'ben用户名必须为 6 到 12 位的非空字符'],

    // 再次确认密码
    samePwd: function (newvalue,elem) {

        const oldpwdValue=   document.querySelector("[name=oldPwd]").value;
        console.log("pwdValue::",oldpwdValue)
        // 判断两次密码
        if (oldpwdValue === newvalue){ return '新旧密码不可以一致'}
    },

    rePwd:function (revalue,elem) {

        const newPwdValue=   document.querySelector("[name=newPwd]").value;
        console.log("pwdValue::",newPwdValue)
        console.log("elem::",elem)
        // 判断两次密码
        if (newPwdValue !== revalue){ return '两次密码不一致'}
    }

});



const layuiFromResetPwd=document.querySelector('.layui-form');

layuiFromResetPwd.addEventListener('submit',async  function (e) {
    e.preventDefault();
    // const done =resetPwdForm.val('resetPwdInfo');
    await axios.patch(
        preUrl+'/updatepwd/'+1,
        resetPwdForm.val('resetPwdInfo')
        ).then(res =>{
        console.log('result--pwd:::>>>'+res)
        if (res.status !== 200) {
            return layui.layer.msg('更新密码失败！')
        }
        layui.layer.msg('更新密码成功！')
        // 重置表单
        // $('.layui-form')[0].reset()
        layuiFromResetPwd.reset();
    })

})
/*
$('.layui-form').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('更新密码失败！')
            }
            layui.layer.msg('更新密码成功！')
            // 重置表单
            $('.layui-form')[0].reset()
        }
    })

})*/
