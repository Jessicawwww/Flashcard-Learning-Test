import { loadCards } from './data/store'
import { newCardDeck } from './ordering/cardproducer'
import { newCardShuffler } from './ordering/prioritization/cardshuffler'
import { newUI } from './ui'

// 1. load command line options
// 2. set up cards and card organizers depending on command line options
// 3. create a card deck and the UI and start the UI with the card deck

// A note about using yargs for your CLI:
// .argv/.parse() may not work as expected in the latest version.
// Instead, you can use .parseSync()

const cardDeck = newCardDeck(
  loadCards('cards/designpatterns.csv').getAllCards(),
  newCardShuffler()
)

newUI().studyCards(cardDeck)
