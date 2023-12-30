

const  preUrl=getBaseUrl();
queryStudentInfo2(1)
function queryStudentInfo2(studentId) {
    $.ajax({
        method: 'GET',
        url: preUrl+ "/queryStudentInfo",
        // data: {},

        success: function (res) {

            console.log(res)
            // debugger
            //新建数组用于存调到的数据
            let studentInfos = [];
            if (res) {
                res.forEach(function (entry) {
                    studentInfos.push(entry);
                })
            }

            console.log(studentInfos)
            debugger

            //新建变量用于存页面模版
            let $studentInfos = $("#student-info-script").html();
            let xx=      document.querySelector('#student-info-script').innerHTML;
            const student_info=      document.querySelector('#student-info');
            console.log($studentInfos)
            const  st= juicer(xx, {"studentInfos": studentInfos});
            debugger
            student_info.innerHTML=st;
            //利用juicer将模版和数据放入页面指定位置
            // $("#student-info").html(
            //     // 编译模板并根据所给的数据立即渲染出结果.  juicer(tpl, data);
            //     juicer(xx, {"studentInfos": studentInfos})
            // );
            // dlqConfigUpdate();
        },
        error: function (reserr) {
            // notie.alert({
            //     type: 3,
            //     text: reserr,
            //     stay: false,
            //     time: 3,
            //     position: "top"
            // })
        }
    })
}


// queryStudentInfo3()




function queryStudentInfo3() {

const data= [
    {
        "studentId":1,"studentName": "李白xx","isNew": "false"
    }
    ,
    {
        "studentId":2,"studentName": "李白xx2","isNew": "false"
    }

]
    // let $studentInfos = $("#student-info-script").html();
    let tpl=      document.querySelector('#student-info-script').innerHTML;
    let student_info=      document.querySelector('#student-info');
    //  仅编译模版暂不渲染，它会返回一个可重用的编译后的函数.  不渲染
    let  compiled_tpl= juicer(tpl);
    //
    let html = compiled_tpl.render({"studentInfos": data});
    console.log(html)
    debugger
}




test3()

function test3() {
    let data = {
        list: [
            {name:' guokai', show: true},
            {name:' benben', show: false},
            {name:' dierbaby', show: true}
        ],
        blah: [
            {num: 1},
            {num: 2},
            {num: 3, innerList:[
                    {'time': '15:00'},
                    {'time': '16:00'},
                    {'time': '17:00'},
                    {'time': '18:00'}
                ]},
            {num: 4}
        ]
    };
    const student_info2=      document.querySelector('#student-info2');
    let tpl = document.getElementById('tpl').innerHTML;
    let html = juicer(tpl, data);
    student_info2.innerHTML=html
}
