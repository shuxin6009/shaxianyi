/**
 * Created by Administrator on 2017/4/11 0011.
 */

var $inform = $('.inform');//提示弹窗

/**
 * 底部分页 预加载
 * @param  pageCount  总页数
 */
var pageCount = 30;
$('.M-box3').pagination({
    pageCount:pageCount,//总页数
    jump:true,
    coping:true,
    homePage:'首页',
    endPage:'末页',
    prevContent:'上页',
    nextContent:'下页'
});


function priceAdd(){
    //产品价格 输入任意一个后 点击回车  输入框全不为空则新增一列
    var $ul = '<ul class="prod-price"> <li style="width:450px;">' +
        ' <input class="ifonput fl " type="text" name="section1" value="" /> ' +
        '<span class="fl zhispan">至</span> <input class="ifonput fl " type="text"  name="section2" value="" /> </li> ' +
        '<li style="width:222px;"> <input style="width:130px;" class="ifonput " type="text"  name="section3" value="" /> ' +
        '<a class="delete ">删除</a></li> <div class="cl"></div> </ul>';
    var ul_ =  $('.prod-price:last ');
    console.log(ul_);
    var sectVal_1 =  $.trim(ul_.find('input').eq(0).val());
    var sectVal_2 =  $.trim(ul_.find('input').eq(1).val());
    var sectVal_3 =  $.trim(ul_.find('input').eq(2).val());
    if(sectVal_1!==''&&sectVal_2!==''&&sectVal_3!==''){
        ul_.after($ul);
        checkIfLastOne($('.prod-price'));
    }
}

//产品价格 删除
$(document).on('click','.prod-price a.delete',function () {
    $(this).parent().parent().remove();
    informFunc('删除成功！');
    checkIfLastOne($('.prod-price'));
});

var x = '';
$(document).on('keydown',function () {
    if (event.keyCode==13){  //回车键的键值为13
        console.log(x+'x');
        if(x==1){
            priceAdd();//产品价格 全部输入后  点击回车键 也新增一列
        }else if(x==2){
            colorAdd();//色卡分类 全部输入后  点击回车键 也新增一列
        }else if(x==3){
            componentAdd();//成分明细 全部输入后  点击回车键 也新增一列
        }
       // priceAdd();//产品价格 全部输入后  点击回车键 也新增一列
       // colorAdd();//色卡分类 全部输入后  点击回车键 也新增一列
       // componentAdd();//成分明细 全部输入后  点击回车键 也新增一列
    }
});

$('.prod-price:last input').on('focus',function(){
   x = 1;
});

$('.ul-color:last input[type=text]').on('focus',function(){
    x = 2;
});

$('.tansix1 ul li:last input[type=text]').on('focus',function(){
    x = 3;
});


//色卡分类 上传图片
$(document).on('change','.ul-color input[type=file]',function () {
   var this_ = $(this);
   var file = this.files[0];
    var objUrl = getObjectURL(file) ;
    console.log("objUrl = "+objUrl) ;
   // imgCheckSize(file); //验证大小
    //imgCheckName(file);//验证后缀
    if(objUrl!==''){
        var size_ = file.size;
        console.log(size_);
        var size_kb = size_ / (1024 );   //换成KB单位
        if(size_kb>300){//大小不大于300k
            alert("请上传不大于300kb的图片！");
            return ;
        }
    }
    var newVal = file.name.split(".");
    var reg_ = /^(jpg|png)$/;
    if(objUrl!==''&&!reg_.test(newVal[newVal.length-1])) {
        alert("请上传后缀为jpg、png的图片！");
        return false;
    }
    //如果已经有图片，就修改
    var img = $(this).parent().parent().parent().find('img');
    console.log(img.size());
    if (objUrl&&img.size()>=1) {
        img.attr('src',objUrl);
    }else if(objUrl&&img.size()<1){
        var $div = '<div class="infopic fl"><img src="'+objUrl+'" alt="" /></div> ';
        $(this).parent().parent().after($div);
    }
    //$('.ul-color:last input[type=text]').trigger('blur');  //是否添加一行
});
//从电脑选取文件的url
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

//色卡分类 删除
$(document).on('click','.ul-color .delete',function () {
    $(this).parent().parent().remove();
    informFunc('删除成功！');
    checkIfLastOne($('.ul-color'));
});

