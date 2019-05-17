require(['require-config'],()=>{
    require(['template','header','footer'],(tem)=>{
        class CartDo{
            constructor(){
               this.container = $("#goodsList");
               this.init();
                              
            }
            init(){
                let cart = localStorage.getItem('cart');
                if(cart){
                    this.cart = JSON.parse(cart);                    
                    this.render(this.cart)
                }else{
                    
                }
                this.delegateEvent();                
            }
            render(cartli){                
                $('#goodsList').html(tem('cart-template',{cartli}));                
            }
            delegateEvent(){
                let _this =this;
                this.container.on('click','.plus',function(){
                    let num= Number($(this).prev().val()),
                        parent = $(this).parentsUntil($('div'),'.goods'),
                        subtotal=parent.find('.subtotal'),
                        money=subtotal.html(),
                        check =parent.find('.ok').attr('data-check'),
                        id=parent.attr('data-id')*1; 
                        num++;                                       
                    $(this).prev().val(num);
                    subtotal.attr('data-money',num*money)
                    if(check==='true'){
                        _this.calcTotal()
                    };
                    _this.changeCart({id,num,check})                    
                })
                this.container.on('click','.minus',function(){
                    let num= Number($(this).next().val()),
                        parent = $(this).parentsUntil($('div'),'.goods'),
                        subtotal=parent.find('.subtotal'),
                        money=subtotal.html(),
                        check =parent.find('.ok').attr('data-check'),
                        id=$(this).parentsUntil($('div'),'.goods').attr('data-id')*1;                     
                    if(--num===0) num=1;
                    $(this).next().val(num);
                    subtotal.attr('data-money',num*money);
                    if(check==='true'){
                        _this.calcTotal()
                    } 
                    _this.changeCart({id,num,check}) 
                })
                this.container.on('click','.ok',function(){
                    let check,id=$(this).parentsUntil($('div'),'.goods').attr('data-id')*1;
                    if($(this).attr('data-check')==='true'){
                        $(this).removeClass("glyphicon glyphicon-ok check");
                        $(this).attr('data-check',false);
                        check ='false'
                    }else{
                        $(this).addClass("glyphicon glyphicon-ok check");
                        $(this).attr('data-check',true);
                        check ='true'
                    }
                    _this.calcTotal();
                    _this.changeCart({id,check})  
                })
                this.container.on('click','.glyphicon-trash',function(){
                    if(confirm('你确定要删除该商品吗')){
                        let id = $(this).parent().parent().attr('data-id');
                        $(this).parent().parent().remove();
                        _this.calcTotal();
                        _this.delGood(id);
                    }                    
                })
                this.calcTotal();                               
            }
            calcTotal(){
                let sum =0,num=0,
                OKs=this.container.find(".ok[data-check='true']");
                $.each($(OKs),function(i,item){
                    sum += $(item).parentsUntil('div','.goods').find('.subtotal').attr('data-money')*1;
                    num += $(item).parentsUntil('div','.goods').find('.numInput').val()*1;                   
                })               
                this.container.find('#total').html(`￥${sum.toFixed(2)}`);
                this.container.find('i').html(`(${num})`);            
            }
            changeCart(arg){                                           
                let i = -1,
                item=null,
                cart=null,
                num = arg.num,                
                check=arg.check==='true'?'true':'false',
                cls=arg.check==='true'?'glyphicon glyphicon-ok check ok':'ok';                
                this.cart.some((item,index)=>{
                    i =index;
                    return item.id===arg.id;
                });                
                item = this.cart[i];
                num = num || item.num;               
                item = {...item,num,check,cls};                
                cart = this.cart;
                cart.splice(i,1,item);                
                localStorage.setItem('cart',JSON.stringify(cart));
            }
            delGood(id){
                let i = -1,cart = this.cart;
                cart.some((item,index)=>{
                    i =index;
                    return item.id===id*1;
                });               
                cart.splice(i,1);
                localStorage.setItem('cart',JSON.stringify(cart)); 
            }
        }
        new CartDo();
    })   
}) 