const buttonContainer = document.querySelector('.button-container')
const containerTimer = document.querySelector('.container-timer')
const watch = document.getElementById('watch-study')
const clockContainer = document.querySelector('.clock')
const inputFormSettingsStudy = document.getElementsByTagName('input')[0]
const inputFormSettingsBreak = document.getElementsByTagName('input')[1]
const form = document.getElementById('form')

let minutesStudy
let segundsStudy = 0
let minutesBreak
let segundsBreak = 0
let stopedStartWatchStudy = 0
let stopedStartWatchBreak = 0

function clallNotify() {

  const bell = {
    bell: 'images/bell-notification.svg',
    song: 'sound/Bell-notification.mp3'
  }
  
  new Notification({ icon: bell.bell })
  new Audio(bell.song).play()
}

function isInputEqualOne() {
  const watchMode = document.getElementById('watch-mode')

  if(runWatchStudy && segundsStudy !== null) {
    return watchMode.innerText = `${inputFormSettingsStudy.value} minute studying.`
  }

  if(runWatchBreak && minutesBreak !== undefined) {
    return watchMode.innerText = `${inputFormSettingsBreak.value} minute breaking.`
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  if(inputFormSettingsStudy.value === '' || inputFormSettingsBreak.value === '') {
    Toastify({
      text: "Please, inform a number on fields. The fields are empties.",
      className: "info-toastfy",
      duration: 5000,
      position: "center"
    }).showToast();
  }else{

    minutesStudy = inputFormSettingsStudy.value
    minutesBreak = inputFormSettingsBreak.value


    const watchMode = document.getElementById('watch-mode')
    
    isInputEqualOne()
    
    if(inputFormSettingsStudy.value !== '1') {
      watchMode.innerText = `${inputFormSettingsStudy.value} minutes studying.`
    }

    watch.innerText = `${minutesStudy < 10 ? `0${minutesStudy}`: minutesStudy} : ${segundsStudy < 10 ? `0${segundsStudy}`: segundsStudy}`

  }
})

function isMinutesBreakAndrunningWatchBreak() {
  const pauseButton = document.getElementById('pause-watch-study-btn')
  const playButton = document.getElementById('start-watch-study-btn')
  const watchModeScreen = document.getElementById('watch-mode')
  
  if(inputFormSettingsBreak.value === '' && runWatchBreak && minutesBreak === undefined) {
    
    watchModeScreen.innerText = `Please, configure the pomodore timer!`
  
    clearInterval(stopedStartWatchBreak)

    playButton.style.display = 'flex'
    pauseButton.style.display = 'none'
  }
  
}

function listenerOnClickButtonPlay() {
  
  stopedStartWatchStudy = setInterval(runWatchStudy, 1000)

  const pauseButton = document.getElementById('pause-watch-study-btn')
  const playButton = document.getElementById('start-watch-study-btn')
  const watchModeScreen = document.getElementById('watch-mode')

  pauseButton.style.display = 'flex'
  playButton.style.display = 'none'

  if(inputFormSettingsStudy.value === '' && runWatchStudy || minutesStudy === undefined) {
    watchModeScreen.innerText = `Please, configure the pomodore timer!`

    clearInterval(stopedStartWatchStudy)
    
    playButton.style.display = 'flex'
    pauseButton.style.display = 'none'
  }

  if(minutesStudy === null && segundsStudy === null && runWatchStudy) {
    clearInterval(stopedStartWatchStudy)
    stopedStartWatchBreak = setInterval(runWatchBreak, 1000)

    if(minutesBreak === undefined) {
      watchModeScreen.innerText = `Please, configure the pomodore timer!`
      
      clearInterval(stopedStartWatchBreak)
    }
  }

  if(minutesStudy === 0 && segundsStudy === 0) {
    
    if(minutesBreak === inputFormSettingsBreak.value) {

      segundsBreak = 1
      
      stopedStartWatchBreak = setInterval(runWatchBreak, 1000)
      
      pauseButton.style.display = 'flex'
  
      playButton.style.display = 'none'
      
    }
  }
  
  isMinutesBreakAndrunningWatchBreak()
}

