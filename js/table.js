$(function(){
    $(".laybtn").click(function(){
        $(".layer").show();
    })
    $(".cancel").click(function(){
        $(".layer").hide();
    })
    $("#addline").click(function(){
        if($('.table tr').length<=2){
        	   $(".table tr:last th").each(function(index){
               	if($('table tr:first th').attr('colspan')>index){
           		 $(this).replaceWith('<td  onclick="paramValue(this)">'+$(this).html()+'</td>');
               	}else{
                    $(this).replaceWith('<td >'+$(this).html()+'</td>');
               	}
               	});
            $(".table tr:last th").empty();
        }else{
            $(".table").append($(".table tr:eq(2)").clone());
            $(".table tr:last td").each(function(){
                $(this).attr('rowspan',1).empty();
            });  
        }
    })
    $("#deleteline").click(function(){
        if($('.table tr').size()>3){
            for(var i=2;i<$('.table tr').size();i++){
                for(var j=0;j<$('.table tr').eq(i).children('td').size();j++){
                    if($('.table tr').eq(i).children('td').eq(j).attr('rowspan') >= $('.table tr').size() - i){
                        $('.table tr').eq(i).children('td').eq(j).attr('rowspan', $('.table tr').eq(i).children('td').eq(j).attr('rowspan') - 1 )
                    }
                }
            }
            $('.table tr:last').remove();
        }else{
            alert("可删除的内容为空");
        }
    })
    $(".table .addl").click(function(){
        var unmb=parseInt($(this).parent("th").attr("colspan"));
        var nnmb=$('.table tr:eq(0) th:eq(1)').attr("colspan");
        var linenumb=$('.table tr').length;
        for(var i=1;i<linenumb;i++){
            if(i==1){
                $('.table tr:eq(1) th').eq( $('.table tr:eq(1) th').size() - nnmb ).before('<th></th>');
            }else{
                $('.table tr').eq(i).children('td').eq( $('.table tr').eq(i).children('td').size() - nnmb ).before('<td></td>');
            }
        }
        $(this).parent("th").attr("colspan",unmb+1);
    })
    $(".table .addl1").click(function(){
        var unmb=parseInt($(this).parent("th").attr("colspan"));
        for(var i=1;i<$('.table tr').size();i++){
            if(i==1){
                $('.table tr:eq(1)').append('<th class="selectcable ui-selectee"></th>');
            }else{
                $('.table tr').eq(i).append('<td class="selectcable ui-selectee" onclick="paramValue(this)"></td>');
            }
        }
        $(this).parent("th").attr("colspan",unmb+1);
    })
    $(".table .deletel1").click(function(){
        var unmb=parseInt($(this).parent("th").attr("colspan"));
        if(unmb>1){
            var linenumb=$('.table tr').length;
            for(var i=1;i<linenumb;i++){
                if(i==1){
                    $('.table tr').eq(i).find('th:last').remove();
                }else{
                    $('.table tr').eq(i).find('td:last').remove();
                }
            }
            $(this).parent("th").attr("colspan",unmb-1);
        }else{
            alert("可删除的内容为空");
        }
    })
    $(".table .deletel").click(function(){
        var unmb = parseInt($(this).parent("th").attr("colspan"));
        var tdLeft = $('.table tr:eq(1) th').eq(unmb - 1).offset().left;
        if(unmb>1){
            for(var i=2;i<$('.table tr').size();i++){
                for(var j=0;j<$('.table tr').eq(i).children('td').size();j++){
                    if( $('.table tr').eq(i).children('td').eq(j).offset().left == tdLeft ){
                        $('.table tr').eq(i).children('td').eq(j).addClass('selected');
                    }
                }
            }
            $('.table tr .selected').remove();
            $('.table tr:eq(1) th').eq(unmb - 1).remove();
            $(this).parent("th").attr('colspan',unmb - 1);
        }else{
            alert("可删除的内容为空");
        }
    })
    // 删除选中列
    $("#deleteselie").click(function(){

        if($(".table tr:eq(0) th").attr("colspan") == 1){
            alert("可删除的内容为空");
        }else{
            if( $('.ui-selected') ){
                var tdLeft = $('.table td.ui-selected').offset().left;
                for(var i = 1; i < $('.table tr').length; i++){
                    if( i == 1 ){
                        for(var j = 0; j < $('.table tr').eq(1).children('th').length; j++){
                            if($('.table tr').eq(1).children('th').eq(j).offset().left == tdLeft){
                                $('.table tr').eq(1).children('th').eq(j).addClass('remove');
                            }
                        }
                    }else{
                        for(var j = 0; j < $('.table tr').eq(i).children('td').length; j++){
                            if($('.table tr').eq(i).children('td').eq(j).offset().left == tdLeft){
                                $('.table tr').eq(i).children('td').eq(j).addClass('remove');
                                
                            }
                        }
                    }
                }
                $('.table tr .remove').remove();
                $(".table tr:eq(0) th:eq(0)").attr("colspan",$(".table tr:eq(0) th:eq(0)").attr("colspan")-1); 
            }else{
                alert("请先选择单元格");
            }
       } 
    })
    // 删除选中行
    $("#deleteseline").click(function(){

        //设置选中范围
        var eArr = [];
        var aArr = [];
        for(var u=0;u<$('.table .ui-selected').size();u++){
            eArr.push( $('.ui-selected').eq(u).parent('tr').index() );
        }
        for(var r=0;r<eArr.length;r++) {
        　　if(jQuery.inArray(eArr[r],aArr)==-1) {
        　　　　aArr.push(eArr[r]);
        　　}
        }
        // 判断是否在第三行
        var fTr = $('.table tr .ui-selected').first().parent('tr').index();
        if( fTr == 2 && aArr.length == $('.table tr').size() - 1 ){
            alert("不可删除全部内容");
            return false;
        }else if( fTr == 2 ){
            alert("不可删除第三行");
            return false;
        }

        for(var y=1;y<aArr.length;y++){
            for(var v=0;v<$('.table .ui-selected').size();v++){
                if($('.ui-selected').eq(v).parent('tr').index() == aArr[y]){
                    $('.ui-selected').eq(v).addClass('selected');
                    break;
                }
            }
        }
        // 判断删除范围
        for(var i=0;i<$('.table .selected').size();i++){
            if( $('.selected').eq(i).attr('rowspan') > 1 ){
                alert("请先拆分选中区域的跨行单元格再删除");
                $('.selected').removeClass('selected');
                return false;
            }
        }
        var iTr = $('.selected').last().parent('tr').index();
        var iArr = [];
        for(var p=0;p<$('.selected').size();p++){
            iArr.push($('.selected').eq(p).parent('tr').index());
        }
        for(var t=0;t<iArr.length;t++){
            for(var q=0;q<$('.table tr').eq(iArr[t]).children('td').size();q++){
                if( $('.table tr').eq(iArr[t]).children('td').eq(q).attr('rowspan') > 1 ){
                    alert("同一行存在跨行单元格，请先拆分再删除");
                    $('.selected').removeClass('selected');
                    return false;
                }
            }
        }
        for(var j=2;j<iTr;j++){
            for(var k=0;k<$('.table tr').eq(j).children('td').size();k++){
                if( $('.table tr').eq(j).children('td').eq(k).attr('rowspan') > 1 ){
                    if( Number($('.table tr').eq(j).children('td').eq(k).attr('rowspan')) + j > iTr ){
                        $('.table tr').eq(j).children('td').eq(k).addClass('delRow');
                    }else if( Number($('.table tr').eq(j).children('td').eq(k).attr('rowspan')) + j == iTr ){
                        $('.table tr').eq(j).children('td').eq(k).addClass('delRow2');
                    }
                }
            }
        }
        $('.delRow').each(function(){
            $(this).attr('rowspan', $(this).attr('rowspan') - $('.table tr .selected').size());
        });
        $('.delRow2').each(function(){
            $(this).attr('rowspan', $(this).attr('rowspan') - $('.table tr .selected').size() + 1);
        });
        $('.table tr .selected').parent('tr').remove();
        $('.selected').removeClass('selected');
        $('.delRow').removeClass('delRow');
        $('.delRow2').removeClass('delRow2');
    })
    
var content = $('#t').selectable();

var _mouseStart = content.data('selectable')['_mouseStart'];

content.data('selectable')['_mouseStart'] = function(e) {
    _mouseStart.call(this, e);
    this.helper.css({
        "top": -1,
        "left": -1
    });
};

    // 合并单元格按钮
    $("#btnMerge").click(function(){

        $('.table tr').eq(0).children('.ui-selected').removeClass('ui-selected');

        $('.table tr').eq(1).children('.ui-selected').removeClass('ui-selected');

        if( $('.table tr .ui-selected').size() < 1 ){
            alert("请先选择需要合并的单元格");
            return false;
        }

        if( $('.table tr .ui-selected').size() == 1 ){
            alert("该单元格不需要合并");
            return false;
        }

        if( $('.table tr').eq(2).children('.ui-selected').size() >= 1 ){
            alert("不可合并第三行的单元格");
            return false;
        }

        //设置选中范围
        var eArr = [];
        var aArr = [];
        var cArr = [];
        var i = 0;
        var h = 0;

        $('.table tr:eq(1) .ui-selected').removeClass('ui-selected');

        var tdLeft = $('.table tr .ui-selected').offset().left;
        for(var f=0;f<$('.table tr .ui-selected').size();f++){
            if( $('.table tr .ui-selected').eq(f).offset().left != tdLeft ){
                alert("请选择同一列的单元格");
                return false;
            }
        }

        for(var u=0;u<$('.table tr .ui-selected').size();u++){
            eArr.push( $('.table tr .ui-selected').eq(u).parent('tr').index() );
        }
        for(var r=0;r<eArr.length;r++) {
        　　if(jQuery.inArray(eArr[r],aArr)==-1) {
        　　　　aArr.push(eArr[r]);
        　　}
        }
        for(var y=2;y<$('.table tr').size();y++){
            for(var v=0;v<$('.table tr .ui-selected').size();v++){
                if($('.table tr .ui-selected').eq(v).parent('tr').index() == aArr[i]){
                    $('.table tr .ui-selected').eq(v).addClass('selected');
                    i++;
                    break;
                }
            }
        }
        for(var c=0;c<$('.selected').size();c++){
            cArr.push( Number( $('.selected').eq(c).attr('rowspan') ) || 1 );
        }
        for(var d=0;d<cArr.length;d++){
            h += cArr[d];
        }
        $('.selected').eq(0).attr('rowspan', h);
        $('.selected').not($('.selected').eq(0)).remove();
        $('.selected').removeClass('selected');
    });
     
    // 拆分单元格按钮
    $("#btnSplit").click(function(){

        $('.table tr').eq(0).children('.ui-selected').removeClass('ui-selected');

        $('.table tr').eq(1).children('.ui-selected').removeClass('ui-selected');

        if( $('.table tr .ui-selected').size() < 1 ){
            alert("请先选择需要拆分的单元格");
            return false;
        }

        var tdLeft = $('.table tr .ui-selected').offset().left;

        for(var f=0;f<$('.table tr .ui-selected').size();f++){
            if( $('.table tr .ui-selected').eq(f).offset().left != tdLeft ){
                console.log($('.table tr .ui-selected').eq(f))
                alert("请选择同一列的单元格");
                return false;
            }
        }

        if( $('.table tr .ui-selected').size() == 1 && ( $('.table tr .ui-selected').attr('rowspan') == 1 || $('.table tr .ui-selected').attr('rowspan') == undefined ) ){
            alert("该单元格不需要拆分");
            return false;
        }

        for(var i=2;i<$('.table tr').size();i++){
            if( $('.table tr').eq(i).children('.ui-selected').attr('rowspan') > 1 ){
                $('.table tr').eq(i).children('.ui-selected').addClass('selected');
            }
        }

        for(var j=0;j<$('.table tr .selected').size();j++){
            var z = $('.table tr .selected').eq(j).parent('tr').index();
            var r = Number( $('.table tr .selected').eq(j).attr('rowspan') );

            for(var k=z+1;k<z+r;k++){
                for(var h=0;h<$('.table tr').eq(k).children('td').size();h++){
                    if( $('.table tr').eq(k).children('td').eq(h).offset().left + $('.table tr').eq(k).children('td').eq(h).outerWidth(true) == tdLeft ){
                        $('.table tr').eq(k).children('td').eq(h).addClass('after');
                        break;
                    }else if( $('.table tr').eq(k).children('td').eq(h).offset().left - $('.table tr .selected').eq(j).outerWidth(true) == tdLeft ){
                        $('.table tr').eq(k).children('td').eq(h).addClass('before');
                        break;
                    }else if( $('.table tr').eq(k).children('td').eq(h).offset().left < tdLeft && $('.table tr').eq(k).children('td').eq(h + 1).offset().left > tdLeft ){
                        $('.table tr').eq(k).children('td').eq(h).addClass('after');
                        break;
                    }// else if( $('.table tr').eq(k).children('td').eq(h).offset().left < tdLeft ){
                    //     console.log(4)
                    //     $('.table tr').eq(k).children('td').eq(h + 1).addClass('after');
                    //     break;
                    // }else if( $('.table tr').eq(k).children('td').eq(h).offset().left > tdLeft ){
                    //     console.log(5)
                    //     $('.table tr').eq(k).children('td').eq(h).addClass('before');
                    //     break;
                    // }
                }
            }

            for(var k=z+1;k<z+r;k++){
                if( $('.table tr').eq(k).children('.after').size() < 1 || $('.table tr').eq(k).children('.after').size() < 1 ){
                    for(var h=0;h<$('.table tr').eq(k).children('td').size();h++){
                        if( $('.table tr').eq(k).children('td').eq(h).offset().left < tdLeft ){
                            $('.table tr').eq(k).children('td').eq(h + 1).addClass('after');
                            break;
                        }else if( $('.table tr').eq(k).children('td').eq(h).offset().left > tdLeft ){
                            $('.table tr').eq(k).children('td').eq(h).addClass('before');
                            break;
                        }
                    }
                }
            }
        }
        $('.table tr .selected').attr( 'rowspan', 1 );
        $('.after').after('<td class="ui-selectee"></td>');
        $('.before').before('<td class="ui-selectee"></td>');

        $('.selected').removeClass('selected');
        $('.after').removeClass('after');
        $('.before').removeClass('before');
    });
});
// ]]>



//输入参数字段
function paramInfo(o){
	o.innerHTML=123;
};

//赋值参数
function paramValue(o){
	o.innerHTML=234;
};
//选择参数类别
function paramType(o){
	o.innerHTML=456;
};

// ]]>


//输入参数字段
function paramInfo(o){
	o.innerHTML=123;
};

//赋值参数
function paramValue(o){
	o.innerHTML=234;
};
//选择参数类别
function paramType(o){
	o.innerHTML=456;
};

// ]]>