// DOM elements
const word = document.querySelector(".wordInput");
const number = document.querySelector(".noInput");
const wordResult = document.querySelector(".wordRes");
const numberResult = document.querySelector(".noRes");
const btnWord = document.querySelector(".btnWord");
const btnNo = document.querySelector(".btnNo");
const thalaImg = document.querySelector(".thala");
const twitter = document.querySelector(".twitter");
const whatsapp = document.querySelector(".whatsapp");

// Setting up Links

twitter.setAttribute(
  "href",
  `https://twitter.com/intent/tweet?text=${`Check This Out !🔥💥💥 ${window.location}`}`
);
whatsapp.setAttribute(
  "href",
  `https://api.whatsapp.com/send?text=${`Check This Out !🔥💥💥 ${window.location}`}`
);

// Setting up Audio

let isSoundPlaying = false;
let sound = document.createElement("audio");
sound.src = "./assets/audio/thala_audio.mp3";
sound.setAttribute("preload", "auto");
sound.setAttribute("controls", "none");
sound.style.display = "none";
document.body.appendChild(sound);

// Extracting info from url

const searchParams = new URLSearchParams(window.location.search);
const wordValue =
  searchParams.get("word") == null ? false : searchParams.get("word");
const numberValue =
  searchParams.get("no") == null ? false : searchParams.get("no");

// Event handlers

btnWord.addEventListener("click", (e) => {
  e.preventDefault();
  if (!wordValue) {
    let result = checkThalaStr(word.value.trim());
    if (result) {
      thalaStrConfirm();
      setLink();
    } else {
      wordResult.innerHTML = "Try Again!";
    }
  }
});

btnNo.addEventListener("click", (e) => {
  e.preventDefault();
  if (!numberValue) {
    let result = checkThalaNum(number.value);
    if (result) {
      thalaNumConfirm();
      setLink();
    } else {
      numberResult.innerHTML = "Try Again!";
    }
  }
});

// Helper Functions

const checkThalaNum = (num) => {
  let sum = 0;
  for (const digits of num) {
    sum += Number(digits);
  }

  return sum == 7 ? true : false;
};

const checkThalaStr = (inp) => {
  return inp.length == 7 ? true : false;
};

const playAudio = () => {
  sound.volume = 0.5;
  sound.play();
};

const thalaStrConfirm = () => {
  let text = `${word.value[0]}+${word.value[1]}+${word.value[2]}+${word.value[3]}+${word.value[4]}+${word.value[5]}+${word.value[6]} = 7 Thala For a Reason!`;
  wordResult.innerHTML = text;

  if (!isSoundPlaying) {
    isSoundPlaying = true;
    playAudio();
  }

  thalaImg.classList.add("thalaAnimate");
};

const thalaNumConfirm = () => {
  let text = ``;
  for (let i = 0; i < number.value.length; i++) {
    if (i == number.value.length - 1) {
      text += `${number.value[i]} = 7 `;
    } else {
      text += `${number.value[i]}+`;
    }
  }
  text += `Thala For a Reason!`;
  numberResult.innerHTML = text;

  if (!isSoundPlaying) {
    isSoundPlaying = true;
    playAudio();
  }

  thalaImg.classList.add("thalaAnimate");
};

const setLink = () => {
    let link = `${
        window.location
      }?word=${word.value.trim()}&no=${number.value.trim()}`;
      twitter.setAttribute(
        "href",
        `https://twitter.com/intent/tweet?text=${`Check This Out !🔥💥💥 \n ${link}
      `}`
      );
      whatsapp.setAttribute(
        "href",
        `https://api.whatsapp.com/send?text=${`Check This Out !🔥💥💥 \n ${link}
      `}`
      );
}

// Default behaviour

if (wordValue) {
  word.value = wordValue;
  let result = checkThalaStr(wordValue);

  if (result) {
    thalaStrConfirm();
  }
}

if (numberValue) {
  number.value = numberValue;
  let result = checkThalaNum(numberValue);

  if (result) {
    thalaNumConfirm();
  }
}
