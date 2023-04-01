const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('.start-button');
const timerEl = document.querySelector('span');
const resetButton = document.querySelector('.reset-button')

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    if (Number.isInteger(parseInt(timerEl.innerHTML))) return

    const endTime = Date.now() + seconds * 1000 + 1000

    const timer = () => {
      const sec = Math.floor((endTime - Date.now()) / 1000)
      
      const h = addZero(Math.floor(sec / 3600))
      const m = addZero(Math.floor(sec % 3600 / 60))
      const s = addZero(Math.floor(sec % 3600 % 60))
  
      function addZero(num) {
        if (!num) return '00'
        if (num < 10 && num !== 0) return ('0' + num)
        return '' + num
      }
  
      timerEl.innerHTML = `${h}:${m}:${s}`
    }
    setTimeout(timer)

    const timerId = setInterval(() => {      
      if ((endTime - Date.now()) < 0) {
        clearInterval(timerId)
        timerEl.innerHTML = 'hh:mm:ss'
        return
      }
      timer()
    }, 100)

    const resetClickHandler = () => {
      clearInterval(timerId)
      timerEl.innerHTML = 'hh:mm:ss'
      resetButton.removeEventListener('click', resetClickHandler)
    }

    resetButton.addEventListener('click', resetClickHandler)
  }
}

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа

  // Исключить символы кроме цифр
  const notNumbers = /[^\d]/g;
  // Исключить нули перед числом
  const leadZero = /^0+/;

  inputEl.value = e.target.value.replace(notNumbers, '').replace(leadZero, '')
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});