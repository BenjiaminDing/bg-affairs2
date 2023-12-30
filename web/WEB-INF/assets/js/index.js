


// 获取用户的基本信息
const  layer=layui.layer;
const   preUrl=getBaseUrl();
const   defaultPicPath=getUserPic();
const   wel=document.querySelector('#welcome');
const   imgHeads=document.querySelectorAll('.layui-nav-img');
const   textAvatars=document.querySelectorAll('.text-avatar');
const   btnLogout=document.querySelector('#btnLogout');
getUserInfo();
//01
function getUserInfo() {
    // console.log('token::',localStorage.getItem('token'))
    //    xhr.setRequestHeader('Authorization', 'token1234')

    let msgx='';
    let codex=9999999;
    axios({
        url: preUrl+'/my_userinfo',
        // url: preUrl+'/my_userinfo_error',
        method: 'GET',
        header:{Authorization: 'token1234' || ''},
        data: {
        }
    }).then(res => {
        console.log(res)
        console.log(res.data)
        const   respone=res.data;


        // msgx=res.data.message;
        codex=res.data.status;

        if (res.data.status !== 0){
            layer.msg(res.data.message)
        }

        // success  渲染头像
        if (res.data.status === 0){
            renderAvatar(respone);
        }
    }).catch(err => {
        console.log('errr')
        console.log(err)
        // myAlert(err.response.data.message, false)
    }).finally(res => {
        console.log('fffff');
        console.log(codex);
        if (1===codex){
            console.log('fffff');
            //1
            localStorage.removeItem('token')
            //2
            location.href='./login.html'
        }

    })

}
// 02
function renderAvatar(respone) {
    const user=respone.data
    let name=  user.nickname || user.username;
    wel.innerText='欢迎  '+name;

    // 处理头像显示方式
    user.user_pic=defaultPicPath;
    if (   user.user_pic !=='')
    {
        console.log('000001')
        console.log( user.user_pic)
        //渲染图片头像
        imgHeads.forEach((elem)=>{ elem.src=user.user_pic; elem.style.display='inline-block';})
        textAvatars.forEach((elem)=>{  elem.style.display='none';})
        // console.log('01::>>', imgHead.style)
        // console.log('02::>>', textAvatar.style)
        // debugger
    }else {
        console.log('000002')
        console.log( user.user_pic)
        // imgHead.src=user.user;
        let firstW=     name[0].toUpperCase();
        imgHeads.forEach((elem)=>{  elem.style.display='none';})
        textAvatars.forEach((elem)=>{  elem.innerText=firstW;elem.style.display='inline-block';})
    }
}

btnLogout.addEventListener('click',function (e) {

    layer.confirm('确认退出登录  ?', {icon: 3, title:'提示'}, function(index){
        // 1 清空缓存
        localStorage.removeItem('token');
        // 2 重新跳转到登录
        location.href='./login.html';
        // 关闭弹出层索引
        console.log('index::',index)
        layer.close(index);
    });

})
function test() {
    //测试indexof() 类似contains()
    let ss='uuu/my/uerttr'
    console.log(ss.indexOf('/my'))
    console.log(ss.indexOf('/my3'))

}