function colorAdd() {
    //色卡分类 输入任意一个后 回车 全不为空 则新增一列
    var $ul = '<ul class="ul-color"> <li style="width:163px;"> <input class="ifonput" type="text" /> </li> ' +
        '<li style="width:143px;"> <input style="width:130px;" class="ifonput" type="text" /> </li>' +
        ' <li style="width:102px;"> <input style="width:92px;" class="ifonput" type="text" /> </li> ' +
        '<li class="last" style="width:213px;"> <div class="chufox fl"><a href="#">上传图片<input type="file" name=""> </a></div> <div class="shanpan delete fl"><span>删除</span></div></li> ' +
        '<div class="cl"></div> </ul>';

    var _this = $(this);
    var ul_ =  $('.ul-color:last ');
    var sectVal_1 =  $.trim(ul_.find('input').eq(0).val());
    var sectVal_2 =  $.trim(ul_.find('input').eq(1).val());
    var sectVal_3 =  $.trim(ul_.find('input').eq(2).val());
    var img_size = ul_.find('.infopic img').size();//图片是否上传  图片可以为空
    if(sectVal_1!==''&&sectVal_2!==''&&sectVal_3!==''){
        ul_.after($ul);
        checkIfLastOne($('.ul-color'));
    }
}
//色卡分类 最后一行 不能删除 变成清除内容的清除按钮 shanpan
function checkIfLastOne(obj) {
   var li_len =  obj.size();
   if(li_len<=1){
       if(obj.hasClass('ul-color')){//色卡
           $('.ul-color:last .delete').addClass('emptyBtn').removeClass('delete').find('span').text('清除');
       }else{
           $('.prod-price:last .delete').addClass('emptyBtn').removeClass('delete').text('清除');
       }

   }else{
       if(obj.hasClass('ul-color')){
           $('.ul-color:first .emptyBtn').addClass('delete').removeClass('emptyBtn').find('span').text('删除');
       }else{
           $('.prod-price:first .emptyBtn').addClass('delete').removeClass('emptyBtn').text('删除');
       }
   }
}

//点击清除 按钮  色卡
$(document).on('click','.ul-color:last .emptyBtn',function () {
    $(this).parent().parent().find('input').val('');
    $(this).parent().parent().find('.infopic').remove();
});

//点击清除 按钮  产品价格
$(document).on('click','.prod-price:last .emptyBtn',function () {
    $(this).parent().parent().find('input').val('');
});

//产品图片 上传  可上传多个 5
$('.xuanchuan a').click(function () {
    var length = $('.xpicmall ul li').size();
    console.log('图片个数'+length);
    if(length>=5){
        alert('最多只能选择5张图片');
        return;
    }else{
        $('#prodImg').trigger('change');
    }
});
var flag = true;
$('#prodImg').change(function () {
    var length = $('.xpicmall ul li').size();
    console.log('图片个数'+length);
    if(length>=5){
        alert('最多只能选择5张图片');
        return;
    }
    var this_ = $(this);
    var length_ = this.files.length;
    console.log(this.files);
    var totalLen = length_ + length;
    if(totalLen>5){
        alert('最多只能选择5张图片');
        return;
    }
    var file = this.files[0];
    //imgCheckSize(file); //验证大小
   //imgCheckName(file);//验证后缀
    var objUrl = getObjectURL(file) ;
    if(objUrl!==''){
        var size_ = file.size;
        console.log(size_);
        var size_kb = size_ / (1024 );   //换成KB单位
        if(size_kb>300){//大小不大于300k
            alert("请上传不大于300kb的图片！");
            return ;
        }
    }
    var newVal = file.name.split(".");
    var reg_ = /^(jpg|png)$/;
    if(objUrl!==''&&!reg_.test(newVal[newVal.length-1])) {
        alert("请上传后缀为jpg、png的图片！");
        return false;
    }
    if(flag){
        var $img =  '<div id="imgCheck"><img src="'+objUrl+'" style="opacity:0;" ></div>';
        $('body').append($img);
        flag = false;
    }else{
        $('#imgCheck img').attr('src',objUrl);
    }
    setTimeout(function () {
        var width = $('#imgCheck img').width();
        console.log('width--'+width);
        var height = $('#imgCheck img').height();
        console.log('width--'+height);
        if(width>700||height>700){//宽高不大于700*700
            alert("请上传不大于700*700的图片！");
            return false;
        }
        //$('#imgCheck').remove();
        if (objUrl) {
            var $div = '<li> <a href="#"><img src="'+objUrl+'" alt="" /></a> ' +
                '<div class="zhezhao zhezhao2"><span>删除</span></div> </li> ';
            $('.xpicmall ul').append($div);
            informFunc('上传成功！');
        }
        $('#prodImg').val('');
    },500);
});

function imgCheckSize(file) { //图片大小
    var objUrl = getObjectURL(file) ;
    if(objUrl!==''){
        var size_ = file.size;
        console.log(size_);
        var size_kb = size_ / (1024 );   //换成KB单位
        if(size_kb>300){//大小不大于300k
            alert("请上传不大于300kb的图片！");
            return ;
        }
    }
}
function imgCheckName(file) { //图片后缀
    var objUrl = getObjectURL(file) ;
    console.log(file.name);
    var newVal = file.name.split(".");
    var reg_ = /^(jpg|png)$/;
    if(objUrl!==''&&!reg_.test(newVal[newVal.length-1])) {
        alert("请上传后缀为jpg、png的图片！");
        return false;
    }
}

function MaxImgLen(maxLen) {//限制图片个数
    var length = $('.xpicmall ul li').size();
    if(length>maxLen){
        alert('最多只能选择'+maxLen+'张图片');
        return;
    }
}
//删除图片
$(document).on('click','.zhezhao ',function(){
    informFunc('删除成功！');
    $(this).parent().remove();
});

//点击保存  提示成功
$('.baocun .save').click(function () {
    informFunc('保存成功！');
});

