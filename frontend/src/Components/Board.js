import React, {useState, useEffect} from 'react';
import Player from './Player';
import DrawingDeck from './DrawingDeck';
import DiscardPile from './DiscardPile';
import WelcomeModal from './WelcomeModal';

const Board = props => {

  const [deckState, setDeckState] = useState([]);
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [turn, setTurn] = useState("player1");
  const [discarded, setDiscarded] = useState([]);

  // Fisher-Yates shuffle algorithm
  const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  useEffect(() => {
    let newDeck = []
    props.ranks.forEach(r => {
      props.suits.forEach(s => {
        let card = {
          rank: r,
          suit: s,
          selected: false,
          hidden: false
        }
        newDeck.push(card)
      })
    })
    setDeckState(newDeck)
  }, [props]
  )

  // Recycle the cards when the drawing card runs out
  useEffect(() => {
    if (deckState.length === 0 && discarded.length > 0) {
      let new_discarded = [...discarded]
      let top = new_discarded.pop()
      setDeckState(shuffle(new_discarded))
      setDiscarded([top])
    }
  }, [discarded, deckState])

  const dealHand = (name) => {
    if ((name === "player1" && player1.length > 0) || (name === "player2" && player2.length > 0)) {
      return
    }
    let new_deck = [...deckState]
    shuffle(new_deck)
    console.log("Shuffled before dealt");
    let new_player = new_deck.splice(0,10)
    setDeckState(new_deck)
    if (name === "player1") {
      setPlayer1(new_player)
    } else if (name === "player2") {
      setPlayer2(new_player)
    }
  }

  const drawCard = () => {
    let new_deck = [...deckState]
    // shuffle(new_deck)
    if (turn === "player1" && player1.length === 10) {
      let p1_hand = [...player1]
      p1_hand.push(new_deck.pop())
      setPlayer1(p1_hand)
    } else if (turn === "player2" && player2.length === 10) {
      let p2_hand = [...player2]
      p2_hand.push(new_deck.pop())
      setPlayer2(p2_hand)
    } else if (player1.length !== 10 || player2.length !== 10) {
      console.log("Can't draw a card with empty hand or excess cards in hand")
    }
    setDeckState(new_deck)
  }

  const drawFromDiscarded = () => {
    let new_discarded = [...discarded]
    let playerHand = []
    if (turn === "player1" && player1.length === 10) {
      playerHand = [...player1]
      playerHand.push(new_discarded.pop())
      setPlayer1(playerHand)
    } else if (turn === "player2" && player2.length === 10) {
      playerHand = [...player2]
      playerHand.push(new_discarded.pop())
      setPlayer2(playerHand)
    } else {
      console.log("Can't draw a card with empty hand or excess cards in hand")
      return
    }
    setDiscarded(new_discarded)
  }

  const discardCard = (name, index) => {
    let new_discarded = [...discarded]
    let playerHand = []
    if (name === "player1" && turn === name) {
      playerHand = [...player1]
    } else if (name === "player2" && turn === name) {
      playerHand = [...player2]
    } else {
      console.log("It is not your turn")
      return
    }
    
    if (playerHand.length === 11) {
      let discardedCard = playerHand.splice(index,1)
      discardedCard[0].selected = false
      new_discarded.push(discardedCard[0])
    } else {
      console.log("Err: you can only discard after you draw")
      return
    }

    if (name === "player1") {
      setPlayer1(playerHand)
      setTurn("player2")
    } else if (name === "player2") {
      setPlayer2(playerHand)
      setTurn("player1")
    }
    setDiscarded(new_discarded)
  }
  
  const swapHandCards = (name, index1, index2) => {
    let playerHand = []
    if (name === "player1") {
      playerHand = [...player1]
    } else if (name === "player2") {
      playerHand = [...player2]
    }

    if (index1 < playerHand.length && index2 < playerHand.length && playerHand.length > 0) {
      let temp = playerHand[index1]
      playerHand[index1] = playerHand[index2]
      playerHand[index2] = temp
      playerHand[index1].selected = false
      playerHand[index2].selected = false
      if (name === "player1") {
        setPlayer1(playerHand)
      } else if (name === "player2") {
        setPlayer2(playerHand)
      }
    } else if (playerHand.length < 1) {
      console.log("Err: hand_count is empty")
    } else {
      console.log("Err: Cannot swap index out of bound")
    }
  }

  return (
    <>
      <WelcomeModal/>
      <div className="grid-container">
        <div className="grid-item" style={{backgroundColor: 'DarkGrey'}}>
          <button onClick={() => dealHand("player1")} >D E A L</button>
          <Player 
            name="player1" 
            hand={player1} 
            turn={turn}
            hidden={false}
            setHand={(new_hand) => setPlayer1(new_hand)}
            swapHandCards={(name, index1, index2) => swapHandCards(name, index1, index2)}
            discardCard={(name, index) => discardCard(name, index)}/>
        </div>
        <div className="grid-item" style={{backgroundColor: 'DarkGreen'}}>
          <div style={{position: 'absolute', transform: 'translateX(-50%)', height: '80%', width: '30%', left: '50%'}}>
            <DrawingDeck deck={deckState} handle_card_selected={() => drawCard()}/>
            <DiscardPile deck={discarded} handle_card_selected={() => drawFromDiscarded()}/>
          </div>
        </div>
        <div className="grid-item" style={{backgroundColor: 'DarkGrey'}}>
          <button onClick={() => dealHand("player2")} >D E A L</button>
          <Player 
            name= "player2" 
            hand= {player2} 
            turn={turn}
            hidden={true}
            setHand={(new_hand) => setPlayer2(new_hand)}
            swapHandCards={(name, index1, index2) => swapHandCards(name, index1, index2)}
            discardCard={(name, index) => discardCard(name, index)}/>
        </div>
      </div>
    </>
  );
  
}

export default Board;