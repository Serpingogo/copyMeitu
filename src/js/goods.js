require(['require-config'],()=>{
    require(['template','url','header','footer'],(template,url)=>{
        class GoodsLoad{
            constructor(){
                this.init();
            }
            init(){
                $.ajax({
                    "type": "get",
                    "url": url.baseUrl+'goods/list',
                    "success": data=>{
                        if(data.res_code===1){
                            this.render(data.res_body.good)
                        }
                    },
                    "data-type": 'json'
                })
            }
            render(good){                             
                $("#goodsContainer").html(template('goodcontainer-template',{good}));
            }
        }
        new GoodsLoad();
    })
})