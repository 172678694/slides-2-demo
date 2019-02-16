let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0


makeFakeSlides()
$slides.hide().offset()
$slides.css({transform:'translateX(-400px)'}).show()
bindEvents()
$(next).on('click',function(){
    goToSlide(current+1)
})
$(previous).on('click',function(){
    goToSlide(current-1)
})

let timer=setInterval(function(){
    goToSlide(current+1)
},2000)

$('.container').on('mouseenter',function(){
    window.clearInterval(timer)
}).on('mouseleave',function(){
    timer=setInterval(function(){
        goToSlide(current+1)
    },2000)
})




//工具函数
function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length-1).clone(true)
    
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}

function bindEvents(){
    $('#buttonWrapper').on('click','button',function(e){
        let $button=$(e.currentTarget)
        let index=$button.index()
        goToSlide(index)
    })
}


//重要一步
function goToSlide(index) {
    if(index>$buttons.length-1){
        index=0
    }else if(index<0){
        index=$buttons.length-1
    }
    if(current===$buttons.length-1 && index===0){
        //最后一张到第一张
        console.log(1)
        $slides.css({transform:`translateX(${-(current+2)*400}px)`})
            .one('transitionend',function(){
                $slides.hide().offset()
                $slides.css({transform:`translateX(${-(index+1)*400}px)`})
                .show()
            })
        
    } else if(current===0 && index===$buttons.length-1){
        //第一张到最后一张
        console.log(2)
        $slides.css({transform:'translateX(0px)'})
            .one('transitionend',function(){
                $slides.hide().offset()
                $slides.css({transform:`translateX(${-(index+1)*400}px)`})
                .show()
            })
    }else{
        console.log(3)
        $slides.css({transform:`translateX(${-(index+1)*400}px)`})
    }
    current=index
}




// function bindEvents(){
//     $buttons.eq(0).on('click',function(){
//         if(current===2){
//             $slides.css({transform:'translateX(-1600px)'})
//             .one('transitionend',function(){
//                 $slides.hide().offset()
//                 $slides.css({transform:'translateX(-400px)'})
//                 .show()
//             })
//         }else{
//             $slides.css({transform:'translateX(-400px)'})
//         }
//         current=0
//     })
//     $buttons.eq(1).on('click',function(){
//         $slides.css({transform:'translateX(-800px)'})
//         current=1
//     })
//     $buttons.eq(2).on('click',function(){
//         if(current===0){
//             $slides.css({transform:'translateX(0px)'})
//             .one('transitionend',function(){
//                 $slides.hide().offset()
//                 $slides.css({transform:'translateX(-1200px)'})
//                 .show()
//             })
//         }else{
//         $slides.css({transform:'translateX(-1200px)'})
//         }
//         current=2
//     })

// }
