const warnIcon = '<svg class="warning" viewBox="0 0.5 100 100"><g><path d="M50,4.7C25,4.7,4.7,25,4.7,50C4.7,75,25,95.3,50,95.3S95.3,75,95.3,50C95.3,25,75,4.7,50,4.7z M50,79   c-3,0-5.4-2.4-5.4-5.4c0-3,2.4-5.4,5.4-5.4s5.4,2.4,5.4,5.4C55.4,76.5,53,79,50,79z M50,62.7c-4,0-7.2-30.4-7.2-34.4S46,21,50,21   s7.2,3.2,7.2,7.2S54,62.7,50,62.7z"></path></g></svg>';
const lockIcon = '<svg class="lock" viewBox="0 12 100 88"><path d="M79.244,100H20.757c-2.085,0-3.774-1.689-3.774-3.775V58.113c0-2.084,1.689-3.773,3.774-3.773h3.773V38.191  c0-14.066,11.403-25.47,25.471-25.47c14.065,0,25.47,11.403,25.47,25.47V54.34h3.773c2.084,0,3.773,1.689,3.773,3.773v38.111  C83.018,98.311,81.328,100,79.244,100z M63.482,38.945c0-7.445-6.037-13.48-13.481-13.48c-7.446,0-13.481,6.035-13.481,13.48V54.34  h26.963V38.945z"/></svg>';

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let allParagraphs = [];
let paragraph = document.createElement('div');
paragraph.classList.add('paragraph');
paragraph.classList.add('capture');

let p = document.createElement('p');
let h5 = document.createElement('h5');
let h6 = document.createElement('h6');

const words = document.querySelector('.words');
const confidenceDisplay = document.querySelector('.confidence');
const timestamp = document.querySelector('.timestamp');
const listenButton = document.querySelector('.listen-button');

words.appendChild(paragraph);
paragraph.appendChild(h5);
paragraph.appendChild(h6);
paragraph.appendChild(p);

// Listening and adding transcript text
recognition.addEventListener('result', e => {

  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  p.textContent = transcript;

  // When user pauses, populate final transcript text, timestamp and confidance warning
  if(e.results[0].isFinal){

    // p.textContent = fixSyntax(transcript);

    let confidence = Array.from(e.results)
      .map(result => result[0].confidence)
      .join('');

    confidence = parseFloat(confidence).toFixed(3);
    if (confidence < 0.8){
      h6.innerHTML = warnIcon;
    }
    // else {
    //   h6.innerHTML = lockIcon;
    // }

    const date = new Date();
    const hours = date.getHours();
    const mins = date.getMinutes();
    const seconds = date.getSeconds();

    let timestamp = `${hours}:${("0" + mins).slice(-2)}:${("0" + seconds).slice(-2)}`;
    h5.textContent = timestamp;

    paragraph.classList.remove('capture');
    allParagraphs.push(paragraph);
    paragraph.addEventListener('click', unlockText);

    paragraph = document.createElement('div');
    paragraph.classList.add("paragraph");
    paragraph.classList.add('capture');

    h6 = document.createElement('h6');
    p = document.createElement('p');
    h5 = document.createElement('h5');

    words.appendChild(paragraph);
    paragraph.appendChild(h5);
    paragraph.appendChild(h6);
    paragraph.appendChild(p);
  }
});

let listening = false;

function toggleUtterance(){
  if (listening){
    recognition.start();
  } else {
    recognition.stop();
  }
}

function toggleListening(){
  listening = !listening;
  toggleUtterance();
  listenButton.classList.toggle('active');
}

function unlockText(){
  // allParagraphs.forEach(paragraph => paragraph.classList.remove('unlocked'));
  // this.classList.add('unlocked');
  const paragraphText = this.querySelector('p');
  paragraphText.contentEditable = true;

  // TODO if a user hits enter while editing text, set contentEditable to false.
}

recognition.addEventListener('end', toggleUtterance);
listenButton.addEventListener('click', toggleListening);
listenButton.addEventListener('touchend', toggleListening);
