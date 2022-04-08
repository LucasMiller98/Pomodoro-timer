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

function makeSoundNotification() {
  
  const bell = {
    bell: 'images/bell-notification.svg',
    song: 'sound/Bell-notification.mp3'
  }
  
  if(!('Notification' in window)) {
    Toastify({
      text: `This browser doesn't suport desktop notifications`,
      className: "info-toastfy",
      duration: 3000,
      position: "center", 
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
  }

  if(Notification.permission === 'granted') {
    clallNotify(bell.bell, bell.song)
  }
  
  if(Notification.permission !== 'denied') { // Default mode. Because does not denied
    Notification.requestPermission(permission => {
      if(permission === "granted") {
        clallNotify({bell})
      }
    })

  }
}

function clallNotify({ bell }) {
  new Notification({ icon: bell.icon })
  new Audio(bell.song).play()
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  if(inputFormSettingsStudy.value === '' || inputFormSettingsBreak.value === '') {
    Toastify({
      text: "Please, type a number on fields. Fields empties.",
      className: "info-toastfy",
      duration: 3000,
      position: "center"
    }).showToast();
  }else{

    minutesStudy = inputFormSettingsStudy.value
    minutesBreak = inputFormSettingsBreak.value

    Toastify({
      text: `${inputFormSettingsStudy.value} minutes studying save with successful.`,
      className: "info-toastfy",
      duration: 3000,
      position: "center", 
    }).showToast();

    document.getElementById('watch-mode').innerText = `${inputFormSettingsStudy.value} minutes studying.`
    
    watch.innerText = `${minutesStudy < 10 ? `0${minutesStudy}`: minutesStudy} : ${segundsStudy < 10 ? `0${segundsStudy}`: segundsStudy}`

  }
})

function listenerOnClickButtonPlay() {
  stopedStartWatchStudy = setInterval(runWatchStudy, 1000)

  const pauseButton = document.getElementById('pause-watch-study-btn')
  const playButton = document.getElementById('start-watch-study-btn')
  const watchModeScreen = document.getElementById('watch-mode')

  pauseButton.style.display = 'flex'
  playButton.style.display = 'none'
  
  if(inputFormSettingsStudy.value === '' && runWatchStudy || minutesStudy === undefined) {
    watchModeScreen.innerText = `Please, configure the pomodore timer!`

    Toastify({
      text: `Please, configure the pomodore timer!`,
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
    console.log('Input Vazio')
  }

  if(minutesStudy === 0 && segundsStudy === 0) {
    
    if(minutesBreak === inputFormSettingsBreak.value) {

      segundsBreak = 1
      
      stopedStartWatchBreak = setInterval(runWatchBreak, 1000)
      
      pauseButton.style.display = 'flex'
  
      playButton.style.display = 'none'
      
    }
  }

  if(minutesStudy < 0 && segundsStudy < 60) {
    
    clearInterval(stopedStartWatchStudy)

    Toastify({
      text: `If you want to restart again, configure the pomodoro timer or press on button "reload".`,
      duration: 5000,
      position: 'center',
      style: {
        background: '#de3c4b',
        borderRadius: '12px'
      },
    }).showToast()

    playButton.style.display = 'flex'
    pauseButton.style.display = 'none'

    watchModeScreen.innerText = `Please, configure the pomodore timer!`    

  }
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
    pauseButton.style.display = 'none'
  
    playButton.style.display = 'flex'
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
    pauseButton.style.display = 'none'
  
    playButton.style.display = 'flex'
    
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
      duration: 1000,
      position: 'center',
      style: {
        background: '#de3c4b',
        borderRadius: '12px'
      },
    }).showToast()

    watchModeScreen.innerText = `You need configure before used!`
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

  const watchMode = document.getElementById('watch-mode')

  watchMode.innerText = `${inputFormSettingsBreak.value} minutes breaking.`

  if(segundsBreak === 0) {
    minutesBreak --
    segundsBreak = 60
  }

  if(segundsBreak === 1 && minutesBreak === 0) {
    clearInterval(stopedStartWatchBreak)
  }

  segundsBreak --

  if(segundsBreak === 0 && minutesBreak === 0) {
    makeSoundNotification()
    document.getElementById('start-watch-study-btn').style.display = 'flex'
    document.getElementById('pause-watch-study-btn').style.display = 'none'
  }
  
  watch.innerText = `${minutesBreak < 10 ? `0${minutesBreak}`: minutesBreak} : ${segundsBreak < 10 ? `0${segundsBreak}` : segundsBreak}`

}
  
function runWatchStudy() {

  if(segundsStudy === 0) {
    minutesStudy --
    segundsStudy = 60
  }

  const isMinutesAndSegundsEqualZero = minutesStudy === 0 && segundsStudy === 1

  const watchMode = document.getElementById('watch-mode')
  const startWatchStudyBtn = document.getElementById('start-watch-study-btn')
  const pauseWatchStudyBtn = document.getElementById('pause-watch-study-btn')

  switch(isMinutesAndSegundsEqualZero) {
    case true:
      watchMode.innerText = `Click on play button to start 
                                            the mode breaking.
                                            `

      clearInterval(stopedStartWatchStudy)
      makeSoundNotification()
    break

    case false:
      watchMode.innerText = `${inputFormSettingsStudy.value} minutes studying.`
    break
  }
  
  segundsStudy --
  
  if(segundsStudy === 0 && minutesStudy === 0) {
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
    
    if(event.key.toLowerCase() === 'e') {
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
}

function clearInputs() {
  inputFormSettingsBreak.value = ''
  inputFormSettingsStudy.value = ''
}