require(['require-config'],()=>{
    require(['jquery',"url"],($,url)=>{
        class Register{
            constructor(){
                this.areaCode = $("#areaCode");
                this.pwd = $("#pwd");
                this.eye = $("#eye");
                this.rBtn =$("#getCode");
                this.username = $("#phoneNum");
                this.bindEvt();
            }            
            bindEvt(){
                this.rBtn.on('click',()=>{
                    this.getData();
                });
                this.eye.on('click',()=>{
                    this.changeEye();
                })
            }
            getData(){
                let userName = Number(this.username.val()),
                    pwd =this.pwd.val(),
                    regPhone = /^(138)|(184)|(136)|(177)|(156)\d{8}$/,
                    regPwd =/^\w{6,16}$/i;
                if(regPhone.test(userName)&&regPwd.test(pwd)){
                    userName = this.areaCode.html().slice(1)+userName;
                    $.ajax({
                        'type':'post',
                        'url': url.phpUrl+"register.php",
                        'data':{userName,pwd},
                        'success': data =>{
                            if(data.res_code===1){
                                alert(data.res_message+"即将跳转至登录页页面");
                                location.href = "/html/login.html"
                            }else{
                                alert(data.res_message)
                            }
                        },
                        'dataType':"json"
                    })
                }else{
                    alert("电话号码或密码格式不正确，请检查")
                }                
            }
            changeEye(){
                if(this.pwd.prop('type')==="password"){
                    this.pwd.prop("type","text");
                    this.eye.removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
                }else{
                    this.pwd.prop("type","password");
                    this.eye.removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
                }
            }      
        }
        new Register();
    })
    
})