function listenerOnClickButtonPause() {
  
  const pauseButton = document.getElementById('pause-watch-study-btn')
  const playButton = document.getElementById('start-watch-study-btn')
  
  const watchMode = document.getElementById('watch-mode').innerText
  const watchModeSplit = watchMode.split(' ', 3)
  
  if(watchModeSplit[2] === 'studying.') {
    Toastify({
      text: `You stoped the mode studying.`,
      duration: 3000,
      position: 'center',
      style: {
        background: '#de3c4b',
        borderRadius: '12px'
      },
    }).showToast()

    clearInterval(stopedStartWatchStudy)
    playButton.style.display = 'flex' 

    pauseButton.style.display = 'none'
  
  }

  if(watchModeSplit[2] === 'breaking.') {

    Toastify({
      text: `You stoped the mode breaking.`,
      duration: 3000,
      position: 'center',
      style: {
        background: '#de3c4b',
        borderRadius: '12px'
      },
    }).showToast()
    
    clearInterval(stopedStartWatchBreak)
    playButton.style.display = 'flex'

    pauseButton.style.display = 'none'
  }
}

function listenerOnClickButtonReload() {
  
  const watchModeScreen = document.getElementById('watch-mode')
  
  minutesStudy = inputFormSettingsStudy.value
  segundsStudy = 1
  minutesBreak = inputFormSettingsBreak.value
  segundsBreak = 1
  
  if(runWatchStudy && inputFormSettingsStudy.value === '') {
    Toastify({
      text: `Invalid operation.`,
      duration: 2000,
      position: 'center',
      style: {
        background: '#de3c4b',
        borderRadius: '12px'
      },
    }).showToast()
    
    watchModeScreen.innerText = `You need configure before use it!`
  }
  
  if(inputFormSettingsStudy.value !== '' && inputFormSettingsBreak.value !== '') {
    segundsStudy = 2
    segundsBreak = 2
  }
  
  if(segundsStudy === 0) {
    minutesStudy --
    segundsStudy = 60
  }
  
  segundsStudy --
  
  if(segundsBreak === 0) {
    minutesBreak --
    segundsBreak = 60
  }
  
  segundsBreak --
  
}

function listenerOnClickButtonSettings() {
  startModal('modal-settings')
}

function listenerOnClickButtonInfo() {
  document.querySelector('.anchor-info')
}

function createHTMLElementsAndStartWatch() {
  
  const createImgTagPlay = document.createElement('img')  
  createImgTagPlay.setAttribute('class', 'image-btn')
  createImgTagPlay.setAttribute('src', 'images/play.svg')
  createImgTagPlay.setAttribute('alt', 'play')
  
  const createImgTagReload = document.createElement('img')
  createImgTagReload.setAttribute('class', 'image-btn')
  createImgTagReload.setAttribute('src', 'images/reload.svg')
  createImgTagReload.setAttribute('alt', 'reload')
  
  const createButtonPlay = document.createElement('button')
  createButtonPlay.setAttribute('id', 'start-watch-study-btn')
  createButtonPlay.setAttribute('class', 'timer-btn')
  createButtonPlay.setAttribute('type', 'button')
  createButtonPlay.setAttribute('title', 'Play')
  createButtonPlay.appendChild(createImgTagPlay)
  
  const createImgTagPause = document.createElement('img')
  createImgTagPause.setAttribute('class', 'image-btn')
  createImgTagPause.setAttribute('src', 'images/pause.svg')
  createImgTagPause.setAttribute('alt', 'Pause')
  
  const createButtonPause = document.createElement('button')
  createButtonPause.setAttribute('id', 'pause-watch-study-btn')
  createButtonPause.setAttribute('class', 'timer-btn')
  createButtonPause.setAttribute('type', 'button')
  createButtonPause.setAttribute('title', 'Pause')
  createButtonPause.setAttribute('style', 'display: none')
  createButtonPause.appendChild(createImgTagPause)
  
  const createSpanTagClock = document.createElement('span') 
  createSpanTagClock.setAttribute('id', 'watch-mode')
  
  createButtonPlay.addEventListener('click', listenerOnClickButtonPlay)
  
  createButtonPause.addEventListener('click', listenerOnClickButtonPause)
  
  const createButtonReload = document.createElement('button')
  createButtonReload.setAttribute('id', 'reload-btn')
  createButtonReload.setAttribute('class', 'timer-btn')
  createButtonReload.setAttribute('type', 'button')
  createButtonReload.setAttribute('title', 'Reload')
  createButtonReload.appendChild(createImgTagReload)
  
  createButtonReload.addEventListener('click', listenerOnClickButtonReload)
  
  const createImgTagSettings = document.createElement('img')
  createImgTagSettings.setAttribute('class', 'image-btn')
  createImgTagSettings.setAttribute('src', 'images/settings-icon.svg')
  createImgTagSettings.setAttribute('alt', 'settins')
  
  const createButtonSettings = document.createElement('button')
  createButtonSettings.setAttribute('id', 'settins-btn')
  createButtonSettings.setAttribute('class', 'timer-btn settings-popup-btn')
  createButtonSettings.setAttribute('type', 'button')
  createButtonSettings.setAttribute('title', 'settins')
  createButtonSettings.appendChild(createImgTagSettings)
  
  createButtonSettings.addEventListener('click', listenerOnClickButtonSettings)
  
  const createImgTagInfo = document.createElement('img')
  createImgTagInfo.setAttribute('class', 'image-btn')
  createImgTagInfo.setAttribute('src', 'images/info-icon.svg')
  createImgTagInfo.setAttribute('alt', 'info')
  
  const createButtonInfo = document.createElement('button')
  createButtonInfo.setAttribute('id', 'info-btn')
  createButtonInfo.setAttribute('class', 'timer-btn info-popup-btn')
  createButtonInfo.setAttribute('type', 'button')
  createButtonInfo.setAttribute('title', 'info')
  
  const createAnchorTag = document.createElement('a') 
  createAnchorTag.setAttribute('class', 'anchor-info')
  createAnchorTag.setAttribute('target', '__blank')
  createAnchorTag.setAttribute('href', 'https://todoist.com/productivity-methods/pomodoro-technique')
  createAnchorTag.appendChild(createImgTagInfo)
  
  createButtonInfo.addEventListener('click', listenerOnClickButtonInfo)
  
  const createContainerSettingsAndInfo = document.createElement('div') 
  createContainerSettingsAndInfo.setAttribute('class', 'container-settings-info')
  
  createButtonInfo.appendChild(createAnchorTag)
  
  createContainerSettingsAndInfo.appendChild(createButtonSettings)
  createContainerSettingsAndInfo.appendChild(createButtonInfo)
  
  clockContainer.appendChild(createSpanTagClock)

  containerTimer.appendChild(createContainerSettingsAndInfo)
  
  buttonContainer.appendChild(createButtonPause)
  
  buttonContainer.appendChild(createButtonPlay)
  
  buttonContainer.appendChild(createButtonReload)
}

