require(["require-config"],()=>{
    require(["template","url","swiper","header","footer"],(template,url,swiper)=>{
        class Index{
            constructor(){
                this.getPromo();
                this.swiper();
            }
            bindEvt(){
                
            }
            //请求数据
            getPromo(){
                $.get(url.baseUrl+'index/type',data=>{                    
                    if(data.res_code===1){                        
                        this.renderPromo(data.res_body.list)
                    }                    
                })
            }
            renderPromo(list){
                let html=template('promo-sc',{list});
                $("#promo").html(html);
            }
            swiper(){
                new swiper('#bannerImg',{
                    loop: true,
                    speed:600,
                    grabCursor : true,
                    parallax:true,
                    autoplay:{
                    delay: 3000,
                    //loop无效  stopOnLastSlide: true,
                    },	
                    pagination: {
                        el:'#bannerpagination',
                        clickable :true,
                    },
                    navigation: {
                        nextEl: '.arrow-right',
                        prevEl: '.arrow-left',
                    },
                })
            }
        }
        new Index();
    })
})
