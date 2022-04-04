const buttonContainer = document.querySelector('.button-container')
const containerTimer = document.querySelector('.container-timer')
const watch = document.getElementById('watch-study')
const clockContainer = document.querySelector('.clock')
const inputFormSettingsStudy = document.getElementsByTagName('input')[0]
const inputFormSettingsBreak = document.getElementsByTagName('input')[1]
const form = document.getElementById('form')

console.log(typeof inputFormSettingsStudy.value.length)

let minutesStudy

console.log(minutesStudy)

let segundsStudy = 0
let minutesBreak
let segundsBreak = 0
let stopedStartWatchStudy = 0
let stopedStartWatchBreak = 0


function makeSoundNotification() {
  
  const bell = {
    title: 'Success',
    message: 'Message',
    icon: 'images/bell-notification.svg',
    song: 'sound/water-droplet-notification-tone.mp3'
  }
  
  if(!('Notification' in window)) {
    alert(`This browser doesn't suport desktop notifications`)
  }

  if(Notification.permission === 'granted') {
    clallNotify(bell.title, bell.message, bell.icon, bell.song)
  }

  console.log(typeof Notification.permission)
  
  if(Notification.permission !== 'denied') { // Default mode. Because does not denied
    Notification.requestPermission(permission => {
      if(permission === "granted") {
        clallNotify({bell})
      }
    })

  }
}

function clallNotify({ bell }) {
  new Notification(bell.title, { body: bell.message, icon: bell.icon })
  new Audio(bell.song).play()
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  if(inputFormSettingsStudy.value === '' || inputFormSettingsBreak.value === '') {
    alert('Please, type something!') // I will change it.
  }else{

    minutesStudy = inputFormSettingsStudy.value
    minutesBreak = inputFormSettingsBreak.value
    
    

    watch.innerText = `${minutesStudy < 10 ? `0${minutesStudy}`: minutesStudy} : ${segundsStudy < 10 ? `0${segundsStudy}`: segundsStudy}`


    console.log('Salvou')

    console.log(minutesBreak)
  }
})

function listenerOnClickButtonPlay() {
  stopedStartWatchStudy = setInterval(runWatchStudy, 1000)
  
  document.getElementById('pause-watch-study-btn').style.display = 'flex'
  
  document.getElementById('start-watch-study-btn').style.display = 'none'

  

  if(minutesStudy === undefined) {
    alert('Please, configure the pomodore timer!')

    clearInterval(stopedStartWatchStudy)
    document.getElementById('start-watch-study-btn').style.display = 'flex'
    document.getElementById('pause-watch-study-btn').style.display = 'none'

  }

  
  console.log(typeof minutesStudy)

  if(minutesStudy === 0 && segundsStudy === 0) {
    console.log('Entrou no if linha 99')
    console.log(minutesBreak === inputFormSettingsBreak.value)
    
    if(minutesBreak === inputFormSettingsBreak.value) {
      
      console.log('if linha 104')

      segundsBreak = 1
      
      console.log('study min' + minutesStudy)
      console.log('study seg' + segundsStudy)

      stopedStartWatchBreak = setInterval(runWatchBreak, 1000)
      
      document.getElementById('pause-watch-study-btn').style.display = 'flex'
  
      document.getElementById('start-watch-study-btn').style.display = 'none'
    }
  }

}

function listenerOnClickButtonPause() {
  document.getElementById('pause-watch-study-btn').style.display = 'none'

  document.getElementById('start-watch-study-btn').style.display = 'flex'
  
  
  clearInterval(stopedStartWatchStudy)
  
  clearInterval(stopedStartWatchBreak)
  
  console.log(typeof minutesStudy)
  
  if(minutesStudy !== 0) {
    minutesStudy = 0
    segundsStudy = 0
  }

  console.log('break ' + minutesBreak)
  console.log('study ' + minutesStudy)

}

function listenerOnClickButtonReload() {

  minutesStudy = inputFormSettingsStudy.value
  segundsStudy = 2
  minutesBreak = inputFormSettingsBreak.value
  segundsBreak = 2
  
  if(segundsStudy === 0) {
    minutesStudy --
    segundsStudy = 60
  }
  
  console.log(typeof minutesStudy)
  

  
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
  
  document.getElementById('watch-mode').innerText = `${inputFormSettingsBreak.value} minutes breaking.`

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

  watch.innerText = `${minutesBreak < 10 ? `0${minutesBreak}`: minutesBreak}: ${segundsBreak < 10 ? `0${segundsBreak}` : segundsBreak}`

}
  
function runWatchStudy() {
  
  if(inputFormSettingsStudy.value.length === 0) {
    clearInterval(stopedStartWatchStudy)
    document.getElementById('start-watch-study-btn').style.display = 'flex'
    document.getElementById('pause-watch-study-btn').style.display = 'none'
    segundsStudy = 1
    minutesStudy = 0
    document.getElementById('watch-mode').style.display = 'none'
    alert('Access denied. Please, try settings the Pomodoro timer.')
  }
  
  document.getElementById('watch-mode').innerText = `${inputFormSettingsStudy.value} minutes studying.`

  if(segundsStudy === 0) {
    minutesStudy --
    segundsStudy = 60
  }
  
  if(segundsStudy === 1 && minutesStudy === 0) { // O relógio zerou  
    clearInterval(stopedStartWatchStudy)
    alert('Click on play button to start the mode breaking.')
    makeSoundNotification()
  }
  
  segundsStudy --
  
  if(segundsStudy === 0 && minutesStudy === 0) {
    document.getElementById('start-watch-study-btn').style.display = 'flex'
    document.getElementById('pause-watch-study-btn').style.display = 'none'
  }
  
  watch.innerText = `${minutesStudy < 10 ? `0${minutesStudy}`: minutesStudy} : ${segundsStudy < 10 ? `0${segundsStudy}`: segundsStudy}`
}

function startModal(modalID) {
  const modal = document.getElementById(modalID)
  modal.classList.add('show-modal')

  modal.addEventListener('click', (event) => {

    const isOpenModal = event.target.id === modalID || 
                        event.target.className === 'close-button' || 
                        event.target.id === 'save-button'

    if(isOpenModal) {
      modal.classList.remove('show-modal')
    }
  })
}