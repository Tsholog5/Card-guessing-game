document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');
    const winMessage = document.getElementById('win-message');
    let cards = [];
    let flippedCards = [];
    let matchedCards = 0;
    function initGame() {
      winMessage.classList.add('hidden');
      gameBoard.innerHTML = '';
      matchedCards = 0;
      flippedCards = [];
      const cardValues = [];
      for (let i = 1; i <= 18; i++) {
        cardValues.push(i, i);
      }
      cardValues.sort(() => Math.random() - 0.5);
      cardValues.forEach((value) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerText = '?';
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
      });
    }
    function flipCard(card) {
      if (flippedCards.length === 2 || card.classList.contains('flipped')) return;
      card.classList.add('flipped');
      card.innerText = card.dataset.value;
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        setTimeout(checkForMatch, 1000);
      }
    }
    function checkForMatch() {
      const [card1, card2] = flippedCards;
      if (card1.dataset.value === card2.dataset.value) {
        matchedCards += 2;
        if (matchedCards === 36) {
          winMessage.classList.remove('hidden');
        }
      } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerText = '?';
        card2.innerText = '?';
      }
      flippedCards = [];
    }
    resetButton.addEventListener('click', initGame);
    initGame();
  });
