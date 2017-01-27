window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let paragraph = document.createElement('div')
paragraph.classList.add("paragraph");

let p = document.createElement('p');
let h5 = document.createElement('h5');
let h6 = document.createElement('h6');

const words = document.querySelector('.words');
const confidenceDisplay = document.querySelector('.confidence');
const timestamp = document.querySelector('.timestamp');
const listenButton = document.querySelector('.listen-button');

words.appendChild(paragraph);
paragraph.appendChild(h5);
paragraph.appendChild(p);
paragraph.appendChild(h6);

recognition.addEventListener('result', e => {

  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  let confidence = Array.from(e.results)
    .map(result => result[0].confidence)
    .join('');

  confidence = parseFloat(confidence).toFixed(3);

  const date = new Date();
  const hours = date.getHours();
  const mins = date.getMinutes();
  const seconds = date.getSeconds();

  let timestamp = `${hours}:${("0" + mins).slice(-2)}:${("0" + seconds).slice(-2)}`;

  p.textContent = transcript;

  if(e.results[0].isFinal){
    h5.textContent = timestamp;
    h6.textContent = `${(confidence * 100).toFixed(1)}%`;
    p.contentEditable = true;

    paragraph = document.createElement('div')
    paragraph.classList.add("paragraph");
    h6 = document.createElement('h6');
    p = document.createElement('p');
    h5 = document.createElement('h5');

    words.appendChild(paragraph);
    paragraph.appendChild(h5);
    paragraph.appendChild(p);
    paragraph.appendChild(h6);
  }
  // console.log(e);
})

let listening = false;

function toggleUtterance(){
  listening ? recognition.start() : recognition.stop() ;
}

function toggleListening(){
  listening = !listening;
  toggleUtterance();
  listenButton.classList.toggle('active');
}

recognition.addEventListener('end', toggleUtterance);
listenButton.addEventListener('click', toggleListening);
