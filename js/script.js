const buttonContainer = document.querySelector('.button-container')
const containerTimer = document.querySelector('.container-timer')
const watch = document.getElementById('watch-study')

let minutesStudy = 1
let segundsStudy = 6
let minutesBreath = 5
let segundsBreath = 60
let stopedStartWatchStudy = 0
let stopedStartWatchBreath = 0

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
    console.log('Clicou no play')
    
    document.getElementById('pause-watch-study-btn').style.display = 'flex'
    
    document.getElementById('start-watch-study-btn').style.display = 'none'
    
  })
  
  createButtonPause.addEventListener('click', () => {
    document.getElementById('pause-watch-study-btn').style.display = 'none'

    document.getElementById('start-watch-study-btn').style.display = 'flex'

    clearInterval(stopedStartWatchStudy)

    console.log('Pause')
  })

  console.log(createButtonPlay)
  
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
    
    console.log('Clicou no reload')
    
  })

  
  const createImgTagSettings = document.createElement('img')
  createImgTagSettings.setAttribute('class', 'image-btn')
  createImgTagSettings.setAttribute('src', 'images/settings-icon.svg')
  createImgTagSettings.setAttribute('alt', 'settins')
  
  const createButtonSettings = document.createElement('button')
  createButtonSettings.setAttribute('id', 'settins-btn')
  createButtonSettings.setAttribute('class', 'timer-btn')
  createButtonSettings.setAttribute('type', 'button')
  createButtonSettings.setAttribute('title', 'settins')
  createButtonSettings.appendChild(createImgTagSettings)

  const createImgTagInfo = document.createElement('img')
  createImgTagInfo.setAttribute('class', 'image-btn')
  createImgTagInfo.setAttribute('src', 'images/info-icon.svg')
  createImgTagInfo.setAttribute('alt', 'info')
  
  const createButtonInfo = document.createElement('button')
  createButtonInfo.setAttribute('id', 'info-btn')
  createButtonInfo.setAttribute('class', 'timer-btn')
  createButtonInfo.setAttribute('type', 'button')
  createButtonInfo.setAttribute('title', 'info')
  createButtonInfo.appendChild(createImgTagInfo)
  
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
  
  console.log(segundsStudy)
  
  watch.innerText = `${minutesStudy} : ${segundsStudy < 10 ? `0${segundsStudy}`: `${segundsStudy}`}`
}