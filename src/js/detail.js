require(["require-config"],()=>{
    require(['url','template','header','footer'],(url,template)=>{
        class DetailShow{
            constructor(){
                this.ajx().then(()=>{
                        this.init();                          
                    }                                  
                );
            }
            ajx(){
                return new Promise((resolve)=>{
                    let id = Number(location.search.slice(4));                
                    $.ajax({
                        "url": url.baseUrl + "detail/get",
                        "type": "get",
                        "data": {id},
                        "success": data =>{
                            this.render(data.res_body.detailgoods,id);
                            resolve();
                        },
                        "data-type": "json"
                    })                
                })     
            }
            render(good,id){
                good = good.filter(item=>item.id ===id)[0];
                let images = good.images;
                this.good = good;
                $("#detailContainer").html(template('detail-template',{good,images}));                             
            }
            init(){
                this.plus = $("#plus");
                this.minus = $('#minus');
                this.numInput = $('#num');                
                this.purchaseNow = $('#purchaseNow');
                this.addShopBag = $('#addShopBag');
                this.num = Number(this.numInput.val());
                this.money = Number($('#subtotal').html()); 
                this.bindEvents();                            
            }
            bindEvents(){                
                this.plus.on('click',()=>{                    
                    this.numInput.val(++this.num); 
                    $('#subtotal').html(this.num*this.money);                    
                });
                this.minus.on('click',()=>{
                    if(--this.num===0){
                        this.num =1;
                    }
                    this.numInput.val(this.num);                    
                    $('#subtotal').html((this.num*this.money).toFixed(2)); 
                });
                this.numInput.on('keyup',()=>{
                    let muchmoney = null;
                    this.num = Number(this.numInput.val()); 
                    muchmoney =  this.num*this.money;                                    
                    $('#subtotal').html(muchmoney.toFixed(2));
                }); 
                this.addShopBag.on('click',()=>{
                    this.addCart();
                })                                            
            }
            addCart(){
                let cart = localStorage.getItem('cart'),num =this.num,check="true",cls = "glyphicon glyphicon-ok check ok";
                if(cart){                             
                    cart = JSON.parse(cart);
                    let i =-1,id=this.addShopBag.attr('data-id');
                    if(cart.some((item,index)=>{
                        i = index;
                        return item.id=== Number(id);
                    })){
                        num+=cart[i].num;  
                        cart.splice(i,1);                        
                    } 
                    cart.unshift({...this.good,num,check,cls});                                
                }else{
                                      
                    cart = [{...this.good,num,check,cls}];
                }
                localStorage.setItem("cart",JSON.stringify(cart));
            }
        }
        new DetailShow();
    })
})