//成分设置 计算百分比 不为0
$(document).on('keyup','.tansix1  ul li input.compo-per',function(){
    var val = $.trim($(this).val());
    if(val!==''&&!/^(\d)*$/.test(val)){
        alert('请输入数字！');
        $(this).val('');
    }
    if(parseInt(val) > 100){
        alert('请输入不大于100的数！');
        $(this).val('');
    }else if(parseInt(val) <=0){
        alert('成分不能为零！');
        $(this).val('');
    }else{
        totalPer();
    }
});

function componentAdd(){
   //成分明细弹窗 回车 是否新建一个列  和显示保存
    var total = 0;
    var last_ = $('.tansix1 ul li:last'); //最后一个
    var name = last_.find('input.compo-name').val();//成分
    var compoPer =  last_.find('input.compo-per').val();//比例
    var val = $.trim(compoPer);
    if($('.tansix1').hasClass('cur') && val==0){
        alert('成分不能为零！');
        return;
    }
    $('.tansix1  ul li input.compo-per').each(function () { //比例不能为0
        var num = $.trim($(this).val());
        console.log(num);
        if(num==''||parseInt(num)<=0){
            num = 0;
            return ;
        }else{
            num = parseInt(num);
        }
        total += num;
    });
    //计算百分比总和
    if(total>=100){

        return;
    }
    if(val!==''&&parseInt(val)>0&&parseInt(val) < 100 && name!==''){
        var index = $('.tansix1  ul li').size();
        index = parseInt(index) + 1;
        var $li = '<li> <div class="lietext"> <span class="textpxz">成分'+ index +'</span><div class="selectDiv textmall fl"> ' +
            '<input type="text" value="棉" class="selectInp compo-name" maxlength="3"/> ' +
            '<span class="selectBtn xialap iconfont icon-xiasanjiao-copy"></span> <div class="selectBox xialatext">' +
            ' <p>11</p> <p>22</p> <p>33</p> </div> </div><div class="textmall textmallx2 fl"> ' +
            '<input type="text" value="" class="compo-per" maxlength="3" /> ' +
            '<em class="baifen">%</em> </div><a class="delete">删除</a> </div> <div class="cl"></div> </li>';
        last_.after($li);
    }
    ifLastOne();//成分
}
//计算成分 百分比总和
function totalPer() {
    var total = 0;
    $('.tansix1  ul li input.compo-per').each(function () {
        var num = $.trim($(this).val());
        console.log(num);
        if(num==''||parseInt(num)<=0){
            num = 0;
            return ;
        }else{
            num = parseInt(num);
        }
        total += num;
    });
    if(total>100){
        alert('成分百分比总和大于100%！请重新输入！');
        return;
    }
    $('.dianquexs .last').text(total+'%');
    if(total==100) {
        $('.tansix1  .save').css('display','inline-block');
        $('.tansix1  .last').css('display','none');
    }else{
        $('.tansix1  .last').css('display','inline-block');
        $('.tansix1  .save').css('display','none');
    }
    return total;
}
//成分设置 显示隐藏
$('.kusmax .component').click(function(){
    $('.tansix1').toggleClass('cur');
});
//取消 成分
$('.tansix1 .dianquexs a.cancle,.tansix1 .baocun a.cancle,.tansix1 .fr').on('click',function () {
    $('.kusmax .component').trigger('click');
});
//删除 成分  最后一个 不删除
$(document).on('click','.tansix1 .lietext a.delete',function () {
    var length = $('.ulmalls ul li ').size();
    if(length>1){
        $(this).parent().parent().remove();
    }
    totalPer();
    ifLastOne();
});

//成分1排名 遍历排序
function compoOrder() {
    $('.tansix1 .ulmalls ul li').each(function () {
        var index = $(this).index();
        $(this).find('.textpxz').text('成分'+parseInt(index+1));
    });
}
//成分 是否是最后一个
function ifLastOne() {
    var length = $('.ulmalls ul li ').size();
    if(length<=1){
        $('.ulmalls ul li:last ').find('a.delete').addClass('emptyBtn').removeClass('delete').text('清除');
    }else{
        $('.ulmalls ul li:first').find('a.emptyBtn').addClass('delete').removeClass('emptyBtn').text('删除');
    }
    compoOrder();
}
//成分 点击清除 按钮
$(document).on('click','.tansix1 .ulmalls ul li:last .emptyBtn',function () {
    $(this).parent().parent().find('input').val('');
});

//成分设置  保存按钮
$('.tansix1  .save').on('click',function () {
    //成分明细 要更新
    var compoArr = '';
    $('.tansix1  ul li ').each(function () {
        var _this = $(this);
        var name =  $.trim(_this.find('input.compo-name').val());
        var percent = $.trim(_this.find('input.compo-per').val());
        var compo = name + percent + '%';
        compoArr += compo + ' ';
    });
    console.log(compoArr);
    $('.component').val(compoArr);
    informFunc('保存成功！');
    setTimeout(function () {
        //$('.tansix1').hide();
        $('.kusmax .component').trigger('click');
    },2000);
});

//库存设置弹窗 点击保存
$('.chuanstvt .baocun a:last').click(function () {
    informFunc('保存成功！');
    $('.chuanstvt').hide();
});

