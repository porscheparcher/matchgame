const cards = document.querySelectorAll('.match-card')

let flippedCard = false;
let disableBoard = false;
let firstCard, secondCard;

function handleCardClick(){
  if (disableBoard) return;
  if (this === firstCard) return;
  
  this.classList.add('flip');

    if (!flippedCard){
      flippedCard = true;
      firstCard = this;

      return;
    }

    secondCard = this;
    matchCheck();
  }
    
  function matchCheck() {
    let isMatched = firstCard.dataset.image === secondCard.dataset.image;
    isMatched ? disableCards() : unflippedCard();
  }

  function disableCards() {
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);

    boardReset();
  }

  function unflippedCard() {
    disableBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      boardReset();
    }, 1000);
  }

  function boardReset() {
    [flippedCard, disableBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach(card => {
      let randomized = Math.floor(Math.random() * 12);
      card.style.order = randomized;
    });
  })();



cards.forEach(card => card.addEventListener('click', handleCardClick));