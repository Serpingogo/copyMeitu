define(['jquery'],function($){
    function Footer(){
        this.container = $("#footer-container");
        this.loadHtml()
    }
    $.extend(Footer.prototype,{
        loadHtml(){
            this.container.load("/html/module/footer.html");
        }
    })
    return new Footer();
});