//价格设置 添加一条
$('.tianpal a').on('click',function () {
    var $ul = '<ul class="setPrice-ul"> <li style="width:180px;"> <input class="ifonput ifonputsp2" type="text" value="">' +
        ' <span>至</span> <input class="ifonput ifonputsp2" type="text" value=""> </li> ' +
        '<li style="width:90px;"> <input  class="ifonput ifonputsp2" type="text"> </li> ' +
        '<li style="width:50px;"> <div class="shanpan"><span>删除</span></div> </li> <div class="cl"></div> </ul>';
    $('.chuanpoll .infomvstmopx').append($ul);
});
//价格设置 删除
$(document).on('click','.chuanpoll .setPrice-ul .shanpan',function () {
    informFunc('删除成功！');
    $(this).parent().parent().remove();
});
//价格设置 保存
$('.chuanpoll .baocun a:last').click(function () {
    informFunc('保存成功！');
    $('.chuanpoll').hide();
});

//下拉选择 公用  支数  品牌
$(document).on('click','.selectDiv .selectBtn',function () {//点击按钮
    $(this).parent().find('.selectBox').toggleClass('cur');
}).on('click','.selectDiv .selectBox p,.selectDiv .selectBox span',function () {//选择
    var _this = $(this);
    var chosedVal = _this.text();
    var parents_ = _this.parent().parent();
    parents_.find('.selectInp').val(chosedVal);
    parents_.find('.selectBtn').trigger('click');
}).on('focus','.selectDiv .selectInp',function(){
    $(this).parent().find('.selectBtn').trigger('click');
});

function moveInformFunc(obj) {//弹窗拖动
    var canGragDiv = obj.find('.toptitsix');  //可以拖动的区域
    canGragDiv = canGragDiv || obj;
    canGragDiv.mousedown(function(){
        var boxX=event.x-parseInt(obj.position().left);
        var boxY=event.y-parseInt(obj.position().top);
        $(document).mousemove(function(){
            var xx=event.x-boxX;
            var yy=event.y-boxY;
            if(xx<10){
                xx=0;
            }
            if(yy<10){
                yy=0;
            }
            obj.css({
                "top":yy+"px",
                "left":xx+"px",
            });
        });
        $(document).mouseup(function(){
            $(document).unbind("mousemove");
        })
    });
}

//产品管理 列表删除一行
$(document).on('click','.qiemallst li .tanspan2',function () {
    $(this).parent().parent().remove();
    informFunc('删除成功！');
});
//产品管理 点击编辑 跳转到发布产品
$(document).on('click','.mast5  .tanspan1',function () {
    $('.inmaslt ul li:eq(1) a').trigger('click');
});

/**产品管理  滚屏 顶部和左侧栏始终能看见
 *
 */
$(window).on("scroll", function(){
    var top = $(this).scrollTop(); // 当前窗口的滚动距离
    //console.log(top);
    if (top>=450) {//回顶部 是否显示
        $('.huiding').show();
    }else{
        $('.huiding').hide();
    }
    if(top>0){
        ifProdShow();
    }
    var top_ = $('.qiemallst ul').offset().top;
    //console.log(top_);
});

function  ifProdShow() {
    //滚动  显示顶部 只在产品管理
    if($('.inmaslt ul li:eq(2)').hasClass('cur')){
        $('.top').addClass('topFix');
        $('.topbannx').addClass('topbannxFix');
        $('.leftnav').addClass('leftnavFix');
        $('.filterBox').addClass('filterBoxFix');
        $('.qiebox').addClass('qieboxFix');
        $('.bottqie .quanxuan').addClass('quanxuanFix');
        $('.chanxinl').addClass('chanxinlFix');
        $('.fabusha').addClass('fabushaFix');
        $('.qiemallst').addClass('qiemallstFix');
    }else{
        $('.top').removeClass('topFix');
        $('.topbannx').removeClass('topbannxFix');
        $('.leftnav').removeClass('leftnavFix');
        $('.filterBox').removeClass('filterBoxFix');
        $('.qiebox').removeClass('qieboxFix');
        $('.bottqie .quanxuan').removeClass('quanxuanFix');
        $('.chanxinl').removeClass('chanxinlFix');
        $('.fabusha').removeClass('fabushaFix');
        $('.qiemallst').removeClass('qiemallstFix');
    }
}
//切换页面时候，执行
$('.inmaslt ul li').click(function(){
});
//回顶部
$('.bust1').click(function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
});
//回底部
$('.bust2').click(function(){
    document.getElementsByTagName('body')[0].scrollTop=document.getElementsByTagName('body')[0].scrollHeight;
});

/**分页设置  顶部和上下分页 要和底部的分页 同步
 *
 */
