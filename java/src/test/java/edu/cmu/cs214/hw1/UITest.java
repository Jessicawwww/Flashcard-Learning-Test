package edu.cmu.cs214.hw1;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import edu.cmu.cs214.hw1.cards.FlashCard;
import edu.cmu.cs214.hw1.ordering.CardDeck;
import edu.cmu.cs214.hw1.ordering.CardOrganizer;
import edu.cmu.cs214.hw1.ordering.CombinedCardOrganizer;
import edu.cmu.cs214.hw1.ordering.prioritization.MostMistakesFirstSorter;
import edu.cmu.cs214.hw1.ordering.prioritization.RecentMistakesFirstSorter;
import edu.cmu.cs214.hw1.ordering.repetition.NonRepeatingCardOrganizer;
import edu.cmu.cs214.hw1.ordering.repetition.RepeatingCardOrganizer;
import edu.cmu.cs214.hw1.cli.*;
/**
 * this class is for testing {@link UI} 
 */
public class UITest {
    private FlashCard flashCard1, flashCard2, flashCard3;
    private List<FlashCard> cards;
    private CardOrganizer cardOrganizer1, cardOrganizer2, cardOrganizer3, cardOrganizer4;
    private List<CardOrganizer> cardOrganizers1, cardOrganizers2;
    private CardDeck cardDeck1, cardDeck2, cardDeck3, cardDeck4;
    /**
     * build a scanner for testing each function, called before each test
     */
    @Before
    public void setUp() {
        flashCard1 = new FlashCard("q1", "a1");
        flashCard2 = new FlashCard("q2", "a2");
        flashCard3 = new FlashCard("q3", "a3");
        cards = new ArrayList<>();
        cards.add(flashCard1);
        cards.add(flashCard2);
        cards.add(flashCard3);

        cardOrganizer1 = new NonRepeatingCardOrganizer();
        cardOrganizer2 = new MostMistakesFirstSorter();
        cardOrganizer3 = new RepeatingCardOrganizer(2);
        cardOrganizer4 = new RecentMistakesFirstSorter();
        
        cardOrganizers1 = new ArrayList<>();
        cardOrganizers1.add(cardOrganizer3);
        cardOrganizers1.add(cardOrganizer2);

        cardOrganizers2 = new ArrayList<>();
        cardOrganizers2.add(cardOrganizer3);
        cardOrganizers2.add(cardOrganizer4);

        cardDeck1 = new CardDeck(cards, cardOrganizer1);
        cardDeck2 = new CardDeck(cards, cardOrganizer2);

        cardDeck3 = new CardDeck(cards, new CombinedCardOrganizer(cardOrganizers1)); //repeat once and most mistakes
        cardDeck4 = new CardDeck(cards, new CombinedCardOrganizer(cardOrganizers2)); //repeat once and recent mistakes
    }

    @Test
    public void testCueCardTrue() {
        String data = "a1\r\n";
        InputStream stdin = System.in;
        try {
            System.setIn(new ByteArrayInputStream(data.getBytes()));
            Scanner scanner = new Scanner(System.in);
            //System.out.println(scanner.nextLine());
            UI ui = new UI();
            assertTrue(ui.cueCard(flashCard1, scanner));
            scanner.close();
        } finally {
            System.setIn(stdin);
        }
    }
    @Test
    public void testCueCardFalse() {
        String data = "a2\r\n";
        InputStream stdin = System.in;
        try {
            System.setIn(new ByteArrayInputStream(data.getBytes()));
            Scanner scanner = new Scanner(System.in);
            UI ui = new UI();
            assertFalse(ui.cueCard(flashCard1, scanner));
            //System.out.println(scanner.nextLine());
            scanner.close();
        } finally {
            System.setIn(stdin);
        }
    }
    @Test
    public void testCueAllCards1() {
        String data = "a1\r\na2\r\na3\r\n";
        InputStream stdin = System.in;
        try {
            System.setIn(new ByteArrayInputStream(data.getBytes()));
            Scanner scanner = new Scanner(System.in);
            // System.out.println(scanner.nextLine());
            UI ui = new UI();
            ui.cueAllCards(cardDeck1, scanner);

            assertTrue(cardDeck1.getCards().get(0).getResults().get(0));
            assertTrue(cardDeck1.getCards().get(1).getResults().get(0));
            assertTrue(cardDeck1.getCards().get(2).getResults().get(0));
            scanner.close();
        } finally {
            System.setIn(stdin);
        }
    }
    @Test
    public void testCueAllCards2() {
        String data = "a1\r\na2\r\na2\r\n";
        InputStream stdin = System.in;
        try {
            System.setIn(new ByteArrayInputStream(data.getBytes()));
            Scanner scanner = new Scanner(System.in);
            // System.out.println(scanner.nextLine());
            UI ui = new UI();
            ui.cueAllCards(cardDeck2, scanner);

            assertTrue(cardDeck2.getCards().get(0).getResults().get(0));
            assertTrue(cardDeck2.getCards().get(1).getResults().get(0));
            assertFalse(cardDeck2.getCards().get(2).getResults().get(0));
            scanner.close();
        } finally {
            System.setIn(stdin);
        }
    }

    @Test
    public void testStudyCardsComplete() {
        String data = "a1\r\na2\r\na2\r\n";
        InputStream stdin = System.in;
        try {
            System.setIn(new ByteArrayInputStream(data.getBytes()));
            Scanner scanner = new Scanner(System.in);
            //System.out.println(scanner.nextLine());
            UI ui = new UI();
            ui.studyCards(cardDeck1);
            assertEquals(0, cardDeck1.countCards());
            scanner.close();
        } finally {
            System.setIn(stdin);
        }
        
        
    }  

    @Test
    public void testStudyCardsComplete3() {
        // answer right twice and order in most mistakes
        String data = "a1\r\nx1\r\nx1\r\na2\r\nx2\r\nx2\r\nx1\r\nx1\r\na1\r\na3\r\na2\r\na3\r\n";
        InputStream stdin = System.in;
        try {
            System.setIn(new ByteArrayInputStream(data.getBytes()));
            Scanner scanner = new Scanner(System.in);
            UI ui = new UI();
            ui.studyCards(cardDeck3);
            assertEquals(0, cardDeck3.countCards());
            scanner.close();
        } finally {
            System.setIn(stdin);
        }
    } 

    @Test
    public void testStudyCardsComplete4() {
        // answer right twice and order in recent mistakes
        String data = "a1\r\nx1\r\nx1\r\na2\r\nx2\r\nx2\r\nx1\r\na1\r\nx1\r\na3\r\na2\r\na3\r\n";
        InputStream stdin = System.in;
        try {
            System.setIn(new ByteArrayInputStream(data.getBytes()));
            Scanner scanner = new Scanner(System.in);
            UI ui = new UI();
            ui.studyCards(cardDeck4);
            assertEquals(0, cardDeck4.countCards());
            scanner.close();
        } finally {
            System.setIn(stdin);
        }
    } 
}




