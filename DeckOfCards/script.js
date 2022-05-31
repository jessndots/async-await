// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

let url = 'http://deckofcardsapi.com/api/deck'

async function logCard() {
    let card = await axios.get(`${url}/new/draw/?count=1`)
    console.log(`${card.data.cards[0].value} OF ${card.data.cards[0].suit}`)
}

logCard()

// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

// Once you have both cards, console.log the values and suits of both cards.

async function log2Cards() {
    let p1 = await axios.get(`${url}/new/draw/?count=1`);
    let deckID = p1.data.deck_id;
    let p2 = await axios.get(`${url}/${deckID}/draw/?count=1`);

    let card1 = `${p1.data.cards[0].value} OF ${p1.data.cards[0].suit}`;
    let card2 = `${p2.data.cards[0].value} OF ${p2.data.cards[0].suit}`;

    console.log(card1);
    console.log(card2);

}

log2Cards()




// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
let remaining;

async function shuffleNewDeck() {
    let p1 = await axios.get(`${url}/new/shuffle/?deck_count=1`);
    deckID = p1.data.deck_id;
    remaining = p1.data.remaining
    return deckID;
}

async function drawCard(deckID) {
    
    if (remaining > 0){
        let p1 = await axios.get(`${url}/${deckID}/draw/?count=1`);
        $('#card-img').html(`<img src="http://deckofcardsapi.com/static/img/${p1.data.cards[0].code}.png">`);
        remaining = p1.data.remaining
    }
    else {
        $('#card-img').append('<h2>Out of cards!</h2>');
    }
}

let deckID = shuffleNewDeck()

$('#new-card').on('click', function() {
    drawCard(deckID);
})

