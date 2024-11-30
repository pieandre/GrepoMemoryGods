const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedCards = 0;
let moveCount = 0; // Contatore delle mosse

// Funzione per mescolare le carte
function shuffleCards() {
    const cardArray = Array.from(cards); // Converte il NodeList in array
    const shuffledArray = shuffle(cardArray); // Mescola l'array
    shuffledArray.forEach(card => {
        document.querySelector('.memory-game').appendChild(card); // Riordina le carte nel DOM
    });
}

// Algoritmo di Fisher-Yates Shuffle
function shuffle(array) {
    let currentIndex = array.length, randomIndex, temporaryValue;

    // Finché ci sono elementi da mescolare
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Scambia gli elementi
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Funzione per aggiornare il contatore delle mosse e la barra di progresso
function updateMoveCounter() {
    const moveCounterElement = document.getElementById('move-counter');
    const progressBar = document.getElementById('move-progress');

    // Aggiorna il contatore delle mosse
    moveCounterElement.textContent = moveCount;

    // Aggiorna il valore della barra di progresso
    progressBar.value = moveCount;

    // Controlla se il numero di mosse supera il limite
    if (moveCount > 1000) { // Cambiato il limite a 1000
        setTimeout(() => {
            alert("Hai perso. Riprova!"); // Mostra il messaggio di fine gioco
            restartGame(); // Riavvia il gioco
        }, 500);
    }
}

// Funzione per verificare se le carte selezionate corrispondono
function checkForMatch() {
    const [firstCard, secondCard, thirdCard] = flippedCards;

    // Controlla se tutte e tre le carte hanno lo stesso valore
    if (
        firstCard.dataset.card[0] === secondCard.dataset.card[0] &&
        secondCard.dataset.card[0] === thirdCard.dataset.card[0]
    ) {
        // Le carte corrispondono, lasciale girate
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        thirdCard.classList.add('matched');
        flippedCards = [];
        matchedCards += 3;

        // Controlla se tutte le carte sono abbinate
        if (matchedCards === cards.length) {
            setTimeout(() => alert('Hai vinto!'), 500);
        }
    } else {
        // Le carte non corrispondono, girale di nuovo
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            thirdCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Funzione per assegnare i valori alle carte e aggiungere le immagini
function assignCardValues() {
    const cardValues = [
        ["A", "AA", "AAA"], 
        ["B", "BB", "BBB"], 
        ["C", "CC", "CCC"], 
        ["D", "DD", "DDD"], 
        ["E", "EE", "EEE"], 
        ["F", "FF", "FFF"], 
        ["G", "GG", "GGG"], 
        ["H", "HH", "HHH"]
    ];

    let cardArray = [];
    
    // Costruisci l'array di carte (3 carte per ogni terzetto)
    cardValues.forEach(group => {
        group.forEach(value => {
            cardArray.push(value);
        });
    });

    cardArray = shuffle(cardArray); // Mescola le carte
    
    // Assegna un'immagine unica per ogni carta
    cards.forEach((card, index) => {
        const value = cardArray[index]; // Prendi il valore della carta
        card.dataset.card = value; // Assegna il valore al dataset della carta

        // Assegna l'immagine alla carta in base al valore
        const frontFace = card.querySelector('.card-front');
        frontFace.style.backgroundImage = `url('images/${value.toLowerCase()}.png')`; // Assicurati che le immagini siano nella cartella 'images'
    });
}

// Aggiungi eventi clic alle carte
cards.forEach(card => {
    card.addEventListener('click', () => {
        // Se sono già girate meno di 3 carte e questa carta non è già girata
        if (flippedCards.length < 3 && !card.classList.contains('flipped')) {
            card.classList.add('flipped'); // Gira la carta
            flippedCards.push(card);

            // Incrementa il numero di mosse
            moveCount++;
            updateMoveCounter(); // Aggiorna contatore e barra di progresso

            // Quando ci sono 3 carte girate, verifica se corrispondono
            if (flippedCards.length === 3) {
                checkForMatch();
            }
        }
    });
});

// Funzione per riavviare il gioco
function restartGame() {
    moveCount = 0; // Reset delle mosse
    matchedCards = 0; // Reset delle carte abbinate
    flippedCards = []; // Resetta le carte girate

    // Rimuove la classe 'flipped' da tutte le carte per girarle sul retro
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.classList.remove('matched'); // Rimuove eventuali classi di abbinamento
    });

    updateMoveCounter(); // Reset del contatore delle mosse e della barra di progresso
    shuffleCards(); // Mescola di nuovo le carte
    assignCardValues(); // Riassegna i valori alle carte
}

// Inizializza il gioco
assignCardValues();
shuffleCards();
