$(function(){
    $('#link_reg').on('click',function(){
        $('.reg-box').show();//注册盒子显示
        $('.login-box').hide();//登录盒子隐藏
    });
    $('#link_login').on('click',function(){
        $('.reg-box').hide();//注册盒子隐藏
        $('.login-box').show();//登录盒子显示
    });
    /* 从layui获取form对象 */
    let form = layui.form;//let {form} = layui;对象解构
    // let {form,layer} = layui;
    let layer = layui.layer;
    //通过form.verify()函数自定义
    form.verify({
        //自定义验证名称
        pwd:[/^[\S]{6,12}$/,'密码必须是6到12位且不能出现空格'],
        repwd:(value)=>{
            //拿到密码框中输入的值
            var pwd = $('.reg-box [name=password]').val();
            //判断
            if(pwd !== value) {
                return '密码输入不一致';
            }
        }
    });
    // $('#reg').on('click', () => {
    //     console.log(33);
    // })
    //===========================================
    /* 监听注册表单提交的事件 */
    $('#form-reg').on('submit',function(e){
        e.preventDefault();
        //发起ajax post请求
        // console.log(123);
        var data ={
            username:$('#form-reg [name=username]').val(),
            password:$('#form-reg [name=password]').val()
        }
        $.post('/api/reguser',data,
                function(res){
                    if(res.status !==0){
                         return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    // console.log(res);
                    $('#link_login').click();
        })
    });
    $('#form-login').on('submit',function(e) {
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),//直接获取表单中的数据
            success:res => {
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                localStorage.setItem('token',res.token);//地址存入本地
                location.href = '/index.html';//登录成功页面跳转
            }
        })
    });
})