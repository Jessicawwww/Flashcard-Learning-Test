// cardorganizer

import { CardStatus, newCardStatus } from '../src/cards/cardstatus'
import { newFlashCard } from '../src/cards/flashcard'
import { newCombinedCardOrganizer } from '../src/ordering/cardorganizer'
import { newMostMistakesFirstSorter } from '../src/ordering/prioritization/mostmistakes'
import { newRecentMistakesFirstSorter } from '../src/ordering/prioritization/recentmistakes'
import { newNonRepeatingCardOrganizer, newRepeatingCardOrganizer } from '../src/ordering/repetition/cardrepeater'

describe('test if combined organizers works find.', () => {
  test('answered correctly once and appear as most mistakes first.', () => {
    const cardStatus1 = newCardStatus(newFlashCard('q1', 'a1'))
    const cardStatus2 = newCardStatus(newFlashCard('q2', 'a2'))
    cardStatus1.recordResult(false)
    cardStatus2.recordResult(false)
    cardStatus2.recordResult(false)
    const cards: CardStatus[] = [cardStatus1, cardStatus2]
    // create the sorted and call its reorganize function
    const sorter1 = newRepeatingCardOrganizer(1)
    const sorter2 = newMostMistakesFirstSorter()
    const combinedSorter = newCombinedCardOrganizer([sorter1, sorter2])
    const reorganized = combinedSorter.reorganize(cards)
    // check if returned as what we expected
    expect(reorganized.length).toBe(2)
    expect(reorganized[0].getCard().getQuestion()).toEqual('q2')
    expect(reorganized[1].getCard().getQuestion()).toEqual('q1')
  })
  test('answered correctly once and appear as recent mistakes first.', () => {
    const cardStatus1 = newCardStatus(newFlashCard('q1', 'a1'))
    const cardStatus2 = newCardStatus(newFlashCard('q2', 'a2'))
    const cardStatus3 = newCardStatus(newFlashCard('q3', 'a3'))
    cardStatus1.recordResult(false)
    cardStatus1.recordResult(false)
    cardStatus2.recordResult(false)
    cardStatus2.recordResult(true)
    cardStatus1.recordResult(false)
    cardStatus1.recordResult(false)
    const cards: CardStatus[] = [cardStatus1, cardStatus2, cardStatus3]
    // create the sorted and call its reorganize function
    const sorter1 = newRepeatingCardOrganizer(1)
    const sorter2 = newRecentMistakesFirstSorter()
    const combinedSorter = newCombinedCardOrganizer([sorter1, sorter2])
    const reorganized = combinedSorter.reorganize(cards)
    // check if returned as what we expected
    expect(reorganized.length).toBe(2)
    expect(reorganized[0].getCard().getQuestion()).toEqual('q1')
    expect(reorganized[1].getCard().getQuestion()).toEqual('q3')
  })
  test('repeater and non-repeater.', () => {
    const cardStatus1 = newCardStatus(newFlashCard('q1', 'a1'))
    const cardStatus2 = newCardStatus(newFlashCard('q2', 'a2'))
    cardStatus1.recordResult(false)
    cardStatus2.recordResult(false)
    cardStatus2.recordResult(true)
    const cards: CardStatus[] = [cardStatus1, cardStatus2]
    // create the sorted and call its reorganize function
    const sorter1 = newRepeatingCardOrganizer(1)
    const sorter2 = newNonRepeatingCardOrganizer()
    const combinedSorter = newCombinedCardOrganizer([sorter1, sorter2])
    const reorganized = combinedSorter.reorganize(cards)
    // check if returned as what we expected
    expect(reorganized.length).toBe(0)
  })
})
