// data: store (without loadCards)

import { FlashCard, newFlashCard } from '../src/cards/flashcard'
import { newInMemoryCardStore } from '../src/data/store'

// add card: size+1, element is correct
describe('test if elements can be successfully inserted. ', () => {
  test('add 1 flashcard to store:', () => {
    const flashcard = newFlashCard('q1', 'a1')
    const cards: FlashCard[] = []
    const cardStore = newInMemoryCardStore(cards)
    expect(cardStore.addCard(flashcard)).toBeTruthy()
    const cards2 = cardStore.getAllCards()
    expect(cards2.length).toBe(1)
    expect(cards2[cards2.length - 1].getQuestion()).toEqual('q1')
    expect(cards2[cards2.length - 1].getAnswer()).toEqual('a1')
  })
  test('add more than 1 flashcard to store', () => {
    const flashcard1 = newFlashCard('q1', 'a1')
    const flashcard2 = newFlashCard('q2', 'a2')
    const flashcard3 = newFlashCard('q3', 'a3')
    const flashcard4 = newFlashCard('q4', 'a4')
    const cards: FlashCard[] = [flashcard1, flashcard2]
    const cardStore = newInMemoryCardStore(cards)
    expect(cardStore.addCard(flashcard3)).toBeTruthy()
    expect(cardStore.addCard(flashcard4)).toBeTruthy()

    const cards2 = cardStore.getAllCards()
    expect(cards2.length).toEqual(4)
    expect(cards2[cards2.length - 1].getQuestion()).toEqual('q4')
    expect(cards2[cards2.length - 1].getAnswer()).toEqual('a4')
    expect(cards2[cards2.length - 2].getQuestion()).toEqual('q3')
    expect(cards2[cards2.length - 2].getAnswer()).toEqual('a3')
  })
  test('add flashcard that already exists to store', () => {
    const flashcard1 = newFlashCard('q1', 'a1')
    const cards: FlashCard[] = new Array(flashcard1)
    const cardStore = newInMemoryCardStore(cards)
    expect(cardStore.addCard(flashcard1)).toBeFalsy()
    const cards2 = cardStore.getAllCards()
    expect(cards2.length).toBe(1)
    let flag = false
    for (var i = 0; i < cards2.length; i++) {
      if (cards2[i].equals(flashcard1)) {
        flag = true
      }
    }
    expect(flag).toBeTruthy()
  })
})
// remove card: size-1, element is removed
describe('test if elements can be successfully removed. ', () => {
  test('remove 1 flashcard from store:', () => {
    const flashcard = newFlashCard('q1', 'a1')
    const cards: FlashCard[] = new Array(flashcard)
    const cardStore = newInMemoryCardStore(cards)
    expect(cardStore.removeCard(flashcard)).toBeTruthy()

    const cards2 = cardStore.getAllCards()
    expect(cards2.length).toBe(0)
    // test if there is no this flashcard
    let flag = true
    if (cards2.length > 0) {
      for (var i = 0; i < cards2.length; i++) {
        if (cards2[i].equals(flashcard)) {
          flag = false
        }
      }
    }
    expect(flag).toBeTruthy()
  })
  test('remove more than 1 flashcard to store', () => {
    const flashcard1 = newFlashCard('q1', 'a1')
    const flashcard2 = newFlashCard('q2', 'a2')
    const cards: FlashCard[] = [flashcard1, flashcard2]
    const cardStore = newInMemoryCardStore(cards)
    expect(cardStore.removeCard(flashcard1)).toBeTruthy()
    expect(cardStore.removeCard(flashcard2)).toBeTruthy()

    const cards2 = cardStore.getAllCards()
    expect(cards2.length).toBe(0)
    // test if there is no this flashcard
    let flag = true
    if (cards2.length > 0) {
      for (var i = 0; i < cards2.length; i++) {
        if (cards2[i].equals(flashcard1) || cards2[i].equals(flashcard2)) {
          flag = false
        }
      }
    }
    expect(flag).toBeTruthy()
  })
  test('remove flashcard that does not exist', () => {
    const flashcard1 = newFlashCard('q1', 'a1')
    const flashcard2 = newFlashCard('q2', 'a2')
    const cards: FlashCard[] = new Array(flashcard1)
    const cardStore = newInMemoryCardStore(cards)
    expect(cardStore.removeCard(flashcard2)).toBeFalsy()
    const cards2 = cardStore.getAllCards()
    expect(cards2.length).toBe(1)
    // test if there is no this flashcard
    let flag = true
    if (cards2.length > 0) {
      for (var i = 0; i < cards2.length; i++) {
        if (cards2[i].equals(flashcard2)) {
          flag = false
        }
      }
    }
    expect(flag).toBeTruthy()
  })
})
// invert card: flip the answer and question
describe('test if answer and question can be successfully swaped', () => {
  test('invert an empty card store.', () => {
    const cards: FlashCard[] = []
    const cardStore = newInMemoryCardStore(cards)
    const invertedCardStore = cardStore.invertCards()
    expect(invertedCardStore.getAllCards().length).toBe(0)
  })
  test('invert a non-empty card store.', () => {
    const flashcard1 = newFlashCard('q1', 'a1')
    const flashcard2 = newFlashCard('q2', 'a2')
    const cards: FlashCard[] = [flashcard1, flashcard2]
    const cardStore = newInMemoryCardStore(cards)
    const invertedCardStore = cardStore.invertCards()
    expect(invertedCardStore.getAllCards().length).toBe(2)
    for (var i = 0; i < invertedCardStore.getAllCards().length; i++) {
      var invertCard = invertedCardStore.getAllCards()[i]
      var card = cardStore.getAllCards()[i]
      expect(invertCard.getAnswer()).toEqual(card.getQuestion())
      expect(invertCard.getQuestion()).toEqual(card.getAnswer())
    }
  })
})
