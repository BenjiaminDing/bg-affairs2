const  preUrl=getBaseUrl();
const  form=layui.form;
let laypage = layui.laypage
// 定义时间
template.defaults.imports.dataFormat=function(date){
    const dt = new Date(date)

    let y = dt.getFullYear()
    let m = padZero(dt.getMonth() + 1)
    let d = padZero(dt.getDate())

    let hh = padZero(dt.getHours())
    let mm = padZero(dt.getMinutes())
    let ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}

// 定义补零的函数
function padZero(n) {
    return n > 9 ? n : '0' + n
}
let queryParam={

    /**
     * 示例值： 1284  文章分类id(注意不是文章id)
     */
    cate_id: 1,
    /**
     * 示例值： 1  当前页码数
     */
    pagenum: 1,
    /**
     * 示例值： 2  当前页面需要的数据条数
     */
    pagesize: 2,
    /**
     * 示例值： 已发布  文章状态("已发布"和"草稿")2种值
     */
    state:''

}

// 获取文章列表数据
initTable()

// 定义一个文章分类
initArticlex()



// 获取文章列表数据的方法


function initTable(cate_id,pagesize) {
    //     let  listData=[res.data]
    //     res.data=listData;
    //
    //     let htmlStr  =  template('tpl-table',res);
    let  listData=  [
        {
            "id": 1,
            "title": "论持久战",
            "pub_date": "Wed Jun 02 2021 12:01:12 GMT+0800 (China Standard Time)",
            "state": "草稿",
            "cate_name": "最新",
            "cate_id": 1
        },
        {
            "id": 2,
            "title": "论持久战2",
            "pub_date": "Wed Jun 02 2021 12:54:46 GMT+0800 (China Standard Time)",
            "state": "已发布",
            "cate_name": "最新",
            "cate_id": 2
        }
        ,
        {
            "id": 3,
            "title": "论持久战3",
            "pub_date": "Wed Jun 02 2021 12:01:12 GMT+0800 (China Standard Time)",
            "state": "草稿",
            "cate_name": "最新",
            "cate_id": 3
        },
        {
            "id": 4,
            "title": "论持久战4",
            "pub_date": "Wed Jun 02 2021 12:54:46 GMT+0800 (China Standard Time)",
            "state": "已发布",
            "cate_name": "最新",
            "cate_id": 4
        }
    ]


    let  newList=[];
    if (cate_id!==undefined){
        newList=listData.filter((ele)=>{

            return ele.cate_id===cate_id

        })
    }else {
        newList=listData;
    }
    //
    // if (pagesize===2){
    //
    //
    //
    //
    //     newList=[newList[0],newList[1]]
    // }


    let res={};
    res.data=newList;
    res.total="4";

    let htmlStr  =  template('tpl-table',res);
    $('tbody').html(htmlStr)

    renderPage(res.total)

    // console.log(queryParam.cate_id)
    // axios.get(
    //     preUrl+'/articleList/'+queryParam.cate_id,
    //
    // ).then(res =>{
    //     console.log('result:::>>>'+res)
    //     console.log(res.data)
    //
    //     let  listData=[res.data]
    //     res.data=listData;
    //
    //     let htmlStr  =  template('tpl-table',res);
    //     $('tbody').html(htmlStr)
    // }).catch(err => {
    //     console.log(9999)
    //     console.log(err)
    // })
}


function initArticlex() {
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
        // console.log(res.data)
        const htmlStr  =   template('tpl-cate',res)

        console.log(htmlStr)

        $('[name=cate_id]').html(htmlStr)
        // 再次徐然   // 通过 layui 重新渲染表单区域的UI结构
        form.render();
    }).catch(err => {
        console.log('article_info err')
        console.log(err)
    }).finally(res => {
        console.log('article_info   finally  fffff');
        console.log('fe:::',res)

    })
}



// 为筛选表单绑定 submit 事件
$('#form-search').on('submit', function(e) {
    e.preventDefault()
    // 获取表单中选中项的值

    // 获取表单中选中项的值
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    // 为查询参数对象 q 中对应的属性赋值
    queryParam.cate_id = parseInt(cate_id)
    queryParam.state = state
    // 根据最新的筛选条件，重新渲染表格的数据
    initTable( queryParam.cate_id,queryParam.pagesize)
})





// 定义渲染分页的方法
function renderPage(total) {
    // 调用 laypage.render() 方法来渲染分页的结构
    laypage.render({
        elem: 'pageBox', // 分页容器的 Id
        count: total, // 总数据条数
        limit: queryParam.pagesize, // 每页显示几条数据
        curr: queryParam.pagenum, // 设置默认被选中的分页
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits: [1, 2, 4, 10],
        // 分页发生切换的时候，触发 jump 回调
        // 触发 jump 回调的方式有两种：
        // 1. 点击页码的时候，会触发 jump 回调
        // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
        jump: function(obj, first) {
            // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
            // 如果 first 的值为 true，证明是方式2触发的
            // 否则就是方式1触发的
            debugger
            console.log(first)
            console.log(obj.curr)
            // 把最新的页码值，赋值到 q 这个查询参数对象中
            queryParam.pagenum = obj.curr
            // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
            queryParam.pagesize = obj.limit
            // 根据最新的 q 获取对应的数据列表，并渲染表格
            // initTable()
            // undefind --进去 --是点了下面 page
            if (!first) {
                // initTable()
                initTable()
            }
        }
    })
}