//上一页 顶部
var $yemasix = $('.yemasix');
$yemasix.find('.prev').click(function () {
    var parent = $(this).parent();
    var cur = parent.find('.currentPage');
    var current = cur.text();
    console.log(current);
    var totalPage =  parent.find('.totalPage').text();
    if(parseInt(current)>1){
        current--;
        $(this).removeClass('cur');
        $yemasix.find('.next').removeClass('cur');
    }else{
        $(this).addClass('cur');
    }
    cur.text(current);
    triggerBtmClick(current);//触发底部的分页事件
});
//下一页 顶部
$yemasix.find('.next').click(function () {
    var parent = $(this).parent();
    var cur = parent.find('.currentPage');
    var current = cur.text();
    var totalPage =  parent.find('.totalPage').text();
    if(parseInt(current) < parseInt(totalPage)){
        current++;
        $(this).removeClass('cur');
        $yemasix.find('.prev').removeClass('cur');
    }else{
        $(this).addClass('cur');
    }
    cur.text(current);
    triggerBtmClick(current);//触发底部的分页事件
});
function triggerBtmClick(current) { //触发底部分页的跳转事件
    $('.M-box3 .jump-ipt').val(current);//跳转输入框
    $('.M-box3 a.jump-btn').trigger('click');
}

/**库存设置 价格设置
 *
 */
//点击库存 获取选中列表
$('.tanspan4').click(function(){
    $('.chuanstvt').show();
    $('.chuanstvt input').val('');//清空
    $(this).parent().parent().addClass('selected').siblings().removeClass('selected');
    //var id = $(this).parent().parent().data('id');
});

//价格 获取选中列表
$('.tanspan3').click(function(){
    $('.chuanpoll').show();
    $('.chuanpoll input').val('');//清空
    $(this).parent().parent().addClass('selected').siblings().removeClass('selected');
    //var id = $(this).parent().parent().data('id');
});

//保存 库存设置
$('.chuanstvt .baocun .cur').on('click',function () {
    var val = $.trim($(this).parent().parent().find('input.ifonput').val());//库存
    $('.qiemallst ul li.selected .mast1').eq(1).text(val);  //选中的 库存 变化
    //修改时间
    var date = new Date();
    console.log(date);
    var $day = formatData(date,'yyyy-MM-dd');//转成月日格式
    var hour = date.getHours();
    var minute = date.getMinutes();
    var time = hour + ':' + minute;
    console.log(time);
    console.log($day);
    var day = $day + '<br>'+ time;
    $('.qiemallst ul li.selected .mast3').eq(1).html(day);//修改时间
});

//保存 价格设置  todo 重量区间 编辑好了保存在哪里？
$('.chuanpoll .baocun .cur').on('click',function () {
    var val = $.trim($(this).parent().parent().find('input[name=price]').val());//价格
    $('.qiemallst ul li.selected .mast1').eq(0).text(val);  //选中的 价格 变化
    //修改时间
    var date = new Date();
    var $day = formatData(date,'yyyy-MM-dd ');//转成月日格式
    var hour = date.getHours();
    var minute = date.getMinutes();
    var time = hour + ':' + minute;
    console.log(time);
    console.log($day);
    var day = $day + '<br/>'+ time;
    $('.qiemallst ul li.selected .mast3').eq(1).html(day);//修改时间
});


/**
 * 日期格式化
 * @param  {Date} date   [需要格式化的日期]
 * @param  {String} format [需要返回的格式 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *  年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) ]
 * @return {String}        []
 */
var formatData =  function(date, format){
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
}

//取消  价格设置  和  库存设置
$('.chuanpoll .setext,.chuanstvt .setext').on('click',function () {
    $(this).parent().parent().hide();
    $(this).parent().parent().find('input').val('');//清空
});



/**公司基本信息
 *
 */
//基本设置 上传图片
$('a.upload').click(function () {
    $('#btn_file').trigger('click');
});
$(document).on('change','#btn_file',function () {
    var file = this.files[0];
    var objUrl = getObjectURL(file) ;
    console.log("objUrl = "+objUrl) ;
   /* if(objUrl!==''){
        var size_ = file.size;
        console.log(size_);
        var size_kb = size_ / (1024 );   //换成KB单位
        if(size_kb>300){//大小不大于300k
            alert("请上传不大于300kb的图片！");
            return ;
        }
    }
    var newVal = file.name.split(".");
    var reg_ = /^(jpg|png)$/;
    if(objUrl!==''&&!reg_.test(newVal[newVal.length-1])) {
        alert("请上传后缀为jpg、png的图片！");
        return false;
    }*/
    //如果已经有图片，就修改
    var img = $('.piclast').find('img');
    console.log(img.size());
    if (objUrl&&img.size()>=1) {
        img.attr('src',objUrl);
    }else if(objUrl&&img.size()<1){
        var $div = '<img class="logo" src="'+objUrl+'" alt="" /> ';
        $('.piclast').append($div);
    }
});
//添加品牌
$('.addBrand').on('click',function () {
    var $bootttian = $('.bootttian ');
    var index = $bootttian.find('.putian').size();
    index = parseInt(index) + 1;
    var $brand = '<div class="putian fl"> <label for="">品牌'+index+'</label> <input type="text" /> </div>';
    $bootttian.append($brand);
});

function getBrandNum(){//计算品牌个数
    var $putian = $('.bootttian .putian');
    $putian.each(function(){
        var index = $(this).index();
        index = parseInt(index) + 1;
       $(this).find('label').text('品牌'+index);
    });
}

