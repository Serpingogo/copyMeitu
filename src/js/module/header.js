define(['jquery','cookie','bootstrap'], function($) {    
    function Header(){
        this.container = $("#header-container");      
        this.loadHtml().then(()=>{
            this.getUsername();
            $('#quit').on('click',()=>{
                this.quit()
            })
        });
    }
    $.extend(Header.prototype,{
        loadHtml(){
            return new Promise(resolve=>{
                this.container.load("/html/module/header.html",()=>{
                        resolve()
                    }
                )
            })
        },        
        search(){
            $('#searchInput').on('keyup',function(){
                
            })
        },
        getUsername(){ 
                                
            if($.cookie("user")){              
                $('#login').show();
                $('#username').html($.cookie("user"));
                $('#unlogin').hide();
            }
        },
        quit(){
            $.removeCookie('user',{"path":"/"});
            $('#unlogin').show();
            $('#login').hide();
        }
        
    })
    return new Header();
});
decodeURIComponent