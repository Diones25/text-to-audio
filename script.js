let textarea = document.querySelector("#textarea");
let voices = document.querySelector("#voices");
let button = document.querySelector("#button");
let selectedVoice = 0; //a voz 16 é a voz da mulher do google

window.speechSynthesis.addEventListener('voiceschanged', () => { 
  let voicesList = window.speechSynthesis.getVoices();//Precisaria apenas dessa linha
  for(let i in voicesList) {
    let optionEl = document.createElement('option');
    optionEl.setAttribute('value', i);
    optionEl.innerText = voicesList[i].name;
    voices.appendChild(optionEl);
  }
})

button.addEventListener('click', () => { // e dessa para dar feedback de sucesso ou erro no
  if(textarea.value !== '') {            //sistema de editoração
    let ut = new SpeechSynthesisUtterance(textarea.value);
    let voicesList = window.speechSynthesis.getVoices();
    ut.voice = voicesList[selectedVoice]; //ut.voice = voicesList[16];
    window.speechSynthesis.speak(ut);    
  }
})

voices.addEventListener('change', () => {
  selectedVoice = parseInt(voices.value);
})

function updateStatus() {
  if(window.speechSynthesis.speaking) {
    voices.setAttribute('disabled', 'disabled');
    button.setAttribute('disabled', 'disabled');
  }
  else {
    voices.removeAttribute('disabled', 'disabled');
    button.removeAttribute('disabled', 'disabled');
  }
}

setInterval(updateStatus, 100)