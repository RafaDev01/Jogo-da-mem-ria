const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const characteres = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

const ckeckEndGame = () => {
   const disabledCards = document.querySelectorAll('.disabled-card')
   if(disabledCards.length == 20){
    clearInterval(this.loop)
    alert('Parabens você concluiu')
   }
}

let firstCard = '';
let secondCard = '';

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character')
  const secondCharacter = secondCard.getAttribute('data-character')

  if(firstCharacter === secondCharacter){

    firstCard.firstChild.classList.add('disabled-card')
    secondCard.firstChild.classList.add('disabled-card')
    firstCard = ''
    secondCard = ''

    ckeckEndGame();

  }else{
    setTimeout(()=>{
      firstCard.classList.remove('reveal-card')
      secondCard.classList.remove('reveal-card')
      firstCard = ''
      secondCard = ''
    },500)
  }  
}



const revealCard = ({target}) => {

  if(target.parentNode.className.includes('reveal-card')){
    return;
  }

  if(firstCard === ''){
    target.parentNode.classList.add('reveal-card')
    firstCard = target.parentNode;
  }else if( secondCard === ''){
    target.parentNode.classList.add('reveal-card')
    secondCard = target.parentNode;
  }
  
  checkCards();  
}

const createCard = (character) => {
  const card = createElement('div', 'card')
  const front = createElement('div', 'face front')
  const back = createElement('div', 'face back') 

  front.style.backgroundImage = `url(../img/${character}.png)`;

 /* 
  const card = document.createElement('div')
  const front = document.createElement('div')
  const back = document.createElement('div')

  card.className = "card";
  front.className = "face front";
  back.className = "face back";
*/

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard)
  card.setAttribute('data-character', character)

  return card;
  
}

const loadGame = () => {

  const dublicateCharacteres = [...characteres, ...characteres]

  const shuffledArray = dublicateCharacteres.sort(() =>Math.random() - 0.5);

  shuffledArray.forEach((character)=>{

    const card = createCard(character);
    grid.appendChild(card)

  })
}

const startTimer = () =>{

  this.loop = setInterval(()=>{

    const currentTime = +timer.innerHTML
    timer.innerHTML = currentTime + 1

  },1000);

}


window.onload = () => {

  const playerName = localStorage.getItem('player');

  spanPlayer.innerHTML = playerName;
  startTimer()
  loadGame()
}
