$(function () {
    let layer = layui.layer;
    $('#btnLogout').on('click',function () {
        layer.confirm('确定退出登录?',{ icon: 3, title: '提示' },
         function(index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'
            // 关闭 confirm 询问框
            layer.close(index)
          })
    })
})
getUserInfo();
//获取用户的基本信息
function  getUserInfo() {
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        //设置请求头信息，获取到的token传递给后台
        headers:{
            Authorization: localStorage.getItem('token') || ''
        },
        success:function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
              }
              // 调用 renderAvatar 渲染用户的头像
              renderAvatar(res.data)
            },
            //不管成功还是失败，都会返回的一个
        complete:function (res) {
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token');
                location.href='/login.html';
                }
            }
    })
};
//渲染用户头像
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username;
    //设置欢迎文本
    $('#welcome').html('欢迎'+name);
    if(user.user_pic !== null) {
        //获取图片路径 并展示出来
        $('.layui-nav-img').prop('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        var first = name[0].toUpperCase();//获取用户名的第一个字变大写
        $('.text-avatar').html(first).show();
        $('.layui-nav-img').hide();
    }
}