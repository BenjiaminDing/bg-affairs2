$(function () {


    const  preUrl=getBaseUrl();
    const layer=layui.layer;
    const articleForm = layui.form
    initArticle()
    function initArticle() {
        let msgx='';
        let codex=9999999;
        axios({
            url: preUrl+'/cateList',
            method: 'GET',
            header:{Authorization: 'token1234' || ''},
            data: {
            }
        }).then(res => {
            console.log(res)
            console.log(res.data)
            const   respone=res.data;
            renderArticleInfo(res);
            // }
        }).catch(err => {
            console.log('article_info err')
            console.log(err)
        }).finally(res => {
            console.log('article_info   finally  fffff');
            console.log('fe:::',res)

        })
    }

    const  tbodyFrom=document.querySelector('.layui-card-body tbody')


// 渲染表格
    function renderArticleInfo(respone) {

        const  list=respone.data;
        let   htmlStr = template('tpl-table',respone);
        // console.log('htmlStr>>>:::',htmlStr)
        tbodyFrom.innerHTML=htmlStr;

    }

// 添加文章分类
// btnAddCate
    const  btnAddCate=document.querySelector('#btnAddCate')
    const  dialogAdd=document.querySelector('#dialog-add')

    let   indexz=999999;
    btnAddCate.addEventListener('click',function (e) {

        console.log(dialogAdd.innerHTML)
        indexz=  layer.open({
            title:"添加文章分类",

            type:1,
            area: ['500px', '300px'],
            content: dialogAdd.innerHTML,
        });

    })


// 事件代理  委托

    const  body=document.querySelector('body')
    body.addEventListener('submit',  function (e) {

        e.preventDefault()
        console.log(e)
        // console.log(   e.target )


        console.log(        articleForm.val('article-addx'))

        let id=1;
         axios.post(
            preUrl+'/cateList',
            // from数据
            articleForm.val('article-addx')
        ).then(res =>{
            console.log('result--pwd:::>>>'+res)

            // 初始化
            initArticle()
            layer.close(indexz)
        }).catch(err => {
            console.log('article_info  add err')
            console.log(err)

        }).finally(res => {
            console.log('article_info  add  finally  fffff');
            console.log('fe:::',res)


        })

    })













// 通过代理的形式，为 btn-edit 按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: preUrl+'/cateList',
            success: function(res) {
                console.log(res[3])
                debugger
                // form.val('form-edit', res[3])

                articleForm.val('form-edit', res[3])
            }
        })
    })





// 通过代理的形式，为修改分类的表单绑定 submit 事件
    $('body').on('submit', '#form-edit-ben', function(e) {
        e.preventDefault()

        axios.patch(
            preUrl+'/cateList/'+4,
            // from数据
            articleForm.val('form-edit')
        ).then(res =>{
            console.log('result--pwd:::>>>'+res)

            layer.msg('更新----数据成功！')
            // 初始化
            initArticle()
            layer.close(indexEdit)
        }).catch(err => {

        })
    })

// 通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')

        console.log(id)
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {

            axios.delete(
                preUrl+'/cateList/'+1

            ).then(res =>{
                console.log('result--pwd:::>>>'+res)

                layer.msg('delete----数据成功！')
                // 初始化
                initArticle()
                debugger
            })

        })
    })





})

/*
    {
      "id": 1,
      "cate_name": "科技",
      "cate_alias": "Science"
    },
    {
      "id": 2,
      "cate_name": "科技",
      "cate_alias": "Science"
    },
 */
