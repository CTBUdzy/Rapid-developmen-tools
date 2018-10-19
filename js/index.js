var clickFlag = false; //鼠标创建标识
var cloneNode = '';

$(function () {
    AppendNodes(); //添加元素
    AllEvents(); //事件功能
});

/*编辑区*/
function AppendNodes() {
    //布局选择
    $(".add-btn").each(function () {
        $(this).mousedown(function () {
            var Proportion = $(this).attr('id').split('-');
            Proportion.shift(Proportion.slice(0)); //删除layout标识
            Proportion.shift(Proportion.slice(0)); //删除btn标识
            CreatedLayout(Proportion);
            $(".add-btn").removeClass('active');
            $(this).addClass('active');
        });
    });

    //控件选择
    $(".add-assembly-btn").each(function () {
        $(this).click(function () {
            var assemblyname = $(this).attr('id').split('-');
            assemblyname.shift(assemblyname.slice(0)); //删除assembly标识
            assemblyname.shift(assemblyname.slice(0)); //删除btn标识
            Createdassembly(assemblyname);
        });
    });

}

/*创建布局*/
function CreatedLayout(Proportion) {
    cloneNode = $('<div class="model-row"></div>'); //创建ROW
    var title = $('<span class = "box-title"></span>');
    title.text('row');
    var titleWrapper = $('<div class="title-wrapper"></div>');
    titleWrapper.append(title);

    var contralModel = $('.layout-control-model').clone(true); //创建控制模块
    contralModel.show();
    titleWrapper.append(contralModel);
    cloneNode.append(titleWrapper);


    var totle = 0;
    for (let i = 0; i < Proportion.length; i++) {
        totle += parseInt(Proportion[i]); //计算比例综总和
    }
    for (let i = 0; i < Proportion.length; i++) {
        var width = parseInt(Proportion[i]) / totle * 100 + '%'; //计算相应的每个col的宽度
        var col = $('<div class="model-column"></div>');
        var title = $('<span class = "box-title"></span>');
        col.css('width', 'calc(' + width + ' - 8px)');
        title.text('column');
        var titleWrapper = $('<div class="title-wrapper"></div>');
        titleWrapper.append(title);
        col.append(titleWrapper);
        cloneNode.append(col);
    }
};

/*创建控件*/
function Createdassembly(assemblyname) {
    var clone = $('.assembly-choose').children('.' + assemblyname[0]).clone();
    cloneNode = clone;
}

function AllEvents() {
    //删除布局框
    //松开鼠标在指定位置打入节点
    $(".content-warpper").mouseup(function (e) {
        $(this).append(cloneNode);
        cloneNode = '';
        $(".add-btn").removeClass('active');
        e.stopPropagation();
    });
    $('.content-warpper').on('mouseup', '.model-column', function (e) {
        $(this).append(cloneNode);
        cloneNode = '';
        $(".add-btn").removeClass('active');
        e.stopPropagation();
    });
    //删除布局
    $(".content-warpper").on('click', '.layout-control-model .delete', function (e) {
        $(this).parent().parent().parent().remove();
    });
    //删除控件
    $(".content-warpper").on('click', '.assembly-control-model .delete', function (e) {
        $(this).parent().parent().remove();
    });

    //预览区和编辑区切换
    $('#editing-btn').click(function () {
        $('.editing-area').slideDown();
        $('.preview-area').slideDown();
    });
    $('#preview-btn').click(function () {
        var preview = $('.editing-box .content-warpper').clone(); //可用编辑区的内容
        $('.preview-area').empty(); //先清空预览区
        //        preview.children('.model-row').removeClass('model-row').addClass('preview-row');
        //        preview.children('.model-column').removeClass('model-column').addClass('preview-column');
        //preview.children('.title-wrapper').remove();
        for (let i = 0; i < preview.find('div').length; i++) {
            var flagEle = $(preview.find('div')[i]);
            if (flagEle.hasClass('model-row')) {
                flagEle.addClass('preview-row'); //修改row样式
                flagEle.removeClass('model-row');
            }
            if (flagEle.hasClass('model-column')) {
                flagEle.addClass('preview-column'); //修改column样式
                flagEle.removeClass('model-column');
            }
            if (flagEle.hasClass('assembly')) {
                flagEle.addClass('preview-assembly'); //修改column样式
                flagEle.removeClass('assembly');
            }
        }
        for (let i = 0; i < preview.find('div').length; i++) {
            var flagEle = $(preview.find('div')[i]);
            if (flagEle.hasClass('title-wrapper')) {
                console.log('3');
                flagEle.remove(); //删除操作控制条
            }
            if (flagEle.hasClass('control-model')) {
                console.log('4');
                flagEle.remove(); //删除操作控制条
            }
        }
        $('.preview-area').append(preview);
        $('.editing-area').slideUp();
        $('.preview-area').slideDown();
    });
}