// cardproducer: card deck
// since reorganize function has already been tested in other functions, here we only test

import { newFlashCard } from '../src/cards/flashcard'
import { newCardDeck } from '../src/ordering/cardproducer'
import { newMostMistakesFirstSorter } from '../src/ordering/prioritization/mostmistakes'
import { newNonRepeatingCardOrganizer } from '../src/ordering/repetition/cardrepeater'

// test iscomplete function:
describe('test whether isComplete works fine for organizers', () => {
  test('all cards have been tested.', () => {
    const flashcard1 = newFlashCard('q1', 'a1')
    const flashcard2 = newFlashCard('q2', 'a2')
    const cardorganizer = newNonRepeatingCardOrganizer()
    const carddeck = newCardDeck([flashcard1, flashcard2], cardorganizer)

    const cards = carddeck.getCards()
    cards[0].recordResult(false)
    cards[1].recordResult(true)
    carddeck.reorganize()
    expect(carddeck.isComplete()).toBeTruthy()
  })
  test('not all have been tested.', () => {
    const flashcard1 = newFlashCard('q1', 'a1')
    const flashcard2 = newFlashCard('q2', 'a2')
    const cardorganizer = newMostMistakesFirstSorter()
    const carddeck = newCardDeck([flashcard1, flashcard2], cardorganizer)

    const cards = carddeck.getCards()
    cards[0].recordResult(false)
    cards[1].recordResult(true)
    carddeck.reorganize()
    expect(carddeck.isComplete()).toBeFalsy()
  })
})

// test countCards function
describe('test whether countcards get the right number of remaining cards.', () => {
  test('no cards after the organizer.', () => {
    const flashcard1 = newFlashCard('q1', 'a1')
    const flashcard2 = newFlashCard('q2', 'a2')
    const cardorganizer = newNonRepeatingCardOrganizer()
    const carddeck = newCardDeck([flashcard1, flashcard2], cardorganizer)
    const cards = carddeck.getCards()
    cards[0].recordResult(false)
    cards[1].recordResult(true)
    carddeck.reorganize()
    expect(carddeck.countCards()).toBe(0)
  })
  test('there are still cards after organizer', () => {
    const flashcard1 = newFlashCard('q1', 'a1')
    const flashcard2 = newFlashCard('q2', 'a2')
    const cardorganizer = newMostMistakesFirstSorter()
    const carddeck = newCardDeck([flashcard1, flashcard2], cardorganizer)

    const cards = carddeck.getCards()
    cards[0].recordResult(false)
    cards[1].recordResult(true)
    carddeck.reorganize()
    expect(carddeck.countCards()).toBe(2)
  })
})
