// repetition: card repeater
import { CardStatus, newCardStatus } from '../src/cards/cardstatus'
import { newFlashCard } from '../src/cards/flashcard'
import { newNonRepeatingCardOrganizer, newRepeatingCardOrganizer } from '../src/ordering/repetition/cardrepeater'

// test non-repeating card organizer: just appear once
describe('test if non-repeater organizer guarantees all cards answered once.', () => {
  test('not all answered once.', () => {
    const cardStatus1 = newCardStatus(newFlashCard('q1', 'a1'))
    const cardStatus2 = newCardStatus(newFlashCard('q2', 'a2'))
    cardStatus1.recordResult(false)
    const cards: CardStatus[] = [cardStatus1, cardStatus2]
    // create the sorter and call its reorganize function
    const sorter = newNonRepeatingCardOrganizer()
    const reorganized = sorter.reorganize(cards)
    // check if it only has q2
    expect(reorganized.length).toBe(1)
    expect(reorganized[0].getCard().getQuestion()).toEqual('q2')
  })
  test('all answered once.', () => {
    const cardStatus1 = newCardStatus(newFlashCard('q1', 'a1'))
    const cardStatus2 = newCardStatus(newFlashCard('q2', 'a2'))
    cardStatus1.recordResult(false)
    cardStatus2.recordResult(true)
    const cards: CardStatus[] = [cardStatus1, cardStatus2]
    // create the sorter and call its reorganize function
    const sorter = newNonRepeatingCardOrganizer()
    const reorganized = sorter.reorganize(cards)
    // check if returned array is empty
    expect(reorganized.length).toBe(0)
  })
})

// test new repeater organizer: guarantee a given number of correct answers
describe('test if all cards get answered exact number of times.', () => {
  test('not all answered required times.', () => {
    const cardStatus1 = newCardStatus(newFlashCard('q1', 'a1'))
    const cardStatus2 = newCardStatus(newFlashCard('q2', 'a2'))
    cardStatus1.recordResult(false)
    cardStatus2.recordResult(true)
    const cards: CardStatus[] = [cardStatus1, cardStatus2]
    // create the sorted and call its reorganize function
    const sorter = newRepeatingCardOrganizer(1)
    const reorganized = sorter.reorganize(cards)
    // check if q1 gets returned
    expect(reorganized.length).toBe(1)
    expect(reorganized[0].getCard().getQuestion()).toEqual('q1')
  })
  test('all answered required times.', () => {
    const cardStatus1 = newCardStatus(newFlashCard('q1', 'a1'))
    const cardStatus2 = newCardStatus(newFlashCard('q2', 'a2'))
    cardStatus1.recordResult(false)
    cardStatus1.recordResult(true)
    cardStatus2.recordResult(true)
    const cards: CardStatus[] = [cardStatus1, cardStatus2]
    // create the sorted and call its reorganize function
    const sorter = newRepeatingCardOrganizer(1)
    const reorganized = sorter.reorganize(cards)
    // check if the returned array is empty
    expect(reorganized.length).toBe(0)
  })
})
