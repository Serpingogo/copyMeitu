require.config({
    baseUrl:"/",
    paths:{
        "jquery": "libs/jquery/jQuery v3.4.0",
        "header": "js/module/header",
        "footer": "js/module/footer",
        "bootstrap" : "libs/bootstrap/js/bootstrap.min",
        "template" : "libs/art-template/template-web",
        "cookie":"libs/jquery-plugins/jquery.cookie",
        "url":"js/module/baseUrl",
        "swiper":"libs/swiper/js/swiper.min"          
    },
    shim:{
        "bootstrap":{
            deps:['jquery'],
        },
        "cookie":{
            deps:['jquery'],
        }
    }
})