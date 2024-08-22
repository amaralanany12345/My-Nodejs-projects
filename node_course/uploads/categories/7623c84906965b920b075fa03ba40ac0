let zoomIn= document.querySelector('.zoomIn')
let zoomMiddle= document.querySelector('.zoomMiddle')
let zoomOut= document.querySelector('.zoomOut')
let container= document.querySelector('.container')
let movingSlider= document.querySelector('.movingSlider')
let slider= document.querySelector('.slider')
let point= document.querySelector('.point')
let play= document.querySelector('.play')
let pause= document.querySelector('.pause')
let replay= document.querySelector('.replay')
let images = Array.from(document.getElementsByClassName('images'))
let videoSeconds= document.querySelector('.videoSeconds')
let videoMinutes= document.querySelector('.videoMinutes')
let timerSeconds= document.querySelector('.timerSeconds')
let timerMinutes= document.querySelector('.timerMinutes')
let hover= document.querySelector('.hover')
let hoverTimer= document.querySelector('.hoverTimer')
let hoverMinutes= document.querySelector('.hoverMinutes')
let hoverSeconds= document.querySelector('.hoverSeconds')
let counter=0;
let mood="small";
let allImages=["url('blue.png')","url(react.png)","url(reactNative.png)","url(green.png)","url('messi.png')","url(ronaldo.png)","url(gavi.png)","url(modric.png)","url('blue.png')","url(react.png)","url(reactNative.png)","url(green.png)","url('blue.png')","url(react.png)","url(reactNative.png)","url(green.png)","url(reactNative.png)","url(green.png)","url('messi.png')","url(ronaldo.png)","url(gavi.png)","url(modric.png)","url('blue.png')","url(react.png)","url(reactNative.png)","url(green.png)","url('blue.png')","url(react.png)","url(reactNative.png)","url(green.png)","url(reactNative.png)","url(green.png)","url('messi.png')","url(ronaldo.png)","url(gavi.png)","url(modric.png)","url('blue.png')","url(react.png)","url(reactNative.png)","url(green.png)","url('blue.png')","url(react.png)","url(reactNative.png)","url(green.png)","url(reactNative.png)","url(green.png)","url('messi.png')","url(ronaldo.png)","url(gavi.png)","url(modric.png)","url('blue.png')","url(react.png)","url(reactNative.png)","url(green.png)","url('blue.png')","url(react.png)","url(reactNative.png)","url(green.png)","url(reactNative.png)","url(green.png)","url('messi.png')","url(ronaldo.png)","url(gavi.png)","url(modric.png)","url('blue.png')","url(react.png)","url(reactNative.png)","url(green.png)","url('blue.png')","url(react.png)","url(reactNative.png)","url(green.png)","url(reactNative.png)","url(green.png)","url('messi.png')","url(ronaldo.png)","url(gavi.png)","url(modric.png)","url('blue.png')","url(react.png)","url(reactNative.png)","url(green.png)","url('blue.png')","url(react.png)","url(reactNative.png)","url(green.png)"]
let movingSliderValue=+movingSlider.value
let movingSliderBackgroundSize=+movingSlider.style.backgroundSize
movingSlider.max=allImages.length
let movingSliderMax=+movingSlider.max
let videoMinutesInt=+videoMinutes.innerHTML
let videoSecondsInt=+videoSeconds.innerHTML
let timerMinutesInt=+timerMinutes.innerHTML
let timerSecondsInt=+timerSeconds.innerHTML
let hoverMinutesInt=+hoverMinutes.innerHTML
let hoverSecondsInt=+hoverSeconds.innerHTML

videoSeconds.innerHTML=allImages.length
if (allImages.length/60>=1){
    videoMinutesInt=parseInt(allImages.length/60)
    videoMinutes.innerHTML=videoMinutesInt
    videoSeconds.innerHTML=allImages.length-(videoMinutesInt*60)
}
let sliderValue;
let sliderHoveredValue;

play.onclick=function(){
    startInterval()
}
function startInterval(){
    moodGet()
    randomValue()
    myInterval =setInterval(function(){
        container.style.backgroundImage = allImages[counter];
        movingSliderValue+=(movingSliderMax/(allImages.length))
        movingSlider.value=movingSliderValue+sliderValue
        movingSliderBackgroundSize+=sliderWidth/(movingSliderMax)
        movingSlider.style.backgroundSize =movingSliderBackgroundSize+"px"
        play.style.display='none'
        pause.style.display='block'
        counter++;
        if(timerMinutes.innerHTML===videoMinutes.innerHTML&&timerSeconds.innerHTML===videoSeconds.innerHTML){
            play.style.display='none'
            pause.style.display='none'
            replay.style.display='block'
            clearInterval(myInterval)
            counter=0;
        }
        else if (counter%60!=0){
           timerSeconds.innerHTML=counter%60
        }
        else if(counter%60===0){
            timerSeconds.innerHTML=0
            timerMinutesInt+=1
            timerMinutes.innerHTML=timerMinutesInt
            counter=0
        }
    },1000)
}
pause.onclick=function(){
    play.style.display='block'
    pause.style.display='none'
    clearInterval(myInterval)
}

