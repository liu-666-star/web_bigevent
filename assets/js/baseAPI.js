/* 
    在$.post()或$.get时会调用ajaxPrefilter这个函数
 */
$.ajaxPrefilter(function(options){
    options.url='http://ajax.frontend.itheima.net'+options.url;
    // console.log(options.url);
})