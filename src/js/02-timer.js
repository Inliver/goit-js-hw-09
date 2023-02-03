import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "notiflix/dist/notiflix-3.2.6.min.css";




const refs = {
    inputDataEl: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    timerEl: document.querySelector('.timer'),
    fieldEl: document.querySelector('.field'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
}

 refs.btnStart.addEventListener('click', onBtnStartClick)
 refs.inputDataEl.addEventListener('input', onDataSet)

refs.btnStart.disabled = true;
let selectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      selectedDates[0] <= options.defaultDate
          ? Notiflix.Notify.failure('Please choose a date in the future')
          : refs.btnStart.disabled = false;
    ;
  },
};

const calendar = flatpickr('#datetime-picker', options);


function onDataSet(e) {
    selectedDate = new Date(e.currentTarget.value);
}

function onBtnStartClick() {
    const intervalId = setInterval(() => {
        refs.btnStart.disabled = true;
        const diff = selectedDate - Date.now();
        if (diff > 0) {
            convertMs(diff);
        } else {
            clearInterval(intervalId)
             Notiflix.Notify.success('Your time is gone')
        }
    }, 1000)   
};  


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    
    refs.daysEl.textContent = days;
    refs.hoursEl.textContent = hours;
    refs.minutesEl.textContent = minutes;
    refs.secondsEl.textContent = seconds;
//   return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

