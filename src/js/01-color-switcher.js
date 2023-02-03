
const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
}


refs.btnStart.addEventListener('click', onBtnStartClick);
refs.btnStop.addEventListener('click', onBtnStopClick);

refs.btnStop.disabled = true;

function onBtnStartClick(){
    const intervalID = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
}



function onBtnStopClick() {
    clearInterval(intervalID);
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
}



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}