define(['jquery','bootstrap'], function($) {    
    function Header(){
        this.container = $("#header-container");      
        this.loadHtml();
    }
    $.extend(Header.prototype,{
        loadHtml(){
            return new Promise(resolve=>{
                this.container.load("/html/module/header.html",()=>{
                    resolve()}
                )
            })
        }, 
        search(){
            $('#searchInput').on('keyup',function(){
                
            })
        } 
    })
    return new Header();
});