//点击新增按钮
$('.mastvt a').click(function(){
    if( $(this).parent().parent().parent().hasClass('compBasic')){ //只有公司信息要隐藏新增按钮
        $(this).hide();
    }else{
        $(this).addClass('not-allowed');
    }
    //$(this).hide();
    $(this).parent().parent().parent().find('.bianlabox').addClass('cur');//显示输入div
    $(this).parent().parent().parent().find('.zanwubox').hide(); //暂无隐藏

    $(this).parent().parent().parent().find('.bianlabox input').val('');//清空
});

/**   新增或编辑公司信息
 * busMode 模式  startTime 开始时间  turnover 营业额  legalPerson 法人  sexuality 性别  phoneMumber 电话 compUrl  网址
 *  fax 传真provAddr 地址 省     detailAddress 详细地址  postCode 邮编
 *  addCompFlag ：true 为公司信息已添加  false已删除;
 *
 */
//公司信息 保存新增
var addCompFlag = false; //true 公司添加  false已删除
$('.compBasic .baocun a.cur').click(function(){
    var compName =  $.trim($('.compBasic .compName').val());
    $('.rightitem h2').text(compName);//公司名称
    var img = $('.piclast img').attr('src');
    if(!!img){
        $('.leftitem  a img').attr('src',img);//图片
    }
    var _error = '';
    var param = {};
    $('.compBasic .qimallsat  input,.compBasic .qimallsat  textarea').each(function () {
        var _this  = $(this);
        var val = $.trim(_this.val());
        if(!!val){
            param[_this.attr('name')] = val;
            _error = true;
        }else{
            _error = false;
        }
    });
    //console.log(param);
    console.log(_error);
    if( _error == false){
        alert('请输入完整信息！');
        $(this).parents('.bianlabox').show();
        $(this).parents('.pastmall').find('.xianboxpl').hide();
        return false;
    }else{
        addCompFlag = true;
        var desc = $('.liuyan ').val();//简介
        var compType = $('.compType').val();//类型
        var busMode = $.trim($('.busMode') .val());
        var startTime = $.trim($('.startTime') .val());
        var turnover = $.trim($('.turnover') .val());
        var legalPerson = $.trim($('.legalPerson') .val());
        var sexuality = $.trim($('.sexuality') .val());
        var phoneMumber = $.trim($('.phoneMumber') .val());
        var fax = $.trim($('.fax') .val());
        var compUrl = $.trim($('.compUrl').val());
        var postCode = $.trim($('.postCode') .val());

        var provAddr = $.trim($('.provAddr') .val());//省
        var cityAddr = $.trim($('.cityAddr') .val());//市
        var areaAddr = $.trim($('.areaAddr') .val());//区

        var detailAddress = $.trim($('.detailAddress') .val());

        $('.zhanul ul:eq(0) li').eq(0).text(legalPerson); //法人
        $('.zhanul ul:eq(0) li').eq(1).text(sexuality); //性别
        $('.zhanul ul:eq(0) li').eq(2).text(compType); //类型
        $('.zhanul ul:eq(0) li').eq(3).text(busMode); //模式
        $('.zhanul ul:eq(0) li').eq(4).text(); //规模 TODO ??哪里来的
        $('.zhanul ul:eq(0) li').eq(5).find('span').text(startTime); //开始时间
        $('.zhanul ul:eq(0) li').eq(6).find('span').text(turnover); //营业额
        //以下是第二个列表
        $('.zhanul ul:eq(1) li').eq(0).find('span:eq(0)').text(phoneMumber); //电话
        $('.zhanul ul:eq(1) li').eq(0).find('span:eq(1)').text(fax); //传真
        $('.zhanul ul:eq(1) li').eq(1).text(compUrl); //网址


        $('.zhanul ul:eq(1) li').eq(2).text(provAddr + cityAddr + areaAddr + detailAddress); //详细地址

        $('.zhanul ul:eq(1) li').eq(3).text(postCode); //邮编
        $('.shaobxo p').text(desc);//简介

        //品牌 todo  保存在何处？
        var brandArr = [];
        $('.bootttian .putian').each(function(){
            var brand = $.trim($(this).find('input').val());
            brandArr.push(brand);
        });
        $(this).parents('.bianlabox').removeClass('cur');
        $(this).parents('.pastmall').find('.xianboxpl').show();
        $(this).parents().find('.mastvt a').removeClass('not-allowed');
        informFunc('保存成功！');
    }
});

/**编辑信息
 *
 */
