const buttonContainer = document.querySelector('.button-container')
const containerTimer = document.querySelector('.container-timer')
const watch = document.getElementById('watch-study')
const inputFormSettingsStudy = document.getElementsByTagName('input')[0]
const inputFormSettingsBreak = document.getElementsByTagName('input')[1]
const form = document.getElementById('form')

let minutesStudy
let segundsStudy = 0
let minutesBreak
let segundsBreak = 0
let stopedStartWatchStudy = 0
let stopedStartWatchBreath = 0

form.addEventListener('submit', (event) => {
  event.preventDefault()
  if(inputFormSettingsStudy.value === '' || inputFormSettingsBreak.value === '') {
    alert('Please, type something!') // I will change it.
  }else{
    console.log('ISSO!! ')
    // console.log(inputFormSettingsStudy.value)

    minutesStudy = inputFormSettingsStudy.value
    minutesBreak = inputFormSettingsBreak.value

    watch.innerText = `${minutesStudy < 10 ? `0${minutesStudy}`: minutesStudy} : ${segundsStudy < 10 ? `0${segundsStudy}`: segundsStudy}`

    console.log('Salvou')

    // startModal('close-button')

    console.log(minutesBreak)

    if(minutesBreak !== null) {
      watch.innerText = `${minutesBreak < 10 ? `0${minutesBreak}`: minutesBreak} : ${segundsBreak < 10 ? `0${segundsBreak}`: segundsBreak}`
    }
  }
})

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
  createImgTagPause.setAttribute('alt', 'pause')

  const createButtonPause = document.createElement('button')
  createButtonPause.setAttribute('id', 'pause-watch-study-btn')
  createButtonPause.setAttribute('class', 'timer-btn')
  createButtonPause.setAttribute('type', 'button')
  createButtonPause.setAttribute('title', 'pause')
  createButtonPause.setAttribute('style', 'display: none')
  createButtonPause.appendChild(createImgTagPause)
  
  createButtonPlay.addEventListener('click', () => {
    stopedStartWatchStudy = setInterval(runWatch, 1000)
    
    document.getElementById('pause-watch-study-btn').style.display = 'flex'
    
    document.getElementById('start-watch-study-btn').style.display = 'none'

    if(minutesStudy === undefined) {
      alert('Please, configure the pomodore timer!')

      minutesStudy ++
      clearInterval(stopedStartWatchStudy)
      document.getElementById('start-watch-study-btn').style.display = 'flex'
      document.getElementById('pause-watch-study-btn').style.display = 'none'
    }
    
  })
  
  createButtonPause.addEventListener('click', () => {
    document.getElementById('pause-watch-study-btn').style.display = 'none'

    document.getElementById('start-watch-study-btn').style.display = 'flex'

    clearInterval(stopedStartWatchStudy)

  })

  
  const createButtonReload = document.createElement('button')
  createButtonReload.setAttribute('id', 'reload-btn')
  createButtonReload.setAttribute('class', 'timer-btn')
  createButtonReload.setAttribute('type', 'button')
  createButtonReload.setAttribute('title', 'Reload')
  createButtonReload.appendChild(createImgTagReload)
  
  createButtonReload.addEventListener('click', () => {
    minutesStudy = 25 
    segundsStudy = 2
    
    
    if(segundsStudy === 0) {
      minutesStudy --
      segundsStudy = 60
    }
    
    segundsStudy --
    
  })

  
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


  createButtonSettings.addEventListener('click', () => {

    startModal('modal-settings')
    
    console.log('Clicou no Settings')
  })

  const createImgTagInfo = document.createElement('img')
  createImgTagInfo.setAttribute('class', 'image-btn')
  createImgTagInfo.setAttribute('src', 'images/info-icon.svg')
  createImgTagInfo.setAttribute('alt', 'info')
  
  const createButtonInfo = document.createElement('button')
  createButtonInfo.setAttribute('id', 'info-btn')
  createButtonInfo.setAttribute('class', 'timer-btn info-popup-btn')
  createButtonInfo.setAttribute('type', 'button')
  createButtonInfo.setAttribute('title', 'info')
  createButtonInfo.appendChild(createImgTagInfo)
  
  createButtonInfo.addEventListener('click', () => {
    console.log('Clicou no info')
  })
  
  const createContainerSettingsAndInfo = document.createElement('div') 
  createContainerSettingsAndInfo.setAttribute('class', 'container-settings-info')
  
  createContainerSettingsAndInfo.appendChild(createButtonSettings)
  createContainerSettingsAndInfo.appendChild(createButtonInfo)
  
  containerTimer.appendChild(createContainerSettingsAndInfo)
  
  buttonContainer.appendChild(createButtonPause)

  buttonContainer.appendChild(createButtonPlay)
  
  buttonContainer.appendChild(createButtonReload)
}
  
createHTMLElementsAndStartWatch()
  
function runWatch() {
    
    
  if(segundsStudy === 0) {
    minutesStudy --
    segundsStudy = 60
  }
  
  if(segundsStudy === 1 && minutesStudy === 0) {
    clearInterval(stopedStartWatchStudy)
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

    if(event.target.id === modalID || event.target.className === 'close-button') {
      modal.classList.remove('show-modal')
    }
  })
}