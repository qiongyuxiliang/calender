var data = [{'yuandan':'元旦'},{'aier':'爱耳日'},{'zhiyuan':'志愿者服务日'},{'funv':'妇女节'},{'muqinhe':'保护母亲河日'},{'zhishujie':'植树节'},{'wuyi':'五一劳动节'},{'wusi':'中国青年节'},{'liuyi':'六一儿童节'},{'qiyi':'中国共产党诞生日'},{'qiqi':'抗日战争纪念日'},{'bayi':'建军节'},{'jiushi':'教师节'},{'shiyi':'国庆节'},{'shiersi':'法制宣传'}];
var traditional = [{'chunjie':'春节'},{'yuanxiao':'正月十五元宵节'},{'duanwu':'端午节'},{'qixi':'七夕'},{'zhongqiu':'中秋节'},{'chongyang':'重阳节'},{'laba':'腊八节'},{'saofang':'扫房日'}];
// 1春分月圆后的第一个星期日复活节(Easter Monday)(有可能是3月22-4月25日间的任一天) 
// 5月第二个星期日母亲节(Mother's Day) 
// 5月第三个星期日全国助残日 
// 6月第三个星期日父亲节(Father's Day) 
// 9月第三个星期六全国国防教育日
var other = [{'fuhuo':'复活节'},{'muqinjie':'母亲节'},{'zhucanri':'助残日'},{'fuqinjie':'父亲节'},{'jiaoyu':'全国教育日'}];
// 先找第一个星期日，然后加上7天，就是母亲节。第一个星期日（0）；
// 先取得该月的第一天是周几，（1——6）0是周日，1+6