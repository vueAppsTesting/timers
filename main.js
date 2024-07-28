const circle = document.querySelector('.progress-ring__circle');
const r = circle.r.baseVal.value;
const circumference = 2 * Math.PI * r;
const input = document.querySelector('.percente');

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  circle.style.strokeDashoffset = offset;
}


const getTimerParameters = function (startDate, endDate) {
    const timeSrart = startDate.getTime();
    const timeEnd = endDate.getTime();
    const allIntetrval = timeEnd - timeSrart;
    const timeNow = new Date().getTime();
    const liveInterval = timeNow - timeSrart;
    const obj = {};
    // вычисляем сколько процентов осталось...
    obj.parcent = (liveInterval / allIntetrval) * 100;
    obj.parcent = obj.parcent.toFixed(5);

    obj.start = startDate.getFullYear() 
        + "." + (startDate.getMonth() + 1) 
        + "." + startDate.getDate() + " " 
        + startDate.getHours() + ":" 
        + startDate.getMinutes() + ":" 
        + startDate.getSeconds();

    obj.end = endDate.getFullYear() 
        + "." + (endDate.getMonth() + 1) 
        + "." + endDate.getDate() + " " 
        + endDate.getHours() + ":" 
        + endDate.getMinutes() + ":" 
        + endDate.getSeconds();

    let msDays = Math.trunc((allIntetrval - liveInterval) / 86400000) * 86400000;
    let msHours = Math.trunc((allIntetrval - liveInterval - msDays) / 3600000) * 3600000;
    let msMinutes = Math.trunc((allIntetrval - liveInterval - msDays - msHours) / 60000) * 60000;
    let msSeconds = Math.trunc((allIntetrval - liveInterval - msDays - msHours - msMinutes) / 1000) * 1000;

    obj.days = msDays / 86400000;
    obj.hours = msHours / 3600000;
    obj.minutes = msMinutes / 60000;
    obj.seconds = msSeconds / 1000;

    return obj;
}

const showProgres = () => {
  const progresTimerParams = getTimerParameters( new Date(2024, 6, 9, 12), new Date(2024, 11, 25, 12) );
  setProgress(progresTimerParams.parcent);
  // Записываем в Dom...
  const textInfo = document.getElementById("textInfo");
  const parcentText = document.getElementById("parcentText");
  textInfo.textContent = `${progresTimerParams.days} дней ${progresTimerParams.hours} часов ${progresTimerParams.minutes} минут ${progresTimerParams.seconds} секунд`;
  parcentText.textContent = `${progresTimerParams.parcent}%`;
}


const begin = () => {
  showProgres();
  setTimeout(begin, 1000);
}
begin();



//slider
const sliderInteralTime = 5000;
let slideNumber = 1;


// скрывает все фото и индикароры слайдов
const hideAllSliders = (size) => {
  for(let i = 1; i <= size; i++) {
    document.getElementsByClassName("img_" + i)[0].style.opacity = 0;
    document.getElementById("s" + i).classList = "";
  }
};

// показывает слайд по номеру
const showSlide = (n) => {
  if(n)
    slideNumber = n;
  // скрываем все слайды
  hideAllSliders(12);
  // показвыаем слайд и индикатор
  document.getElementsByClassName("img_" + slideNumber)[0].style.opacity = 1;
  document.getElementById("s" + slideNumber).classList = "active";
};
// запускаем
showSlide(1);
// цикличное пролистывание
const goSlider = () => {
  return setInterval(() => {
    if(slideNumber < 12)
      slideNumber++;
    else
      slideNumber = 1;
    showSlide();
  }, 5000);
};
var timerSlider = goSlider();

// присваиваим события кнопкам слайдера
const clickChangeSlider = (pref, size) => {
  for(let i = 1; i <= size; i++) {
    let el =  document.getElementById(pref + i);

    el.onclick = () => {
      showSlide(i);
      clearInterval(timerSlider);
      timerSlider = goSlider();
    };
  }
};
clickChangeSlider("s", 12);

