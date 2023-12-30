
// 点击
const   toReg=document.querySelector("#link_reg");
const   toLogin=document.querySelector("#link_login");
const   loginBox=document.querySelector(".login-box");
const   regBox=document.querySelector(".reg-box");

toReg.addEventListener("click",function (e) {
    // console.log(loginBox)
    // console.log(regBox)
    regBox.style.display='block';
    loginBox.style.display='none';

})
toLogin.addEventListener("click",function (e) {
    // console.log(loginBox)
    // console.log(regBox)
    regBox.style.display='none';
    loginBox.style.display='block';

})


// 输入的内容校验
let  formLogin=layui.form;
let  layer=layui.layer;
formLogin.verify({

    // 必填项
    nameLine: [/^[\S]{8,12}$/,'ben用户名必须为 6 到 12 位的非空字符'],
    //pwd
    password: function(value, elem) {
        if (!/^[\S]{6,12}$/.test(value)) {
            return '密码必须为 6 到 12 位的非空字符';
        }
    },

    // 再次确认密码
    repwd: function (value,elem) {

        const nameValue=   document.querySelector(".reg-box [name=username]").value;
        const pwdValue=   document.querySelector(".reg-box [name=password]").value;
        console.log("value::",value)
        console.log("pwdValue::",pwdValue)
        console.log("elem::",elem)
        // 判断两次密码
        if (pwdValue !== value){ return '两次密码不一致'}
    }



});


//http://www.liulongbin.top:3007
//http://ajax.frontend.itheima.net/api/reguser

// 监听注册表单按钮
document.querySelector("#form_reg").addEventListener('submit',function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault();

    const nameValue=   document.querySelector(".reg-box [name=username]").value;
    const pwdValue=   document.querySelector(".reg-box [name=password]").value;
    // 发起ajax post请求

    // 使用xhr发送请求
    const URL='http://hmajax.itheima.net/api/register';
    requt({username:nameValue,password:pwdValue,url:URL});

})


function requt({username,password,url}) {
    console.log('ggg::',username,password)

    // 1. 实例化XHR对象
    const xhr = new XMLHttpRequest()
    // 2. 设置请求方法和地址
    xhr.open('POST',url )
    // 3. 监听事件，接收并使用数据
    xhr.addEventListener('loadend', () => {

        console.log('-----77777------')
        // console.log(xhr.response)
        const obj= JSON.parse(xhr.response)

        console.log(obj.code)
        console.log(obj.message)
        if (10000!==obj.code){
            return  layer.msg(obj.message);
        }
        layer.msg(obj.message);
        // location.href='./login.html'
        toLogin.click();
    })

    // 4. 设置请求头信息(根据接口文档设置Content-Type)
    xhr.setRequestHeader('Content-Type', 'application/json')

    // 5. 请求体发送数据(和请求头设置的一致)
    // 方案1: 自己写JSON
    // 方案2: JS对象--》转为JSON(推荐!)-JSON.stringify
    const obj = {
        username: username,
        password: password
    }
    const data = JSON.stringify(obj)
    xhr.send(data)
}

// form_login  登录提交接口
document.querySelector('#form_login').addEventListener('submit',function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault();

    const logNameValue=   document.querySelector(".login-box [name=username]").value;
    const logPwdValue=   document.querySelector(".login-box [name=password]").value;
    // 发起ajax post请求

    // 使用xhr发送请求
    const URL='http://hmajax.itheima.net/api/login';


    login({username:logNameValue,password:logPwdValue,url:URL});

});

function login({username,password,url}) {
    console.log('ggg::',username,password)

    // 1. 实例化XHR对象
    const xhr = new XMLHttpRequest()
    // 2. 设置请求方法和地址
    xhr.open('POST',url )
    // 3. 监听事件，接收并使用数据
    xhr.addEventListener('loadend', () => {

        console.log('-----77777------')
        // console.log(xhr.response)
        const obj= JSON.parse(xhr.response)
        console.log(obj.code)
        console.log(obj.message)
        if (10000!==obj.code){
            return  layer.msg(obj.message);
        }
        // 模拟存放token
        localStorage.setItem('token','token1234');
        layer.msg(obj.message);
        location.href='./index.html';
        //
        // toLogin.click();
    })
    // 4. 设置请求头信息(根据接口文档设置Content-Type)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', 'token1234')

    // 5. 请求体发送数据(和请求头设置的一致)
    // 方案1: 自己写JSON
    // 方案2: JS对象--》转为JSON(推荐!)-JSON.stringify
    const obj = {
        username: username,
        password: password
    }
    const data = JSON.stringify(obj)
    xhr.send(data)
}


function log2({username,password,url}) {
    axios({
        url: url,
        method: 'POST',
        header:{Authorization: 'token1234' || ''},
        data: {username,password
        }
    }).then(res => {
        console.log(res)
        console.log(res.data)
        const   respone=res.data;
        // debugger;

        if (res.data.status !== 0){
            layer.msg(res.data.message)
        }

        // success  渲染头像
        if (res.data.status === 0){
            renderAvatar(respone);
        }
    }).catch(err => {
        console.log(err.response.data.message)
        // myAlert(err.response.data.message, false)
    }).finally(e => {
        console.log(908888)
        // console.log(err.response.data.message)
        // myAlert(err.response.data.message, false)
    })
}
