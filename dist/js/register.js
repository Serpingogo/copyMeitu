"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,s){return t&&_defineProperties(e.prototype,t),s&&_defineProperties(e,s),e}require(["require-config"],function(){require(["jquery","url"],function(s,n){new(function(){function e(){_classCallCheck(this,e),this.areaCode=s("#areaCode"),this.pwd=s("#pwd"),this.eye=s("#eye"),this.rBtn=s("#getCode"),this.username=s("#phoneNum"),this.bindEvt()}return _createClass(e,[{key:"bindEvt",value:function(){var e=this;this.rBtn.on("click",function(){e.getData()}),this.eye.on("click",function(){e.changeEye()})}},{key:"getData",value:function(){var e=Number(this.username.val()),t=this.pwd.val();/^(138)|(184)|(136)|(177)|(156)\d{8}$/.test(e)&&/^\w{6,16}$/i.test(t)?(e=this.areaCode.html().slice(1)+e,s.ajax({type:"post",url:n.phpUrl+"register.php",data:{userName:e,pwd:t},success:function(e){1===e.res_code?(alert(e.res_message+"即将跳转至登录页页面"),location.href="/html/login.html"):alert(e.res_message)},dataType:"json"})):alert("电话号码或密码格式不正确，请检查")}},{key:"changeEye",value:function(){"password"===this.pwd.prop("type")?(this.pwd.prop("type","text"),this.eye.removeClass("glyphicon-eye-close").addClass("glyphicon-eye-open")):(this.pwd.prop("type","password"),this.eye.removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close"))}}]),e}())})});