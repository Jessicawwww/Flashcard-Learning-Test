import { newFlashCard } from '../src/cards/flashcard'

// cards: flashcard
// test check success function:
describe('check whether provided answer eqauls the correct one: ', () => {
/**
     * this function should ignore capitalization and whitespaces issues.
     */
  test('answer format 1: a1', () => {
    const flashCard = newFlashCard('q1', 'a1')
    expect(flashCard.checkSuccess('a1')).toBeTruthy()
  })
  test('answer format 2: a 1', () => {
    const flashCard = newFlashCard('q1', 'a1')
    expect(flashCard.checkSuccess('a 1')).toBeFalsy()
  })
  test('answer format 3: a1 ', () => {
    const flashCard = newFlashCard('q1', 'a1')
    expect(flashCard.checkSuccess('A1 ')).toBeTruthy()
  })
  test('wrong answer: a2 ', () => {
    const flashCard = newFlashCard('q1', 'a1')
    expect(flashCard.checkSuccess('a2')).toBeFalsy()
  })
})
