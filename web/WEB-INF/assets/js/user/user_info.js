// 输入的内容校验
let  formUserBase=layui.form;
let  layer=layui.layer;
formUserBase.verify({
    // 必填项
    nickname: [/^[\S]{1,6}$/,'ben用户名必须为 1 到 6 位的非空字符'],
});
const  preUrl=getBaseUrl();
getUserBaseAjax();
function getUserBaseAjax() {
    $.ajax({
        method: 'GET',
        url:preUrl+'/my_userinfo',
        params: {abc:"123"},
        success:function (res) {
            console.log('res::',res)
            if (res.status !==0){
                return   layer.msg('获取用户信息失败')
            }
            // 正常执行
            // 给表单赋值--快速赋值 根据data里面key属性和标签的 name="" 属性
            formUserBase.val('formUserInfo',res.data);
            // formitem.val('formUserInfo',res.data);

        },
        complete :function (resx) {
            console.log('resx:::',resx)
        }
    })
}

const   btnReset=document.querySelector('#btnReset');
btnReset.addEventListener('click',function (e) {
// 阻止默认重置行为(默认是清空数据了)
    e.preventDefault();
    console.log('999 reset')
    // 恢复之前的数据
    getUserBaseAjax();
})

const   layuiFrom_userInfo=document.querySelector('.layui-form');

// 修改
layuiFrom_userInfo.addEventListener('submit',async  function (e) {
    // 先阻止
    e.preventDefault();

    console.log('submit modify userInfo')


    // formUserBase.val('formUserInfo',res.data);
    // 取出值
    // const  done=  JSON.stringify(formUserBase.val('formUserInfo'));  是obj--string
    // JSON.parse()  string  ---obj

    // const  done=  formUserBase.val('formUserInfo');
    // console.log('done::'+done.nickname)
    // console.log('done::'+ typeof  done)
    debugger
    let id =1;
    await axios.patch(preUrl+'/userInfoList/'+id,
        formUserBase.val('formUserInfo')
    ).then(e =>{
        console.log('result:::>>>'+e)
    })
    // const res = await axios.patch(`http://localhost:8088/todos/${id}`, {
    //   done,
    // })
})





// getUserBaseInfo();
//01
function getUserBaseInfo() {
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
        debugger

        // msgx=res.data.message;
        codex=res.data.status;

        if (res.data.status !== 0){
            layer.msg(res.data.message)
        }

        // success  渲染头像
        if (res.data.status === 0){
            renderBaseInfo(respone);
        }
    }).catch(err => {
        console.log('user_info err')
        console.log(err)
    }).finally(res => {
        console.log('user_info   finally  fffff');
        console.log('fe:::',res)

    })

}

function renderBaseInfo(respone) {
    console.log('88888888777')
}





