// import Cropper from 'cropperjs';
let  layer=layui.layer;
let image=document.querySelector('img');

let btnChooseImage=document.querySelector('#btnChooseImage');
let fileTile=document.querySelector('#file');

const  cropper1=setCopper();
//01  选中图片
btnChooseImage.addEventListener('click' ,
    function (e) {
        fileTile.click();
    });



// 02
fileTile.addEventListener('change',function (e) {


   const   copper2=new Cropper(image,{
        initialAspectRatio: 1,
        aspectRatio: 1,
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false,
        autoCrop: true, // 自动创建裁剪框
        viewMode: 2, // 设置裁剪框可移动和缩放的范围
        preview: '.img-preview', // 预览 设置一个区域容器预览裁剪后的结果
        // dragMode:'move'   // crop 形成新的裁剪框 move 图片可移动none 什么也没有
    })



    let  croppedData = copper2.getCroppedCanvas({
        imageSmoothingQuality: 'high'
    })


    let  imgobj = copper2.getCroppedCanvas({
        imageSmoothingQuality: 'high'
    }).toBlob(function (blob) {


        console.log(blob);
        debugger
    });

    // .toDataURL('image/jpeg');
    console.log(croppedData);

    debugger
    const fileList=e.target.files;
    console.log(fileList[0])

    let newUrl=  URL.createObjectURL(fileList[0]);
})



function setCopper(){
    // 裁剪配置对象
    return  new Cropper(image,{
        initialAspectRatio: 1,
        aspectRatio: 1,
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false,
        autoCrop: true, // 自动创建裁剪框
        viewMode: 2, // 设置裁剪框可移动和缩放的范围
        preview: '.img-preview', // 预览 设置一个区域容器预览裁剪后的结果
        // dragMode:'move'   // crop 形成新的裁剪框 move 图片可移动none 什么也没有
    })
}

/*
reset() 重置图片和裁剪框为初始状态
replace(url[, hasSameSize]) 替换图片路径并且重建裁剪框
url 新路径
hasSameSize 默认值false 设置为true表示新老图片尺寸一样 只需要更换路径无需重建裁剪框
enable() 解冻 裁剪框
disable() 冻结 裁剪框
destroy() 摧毁裁剪框并且移除cropper实例

作者：安北分享
链接：https://www.jianshu.com/p/9dc2f643cb6a
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
let btnUpload=document.querySelector('#btnUpload');
btnUpload.addEventListener('click' ,

    function (e) {
        // 手动设置裁剪框, 每次固定位置
        // cropper.setCropBoxData({ left: 10, top: 10, width: 200, height: 200 });
        console.log( 'getCropBoxData::'+cropper1.getCropBoxData().left )  // 获取裁剪框数据)
        // 获取裁剪结果（返回裁剪后的图像数据）

        let  croppedData = cropper1.getCroppedCanvas({
            imageSmoothingQuality: 'high'
        });

        // .toDataURL('image/jpeg');
        console.log(croppedData);

        // debugger
        // 将裁剪结果显示在另一个元素中
        // var resultElement = document.getElementById('cropped-result');
        // resultElement.src = croppedData;

    });