//公司信息 编辑
$('.compBasic .showtextx1').click(function(){
    $(this).parents('.pastmall').find('.zanwubox').hide();
    // $(this).parents('.pastmall').find('.mastvt a').hide();
    $(this).parents('.pastmall').find('.mastvt a').removeClass('not-allowed');
    $(this).parents('.pastmall').find('.xianboxpl').hide();
    $(this).parents('.pastmall').find('.bianlabox').addClass('cur');

    //获取之前加载内容，
    var compName =  $('.rightitem h2').text();//公司名称
     $('.compBasic .compName').val(compName);
    var img = $('.leftitem img').attr('src');
    if(!!img){
        $('.piclast  a img').attr('src',img);//图片
    }
    var legalPerson = $('.zhanul ul:eq(0) li').eq(0).text(); //法人
    var sexuality = $('.zhanul ul:eq(0) li').eq(1).text(); //性别
    var compType = $('.zhanul ul:eq(0) li').eq(2).text(); //类型
    var busMode = $('.zhanul ul:eq(0) li').eq(3).text(); //模式
   // var sexuality = $('.zhanul ul:eq(0) li').eq(4).text(); //规模 TODO ??哪里来的
    var startTime = $('.zhanul ul:eq(0) li').eq(5).find('span').text(); //开始时间'成立于'+startTime
    var turnover = $('.zhanul ul:eq(0) li').eq(6).find('span').text(); //营业额

    //以下是第二个列表
    var phoneMumber = $('.zhanul ul:eq(1) li').eq(0).find('span:eq(0)').text(); //电话
    var fax = $('.zhanul ul:eq(1) li').eq(0).find('span:eq(1)').text(); //传真
    var compUrl = $('.zhanul ul:eq(1) li').eq(1).text(); //网址
    var detailAddress = $('.zhanul ul:eq(1) li').eq(2).text(); //地址


    var postCode = $('.zhanul ul:eq(1) li').eq(3).text(); //邮编
    var desc = $('.shaobxo p').text();//简介

    $('.liuyan ').val(desc);//简介
    $('.compType').val(compType);//类型
    $('.busMode') .val(busMode);
    $('.startTime' ).val(startTime);
    $('.turnover') .val(turnover);
    $('.legalPerson') .val(legalPerson);
    $('.sexuality') .val(sexuality);
    $('.phoneMumber') .val(phoneMumber);
    $('.fax') .val(fax);
    $('.compUrl').val();
    $('.postCode') .val(compUrl);
    $('.provAddr') .val(provAddr);
    $('.cityAddr') .val(cityAddr);
    $('.areaAddr') .val(areaAddr);
    $('.detailAddress') .val(detailAddress);
});

/**删除信息
 *
 */
//删除 公司信息
$('.compBasic .showtext').click(function(){
   // $(this).parents().find('.mastvt a').show();
    if($(this).parentsUntil('.inmertext').hasClass('compBasic')){//公司信息的新增按钮要显示
        $(this).parents().find('.mastvt a').show();
        $(this).parents().find('.zanwubox').show(); //显示暂无
    }else{
        $(this).parents().find('.mastvt a').removeClass('not-allowed');
    }
    //删除新增
    $(this).parents('.pastmall').find('.xianboxpl').hide();
    informFunc('删除成功！');
    addCompFlag = false;
});

//保存联系人 新增 编辑
$('.contacts .baocun a.cur').click(function(){
    //获取添加信息
    var param = {};
    var _error = '';
    $('.sixmall form .inpubox ul li input').each(function () {
        var _this  = $(this);
        var val = $.trim(_this.val());
        if(!!val){
            param[_this.attr('name')] = val;
            _error = true;
        }else{
            _error = false;
            return;
        }
    });
    console.log(param);
    console.log(_error);
    var $contact = '<ul class="colorul " data-id="'+i+'"> <li style="width:80px;">'+ param.contact +'</li> <li style="width:80px;">'+ param.position +'</li> ' +
        '<li style="width:80px;">'+param.number+'</li> <li style="width:110px;">'+param.cellphone+'</li> <li style="width:80px;">'+param.fox+'</li>' +
        ' <li style="width:180px;">'+param.email+'</li> <li style="width:100px;">'+param.qq+'</li> ' +
        '<li style="width:100px;">'+param.microMsg+'</li> <li class="last" style="width:80px;"> ' +
        '<em class="iconfont showtextx1 icon-x_shuxie"></em> <em class="last showtext iconfont icon-shanchu3"></em> </li> <div class="cl"></div> </ul>';
    if( _error == false){
        alert('请输入完整信息！');
        return false;
    }else{
        var $selected = $('ul.colorul.selected ');
        //编辑
        if($selected.size()>=1){
            var index = $selected.index();
            var i = $selected.data('i');
            $selected.prev().after($contact);
            $selected.remove();
            informFunc('编辑成功！');
            $('.colorul.selected').removeClass('selected');
        }else{
            //新增
            $('.contacts .biaobox ').append($contact);
            informFunc('添加成功！');
        }
        $(this).parents('.pastmall').find('.xianboxpl').show();
        $('.contacts .biaobox').show();
        // $('.contacts .xianboxpl').show();
        $(this).parents('.bianlabox').removeClass('cur');
        $(this).parents().find('.mastvt a').removeClass('not-allowed');

    }

});

//点击编辑按钮  联系人
$(document).on('click','.contacts .showtextx1',function() {
    $(this).parents('.pastmall').find('.zanwubox').hide();
    $(this).parents('.pastmall').find('.mastvt a').removeClass('not-allowed');
    $(this).parents('.pastmall').find('.xianboxpl').hide();
    $(this).parents('.pastmall').find('.bianlabox').addClass('cur');
    var $ul = $(this).parent().parent();
    $ul.addClass('selected').siblings().removeClass('selected'); //标记已选中 编辑
    //获取信息添加到编辑div
    var objArr = [];
    $('.colorul.selected li').not('li:last').each(function () {
        var _this = $(this);
        objArr.push(_this.text());
    });
    console.log(objArr);
    var inputs_ = $('.pastmall .sixmall form input');
    inputs_.eq(0).val(objArr[0]); //联系人
    //inputs_.eq(1).val(objArr[0]); //性别
    inputs_.eq(2).val(objArr[1]); //职位
    inputs_.eq(3).val(objArr[2]); //电话
    inputs_.eq(4).val(objArr[3]); //手机
    inputs_.eq(5).val(objArr[4]); //传真
    inputs_.eq(6).val(objArr[5]); //邮箱
    inputs_.eq(7).val(objArr[6]); //qq
    inputs_.eq(8).val(objArr[7]); //微信

});

