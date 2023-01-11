import { newCardStatus } from '../src/cards/cardstatus'
import { newFlashCard } from '../src/cards/flashcard'

// cards: card status
// test function: record result
describe('check whether recordResult successfully updates. ', () => {
/**
    * this function is supposd to update the recent answering outcome (true/false)
    */
  test('update true result', () => {
    const flashCard = newFlashCard('q1', 'a1')
    const cardStatus = newCardStatus(flashCard)
    cardStatus.recordResult(true)
    const successes: boolean[] = cardStatus.getResults()
    expect(successes[successes.length - 1]).toBeTruthy()
  })
  test('update false result', () => {
    const flashCard = newFlashCard('q1', 'a1')
    const cardStatus = newCardStatus(flashCard)
    cardStatus.recordResult(false)
    const successes: boolean[] = cardStatus.getResults()
    expect(successes[successes.length - 1]).toBeFalsy()
  })
})
// test function: clear result
describe('test if the past answering results get successfully reset.', () => {
/**
 * check if all answering results are cleared.
 */
  test('clear results for flashcard answered only once.', () => {
    const flashCard = newFlashCard('q1', 'a1')
    const cardStatus = newCardStatus(flashCard)
    cardStatus.recordResult(true)
    cardStatus.clearResults()
    expect(cardStatus.getResults().length).toBe(0)
  })
  test('clear results for flashcard answered more than once.', () => {
    const flashCard = newFlashCard('q1', 'a1')
    const cardStatus = newCardStatus(flashCard)
    cardStatus.recordResult(true)
    cardStatus.recordResult(false)
    cardStatus.clearResults()
    expect(cardStatus.getResults().length).toBe(0)
  })
  test('clear results for flashcard that never got learned', () => {
    const flashCard = newFlashCard('q1', 'a1')
    const cardStatus = newCardStatus(flashCard)
    cardStatus.clearResults()
    expect(cardStatus.getResults().length).toBe(0)
  })
})