createHTMLElementsAndStartWatch()

function runWatchBreak() {
  
  clearInterval(stopedStartWatchStudy)

  minutesStudy = null
  segundsStudy = null

  isInputEqualOne()

  const pauseButton = document.getElementById('pause-watch-study-btn')
  const playButton = document.getElementById('start-watch-study-btn')
  const watchMode = document.getElementById('watch-mode')
  
  if(inputFormSettingsBreak.value !== '1') {
    watchMode.innerText = `${inputFormSettingsBreak.value} minutes breaking.`
  }
  
  if(segundsBreak === 0) {
    minutesBreak --
    segundsBreak = 60
  }
  
  if(segundsBreak === 1 && minutesBreak === 0) {
    clearInterval(stopedStartWatchBreak)
  }
  
  segundsBreak --
  
  if(segundsBreak === 0 && minutesBreak === 0) {
    minutesBreak = undefined
    clearInputs()
    clallNotify()
    watchMode.innerText = `Finish.`
    playButton.style.display = 'flex'
    pauseButton.style.display = 'none'
  }
    
  watch.innerText = `${minutesBreak === undefined ? '00 : 00' : 
                    `${minutesBreak < 10 ? `0${minutesBreak}`: 
                      minutesBreak} : ${segundsBreak < 10 ? `0${segundsBreak}` : segundsBreak}`}` 
}

function runWatchStudy() {

  const watchMode = document.getElementById('watch-mode')
  
  const startWatchStudyBtn = document.getElementById('start-watch-study-btn')
  const pauseWatchStudyBtn = document.getElementById('pause-watch-study-btn')

  const isMinutesAndSegundsEqualZero = minutesStudy === 0 && segundsStudy === 1

  if(segundsStudy === 0) {
    minutesStudy --
    segundsStudy = 60
  }
  
  switch(isMinutesAndSegundsEqualZero) {
    case true:
      watchMode.innerText = `Click on play button to start 
      the mode breaking.
      `
      clearInterval(stopedStartWatchStudy)
    break
    
    case false:
    isInputEqualOne()
    if(inputFormSettingsStudy.value !== '1') {
      watchMode.innerText = `${inputFormSettingsStudy.value} minutes studying.`
    }
    break
  }
      
  segundsStudy --
    
  if(segundsStudy === 0 && minutesStudy === 0) {
    clallNotify()
    startWatchStudyBtn.style.display = 'flex'
    pauseWatchStudyBtn.style.display = 'none'
  }
  
  watch.innerText = `${minutesStudy < 10 ? `0${minutesStudy}` : minutesStudy} : ${segundsStudy < 10 ? `0${segundsStudy}`: segundsStudy}`
}