/**取消   公司信息 联系人 荣誉
 *
 */
//公司信息 取消
$('.compBasic .setext').click(function(){
    if(addCompFlag  == false){//已删除
        $(this).parents().find('.mastvt a').show();
        $('.compBasic .zanwubox').show();
    }else{
        $('.compBasic .xianboxpl').show();
    }
    $(this).parents('.bianlabox').removeClass('cur');
    //$('.sixmall form .inpubox ul li input').val('');//清空
});
//联系人 取消
$('.contacts  .setext').click(function(){
    $('.colorul.selected').removeClass('selected'); //选中编辑的 取消编辑
    if($('.colorul').size()<1){//是否显示暂无
        $('.contacts .zanwubox').show();
    }else{
        $('.contacts .zanwubox').hide();
        $('.contacts .xianboxpl').show();//列表再显示
    }
    $(this).parents('.bianlabox').removeClass('cur');
    //$('.sixmall form .inpubox ul li input').val('');//清空
});
//荣誉  取消
$('.certificate  .setext').click(function(){
    console.log($('.certificate .xianboxpl .zhizhao ul li').size());
    if($('.certificate .xianboxpl .zhizhao ul li').size()<1){
        $('.certificate .zanwubox').show();
    }else{
        $('.certificate .zanwubox').hide();
        $('.certificate .xianboxpl').show();
    }
    $(this).parents('.bianlabox').removeClass('cur');
    //$('.sixmall form .inpubox ul li input').val('');//清空
});

//删除联系人
$(document).on('click','.contacts .showtext',function() {
    var length = $('.biaobox ul.colorul').size();
    if(length<=1) {
        $('.contacts .biaobox').hide();
        $(this).parentsUntil('.inmertext').find('.zanwubox').show();
    }
    $(this).parent().parent().remove();
    informFunc('删除成功！');
});

/**荣誉证书
 *
 */
//点击 上传图片
$('.certificate .chuana').click(function () {
    $(this).find('input[type=file]').trigger('click');
});
//上传图片
$('.certificate .chuana input').change(function () {
    var val = $(this).val();
    $(this).parent().prev().val(val);
    var objUrl = getObjectURL(this.files[0]);
   // alert(this.files[0]);
});

//保存新增 荣誉
$('.certificate .baocun a.cur').click(function(){
    var  _error = false;
    $('.certificate .chuana input[type=file]').each(function () {
        var _this = $(this);
        var val = $.trim(_this.val());
        _this.parent().prev().val(val);//路径
        var picName =  $.trim(_this.parent().parent().parent().find('input.lxinputx1').val());//图片描述
        if(val==''||picName==''){
            _error = false;
            return ;
        }else{
            _error = true;
            var objUrl = getObjectURL(this.files[0]);
            console.log(this.files[0]);
            var $li = '<li> <div class="pic"> <a href="javascript:;"><img src="'+objUrl+'" alt=""></a> <div class="delete">' +
                '<span>删除</span></div> </div> <p class="rshubox">'+picName+'</p> </li>';
            $('.certificate .xianboxpl ul').append($li);
        }
    });
    if(_error==false){
        alert('请输入完整信息！');
    }else{
        $(this).parents('.bianlabox').removeClass('cur');
        $(this).parents('.pastmall').find('.xianboxpl').show();
        $(this).parents().find('.mastvt a').removeClass('not-allowed');
        informFunc('保存成功！');
    }
});

//删除 荣誉
$(document).on('click','.certificate .delete',function () {
    informFunc('删除成功！');
    $(this).parent().parent().remove();
    //是否 显示暂无
    var li_len = $('.certificate .xianboxpl ul li').size();
   if(li_len<1){
       $('.certificate .zanwubox').show();
   }
});

//纱线名称 输入时候的字数变化
$('.lxinputbox').on('keyup',function () {
    var length = $(this).val().split('').length;
    $('.konwen i').text(length);
});

function informFunc(txt) {//公用 提示弹窗
    $inform.show().text(txt);
    setTimeout(function(){
        $inform.hide();
    },2000);
}

$(function () {
    checkIfLastOne($('.ul-color'));//色卡
    checkIfLastOne($('.prod-price'));//产品价格
    ifLastOne();//成分

    moveInformFunc($('.tansix1')); //成分弹窗拖动
    moveInformFunc($('.chuanstvt'));//库存设置
    moveInformFunc($inform);//提示弹窗
    moveInformFunc($('.chuanpoll'))//价格设置
    moveInformFunc($('.pastmall'))//公司设置弹窗
    getBrandNum();//品牌个数
    ifProdShow();//产品是否滚屏

    $('.totalPage').text(pageCount);
});