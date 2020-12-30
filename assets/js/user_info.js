$(function () {
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if(value.length > 6){
                return '昵称必须是 1~6位';
            }
        },
    });
    initUserInfo();
  function initUserInfo() {
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res) {
            if(res.status !== 0){
                return layer.msg('获取用户信息失败!');
            }
        //    console.log(res);
           //第一个参数是给哪一个表单赋值，第二个参数是填充的数据
           form.val('formUserInfo',res.data);
        }
    })
  }
  $('#btnReset').on('click',function(e){
    //阻止重置的默认事件
    e.preventDefault();
    initUserInfo();
  });
  //
  $('.layui-form').on('submit',function(e){
    e.preventDefault();
    $.ajax({
        method:'POST',
        url:'/my/userinfo',
        //快速获取表单信息上传到接口中
        data:$(this).serialize(),
        success:function(res) {
            if(res.status !== 0) {
                return layer.msg('更新用户信息失败!');
            }
            layer.msg('更新用户信息成功');
            //调用父页面中的渲染用户信息的函数
            window.parent.getUserInfo();
        }
    })
  })
})