function startModal(modalID) {
  const modal = document.getElementById(modalID)
  modal.classList.add('show-modal')
  
  modal.addEventListener('click', (event) => {
    
  const isOpenModal = event.target.id === modalID || 
  event.target.className === 'close-button' 

  if(isOpenModal) {
    modal.classList.remove('show-modal')
  }
  
  const isSaveButton = event.target.id === 'save-button'
  const isInputsEmpties = inputFormSettingsStudy.value === '' || inputFormSettingsBreak.value === ''

  if(minutesStudy === -1 && !isSaveButton) {
    minutesStudy = 1
  }
  
  if(!isSaveButton && isOpenModal) {

    if(inputFormSettingsStudy.value === '' || inputFormSettingsBreak.value === '') {
      inputFormSettingsBreak.value = '1'
      inputFormSettingsStudy.value = '1'
      minutesStudy = inputFormSettingsStudy.value
      minutesBreak = inputFormSettingsBreak.value
      
      Toastify({
        text: `Invalid value.`,
        className: "info-toastfy",
        duration: 2000,
        position: "center", 
      }).showToast();

      return
    }
  }
  
  if(isSaveButton) {
    if(isInputsEmpties) {
      modal.classList.add('show-modal')
    }
    
    if(!isInputsEmpties) {
      modal.classList.remove('show-modal')
    }
  }
  
})
  
  modal.addEventListener('keydown', (event) => {
    
    if(event.key.toLowerCase() === 'e' || event.code === 'Period' || event.key === '+' || event.key === '-') {
      
        clearInputs()
        
        Toastify({
          text: "Please, type a number on fields. Fields empties.",
          offset: {
            x: 50, 
            y: 10
          },
        }).showToast();   
      }
    })

  modal.addEventListener('input', inputsValidations)
}

function inputsValidations(event) {
  let inputsValues = event.target.value
  const numBlockes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '-1', '0']
  const regExp = /\.|6.+|7.+|8.+|9.+/

  if(inputsValues.length > 2) {
    event.target.value = inputsValues.substring(0, 2)
    return
  }
  
  if(numBlockes.includes(inputsValues)) {
    event.target.value = inputsValues.substring(0, 1)
    if(inputsValues === '0') {
      event.target.value = inputsValues.replace(0, 1)
      
      Toastify({
        text: `Invalid value.`,
        className: "info-toastfy",
        duration: 2000,
        position: "center", 
      }).showToast();
    }
    return
  }

  if(inputsValues.match(regExp)) {
    event.target.value = inputsValues.substring(0, 1)
    return
  }

}

function clearInputs() {
  inputFormSettingsBreak.value = ''
  inputFormSettingsStudy.value = ''
}

function inicialMode() {
  document.getElementById('watch-mode').innerHTML = 'Welcome to the pomodoro timer.'
}

inicialMode()

function getMyUserFormGithub() {
  fetch('https://api.github.com/users/lucasmiller98')
    .then(response => {
      return response.json()
  }).then(data => {
    getDataGithub(data)
  })
}

function getDataGithub(data) {
  const containerPomodoro = document.getElementById('container-pomodoro')
  
  const span = document.createElement('span')
  span.setAttribute('class', 'span-name')
  span.innerText = `Pomodoro by ${data.name}`
  
  const img = document.createElement('img')
  img.setAttribute('class', 'img-avatar')
  img.setAttribute('src', data.avatar_url)
  
  const anchor = document.createElement('a')
  anchor.setAttribute('title', 'Github')
  anchor.setAttribute('class', 'anchor-url-github')
  anchor.setAttribute('target', '__blank')
  anchor.setAttribute('href', data.html_url)

  containerPomodoro.appendChild(img)
  containerPomodoro.appendChild(anchor)
  anchor.appendChild(img)
  containerTimer.appendChild(span)
}

getMyUserFormGithub()