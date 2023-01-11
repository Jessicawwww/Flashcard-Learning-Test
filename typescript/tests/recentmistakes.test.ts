// prioritization: recent mistakes
import { newCardStatus } from '../src/cards/cardstatus'
import { newFlashCard } from '../src/cards/flashcard'
import { newRecentMistakesFirstSorter } from '../src/ordering/prioritization/recentmistakes'

// test reorganize function: order cards based on the most recent answers
describe('test if recent moves cards with most wrong answers come first', () => {
  test('test cards with no mistakes in recent round.', () => {
    const cardStatus1 = newCardStatus(newFlashCard('q1', 'a1'))
    const cardStatus2 = newCardStatus(newFlashCard('q2', 'a2'))
    cardStatus1.recordResult(false)
    cardStatus1.recordResult(true)
    cardStatus2.recordResult(true)
    cardStatus2.recordResult(true)
    const cardStatus = [cardStatus1, cardStatus2]
    // create the sorter
    const sorter = newRecentMistakesFirstSorter()
    const reorganized = sorter.reorganize(cardStatus)
    // check if the order is still the same
    expect(reorganized.length).toBe(2)
    expect(reorganized[0].getCard().getQuestion()).toEqual('q1')
    expect(reorganized[1].getCard().getQuestion()).toEqual('q2')
  })
  test('test cards with different mistakes in recent round.', () => {
    const cardStatus1 = newCardStatus(newFlashCard('q1', 'a1'))
    const cardStatus2 = newCardStatus(newFlashCard('q2', 'a2'))
    const cardStatus3 = newCardStatus(newFlashCard('q3', 'a3'))
    cardStatus1.recordResult(true)
    cardStatus1.recordResult(false)
    cardStatus2.recordResult(true)
    cardStatus2.recordResult(true)
    cardStatus3.recordResult(false)
    cardStatus3.recordResult(false)
    const cardStatus = [cardStatus1, cardStatus2, cardStatus3]
    // create the sorter
    const sorter = newRecentMistakesFirstSorter()
    const reorganized = sorter.reorganize(cardStatus)
    // check if the order is as expected
    expect(reorganized.length).toBe(3)
    expect(reorganized[0].getCard().getQuestion()).toEqual('q1')
    expect(reorganized[1].getCard().getQuestion()).toEqual('q3')
    expect(reorganized[2].getCard().getQuestion()).toEqual('q2')
  })
})
