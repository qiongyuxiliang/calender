$(document).ready(function() {
    // 获取当月的天数
    var timer;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var week = ((new Date(year, month, 1)).getDay())==0?7:((new Date(year, month, 1)).getDay());
    var _month = month,
    _year = year;
    var $tips = function() {
        // 创建弹窗
        var al = document.createElement('div');
        $(al).addClass('tips');
        $('body').append(al);
    }
    $tips();
    // 当n>0时
    function init(y, m) {
        $('.year').html(_year);
        $('.month').html(_month + 1);
        console.log(typeof _month);
        // 获取月的天数
        var countdays = new Date(y, m + 1, 0).getDate();
        // 动态插入li;
        var html = "";
        // 获取第一天是周几
        var firstday = new Date(y, m, 1).getDay();
        if(firstday == 0){
            firstday =7;
        }


        // console.log(firstday);
        for (var i = 1; i < firstday; i++) {
            html += '<li></li>';
        }
        for (var i = 1; i <= countdays; i++) {
            html += '<li>' + i + '</li>';
        }
        ulo = document.createElement('ul');
        $(ulo).addClass('clender');
        $(ulo).append(html);
        $('body').append(ulo);
        // 让今天永远保持背景颜色
        if (month == _month && _year == year) {
            $('.clender>li').eq(day + week - 2).css('background', 'rgba(254, 175, 0,0.6)');
        }
        $('.clender').on('click', 'li', function(e) {
            // var firstday = new Date(y,m,1).getDay();
            // var day = date.getDate();
            if ($(this).index() > firstday - 2) {
                $(this).addClass('active').siblings('li').removeClass('active');
                e.stopPropagation();
                $('.tips').empty().hide();
                clearInterval(timer);
                timer = setInterval(function() {
                    clearInterval(timer);
                    $('.tips').hide();
                    // setTimeout(timer);	        	
                }, 2000);
                var sValue = GetLunarDay(_year, _month + 1, $(this).index() - firstday + 2);
                if (_month + 1 == 5 && ($(this).index() - firstday + 2) == 1) {
                    sValue += ' ';
                    sValue += data[6].wuyi;
                }
                // 5月第一天就是周日
                if(_month +1 == 5&&$(this).index() ==13){
                    sValue += ' ';
                    sValue += other[1].muqinjie;
                }
                if (_month +1 == 6&&$(this).index() ==20) {
                    sValue += ' ';
                    sValue += other[3].fuqinjie;
                }
                $('.tips').html(sValue).show();
                // clearInterval(timer);
            }
        });
        //  在W3c中，使用stopPropagation（）方法
        // • 在IE下设置cancelBubble = true；
        // 在捕获的过程中stopPropagation（）；后，后面的冒泡过程也不会发生了~
        // 3.阻止事件的默认行为，例如click <a>后的跳转~
        // • 在W3c中，使用preventDefault（）方法；
        // • 在IE下设置window.event.returnValue = false;
        $('body').on('click', function(e) {
            e.preventDefault();
            clearInterval(timer);
            $('.tips').empty().hide();
        })
    }
    // 初始化当月
    init(year, month);
    $('.clender').show();
    // console.log(week);周日是零
    // var w = week;
    // week=((w==0)?7:w);
    // console.log(day+week-2);
    // 上个月
    $('.pre').on('click', function() {
        $('.clender').animate({
            'margin-left': '100%'
        }, 'slow').hide().remove();
            // 首先判断是否跨年
            _month = _month - 1;
            if (_month == -1) {
                _year = _year - 1;
                _month = 11;
                init(_year, _month);
                $('.clender').show().css({
                    'margin-left': '-100%'
                }).animate({
                    'margin-left': '0'
                });
            } else {
                init(_year, _month);
                $('.clender').show().css({
                    'margin-left': '-100%'
                }).animate({
                    'margin-left': '0'
                });
            }
        })
        // 下个月
        $('.next').on('click', function() {
            // 判断是否过年
            $('.clender').animate({
                'margin-left': '-100%'
            }, 'slow').hide().remove();
            _month = _month + 1;
            if (_month == 12) {
                _year = _year + 1;
                _month = 0;
                init(_year, _month);
                $('.clender').show().css({
                    'margin-left': '100%'
                }).animate({
                    'margin-left': '0'
                });
            } else {
                init(_year, _month);
                $('.clender').show().css({
                    'margin-left': '100%'
                }).animate({
                    'margin-left': '0'
                });
            }
        })
        // 返回当天
        $('.back-to-today').on('click', function() {
            $('.clender').animate({
                'margin-left': '-100%'
            }, 'slow').hide().remove();
            init(year, month);
            $('.year').html(year);
            $('.month').html(month + 1);
            // 如果年份小于当年年份，或者年份一样，月份小于当月月份，则从右侧滑入；
            // 如果年份大于当年年份，或者年份一样，月份大于当月月份，则从右侧滑入；
            // 如果就在当年当月，则不作改变
            if (_year < year || (_year == year && _month < month)) {
                $('.clender').show().css({
                    'margin-left': '100%'
                }).animate({
                    'margin-left': '0'
                });
                // $('.clender>li').eq(day + week - 2).css('background', 'rgba(254, 175, 0,0.6)');
            }
            if (_year > year || (_year == year && _month > month)) {
                $('.clender').show().css({
                    'margin-left': '-100%'
                }).animate({
                    'margin-left': '0'
                });
                // $('.clender>li').eq(day + week - 2).css('background', 'rgba(254, 175, 0,0.6)');
            } else {
                $('.clender').show();
                // $('.clender>li').eq(day + week - 2).css('background', 'rgba(254, 175, 0,0.6)');
            }
            _year = year;
            _month = month;
        })
        // 添加有多少年
        function setYear(n) {
        // 选择年份
        var option = '';
        middle = Math.floor(n / 2);
        // $('op').eq(middle).html(year);
        for (var i = 0; i < n; i++) {
            option += '<option>' + (year - (middle - i)) + '</option>';
        }
        $('#select-year').append(option);
        $('#select-year option').eq(middle).attr('selected', 'selected');
    }
    $('#select-year').change(function() {
        $('.clender').animate({
            'margin-left': '-100%'
        }, 'slow').hide().remove();
        _year = $(this).val();
        init(_year, _month);
        $('.clender').show();
    })

    function setMonth() {
        // 选择年份
        var option = '';
        // middle = Math.floor(n/2);
        // $('op').eq(middle).html(year);
        for (var i = 1; i <= 12; i++) {
            option += '<option>' + i + '</option>';
        }
        $('#select-month').append(option);
        // console.log(month);
        $('#select-month option').eq(month).attr('selected', 'selected');
    }
    $('#select-month').change(function() {
        $('.clender').animate({
            'margin-left': '-100%'
        }, 'slow').hide().remove();
        _month = parseInt($(this).val() - 1);
        // console.log(typeof _month);
        init(_year, _month);
        $('.clender').show();
    })
    setYear(40);
    setMonth();
})