replay.onclick=function(){
    play.style.display='none'
    pause.style.display='block'
    replay.style.display='none'
    movingSliderValue=0
    movingSliderBackgroundSize=0
    timerSeconds.innerHTML=0
    timerMinutes.innerHTML=0
    timerMinutesInt=0
    myInterval =setInterval(function(){
        container.style.backgroundImage = allImages[counter];
        movingSliderBackgroundSize+=sliderWidth/(movingSliderMax)
        movingSlider.style.backgroundSize =movingSliderBackgroundSize+"px"
        counter++;
        timerSeconds.innerHTML=counter
        if(counter%60===0){
            timerSeconds.innerHTML=0
            timerMinutesInt+=1
            timerMinutes.innerHTML=timerMinutesInt
            counter=0
        }
        movingSliderValue+=movingSliderMax/(allImages.length)
        movingSlider.value=movingSliderValue
        play.style.display='none'
        pause.style.display='block'
        if(timerMinutes.innerHTML===videoMinutes.innerHTML&&timerSeconds.innerHTML===videoSeconds.innerHTML){
            play.style.display='none'
            pause.style.display='none'
            replay.style.display='block'
            clearInterval(myInterval)
            counter=0;
        }
    },1000)
}

function randomValue (){
    counter=+movingSlider.value
    container.style.backgroundImage = allImages[+movingSlider.value]
    timerSeconds.innerHTML=counter
    timerMinutes.innerHTML=0
    if (counter/60>=1){
        timerMinutesInt=parseInt(counter/60)
        timerMinutes.innerHTML=timerMinutesInt
        timerSeconds.innerHTML=counter-(timerMinutesInt*60)
    }
    sliderValue =+movingSlider.value
    movingSliderBackgroundSize=(sliderValue/movingSliderMax)*sliderWidth
    movingSlider.style.backgroundSize =movingSliderBackgroundSize+"px"
    return sliderValue
}

movingSlider.onclick=function(){
    randomValue()
}

let valueHover = 0;
function calcSliderPos(e) {
    sliderHoveredValue =(e.offsetX / e.target.clientWidth) *  parseInt(e.target.getAttribute('max'),10);
    return (e.offsetX / e.target.clientWidth) *  parseInt(e.target.getAttribute('max'),10);
}

movingSlider.addEventListener('mousemove', function(e) {
    moodGet()
    valueHover = calcSliderPos(e).toFixed(2);
    hoverSeconds.innerHTML=parseInt(sliderHoveredValue)
    hoverMinutes.innerHTML=0
    if (parseInt(sliderHoveredValue/60)>=1){
        hoverMinutesInt=parseInt(sliderHoveredValue/60)
        hoverMinutes.innerHTML=hoverMinutesInt
        hoverSeconds.innerHTML=parseInt(sliderHoveredValue)-(hoverMinutesInt*60)
    }
    hover.style.backgroundImage = allImages[parseInt(sliderHoveredValue)]
    hover.style.left= (+sliderHoveredValue/movingSliderMax)*sliderWidth +"px"
    hoverTimer.style.display='flex'
    hoverTimer.style.left=(+sliderHoveredValue/movingSliderMax)*sliderWidth +60 +"px"
    
});
function clearMouseMoveEvent(){
    hoverTimer.style.display='none'
    hover.style.backgroundImage='none'

}

zoomIn.onclick=function(){
    container.style.width="1400px"
    container.style.height="700px"
    mood="big"
    moodGet()
}

zoomMiddle.onclick=function(){
    container.style.width="1000px"
    container.style.height="600px"
    mood="middle"
    moodGet()
}

zoomOut.onclick=function(){
    container.style.width="800px"
    container.style.height="500px"
    mood="small"
    moodGet()
}
function moodGet(){
    if(mood==="big"){
        sliderWidth=1384
        slider.style.width=sliderWidth+"px"
    }
    else if( mood==="middle"){
        sliderWidth=984
        slider.style.width=sliderWidth+"px"
    }
    else{
        sliderWidth=784
        slider.style.width=sliderWidth+"px"
    }
    return sliderWidth;
}

