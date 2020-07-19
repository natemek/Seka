import React, {useState, useEffect} from 'react';
import Player from './Player';
import DrawingDeck from './DrawingDeck';

const Board = props => {

  const [deckState, setDeckState] = useState([]);
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [turn, setTurn] = useState("player1")
  const [discarded, setDiscarded] = useState([])


  const shuffleDeck = () => {
    let newDeck = [...deckState]
    newDeck = shuffle(newDeck)
    console.log("Shuffled")
    setDeckState(newDeck)
  }

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
        newDeck = [...newDeck, [r,s]]
      })
    })
    setDeckState(newDeck)
  }, [props]
  )

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
    shuffle(new_deck)
    if (turn === "player1" && player1.length > 0) {
      let p1_hand = [...player1]
      p1_hand.push(new_deck.pop())
      setPlayer1(p1_hand)
    } else if (turn === "player2" && player2.length > 0) {
      let p2_hand = [...player2]
      p2_hand.push(new_deck.pop())
      setPlayer2(p2_hand)
    } else if (player1.length === 0 || player2.length === 0) {
      console.log("Can't draw a card with empty hand")
    }
    setDeckState(new_deck)
  }

  const discardCard = (index) => {
    let new_discarded = [...discarded]
    if (turn === "player1") {
      let p1_hand = [...player1]
      let discardedCard = p1_hand.splice(index,1)
      new_discarded.push(discardedCard)
      setPlayer1(p1_hand)
      setTurn("player2")
    } else if (turn === "player2") {
      let p2_hand = [...player2]
      let discardedCard = p2_hand.splice(index,1)
      new_discarded.push(discardedCard)
      setPlayer2(p2_hand)
      setTurn("player1")
    }
    setDiscarded(new_discarded)
  }
  
  return (
    <>
      <button onClick={() => shuffleDeck()}> S H U F F L E</button>
      <div className="grid-container">
        <div className="grid-item" style={{backgroundColor: 'DarkGrey'}}>
          <div className="player-board">
            <button onClick={() => dealHand("player1")} >D E A L</button>
            <Player 
              name="player1" 
              hand={player1} 
              turn={turn}
              discardCard={(index) => discardCard(index)}/>
          </div>
        </div>
        <div className="grid-item" style={{backgroundColor: 'DarkGreen'}}>
          2
          <div >
            {/* <Card name="card_back" rank="K" suit="❤" hidden={true}/> */}
            <DrawingDeck deck= {deckState} handle_card_selected={() => drawCard()}/>
          </div>
        </div>
        <div className="grid-item" style={{backgroundColor: 'DarkGrey'}}>
          <div className="player-board">
              <button onClick={() => dealHand("player2")} >D E A L</button>
              <Player 
                name= "player2" 
                hand= {player2} 
                turn={turn}
                discardCard={(index) => discardCard(index)}/>
            </div>
        </div>
      </div>
    </>
  );
  
}

export default Board;