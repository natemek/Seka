import React, {useState, useEffect} from 'react';
import Card from './Card';
import Player from './Player';

const Board = props => {

  const [deckState, setDeckState] = useState([]);
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);

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
  
  return (
    <>
      <button onClick={() => shuffleDeck()}> S H U F F L E</button>
      <div className="grid-container">
        <div style={{backgroundColor: 'DarkGrey', display: 'flex', position: 'relative'}}>
          <div 
            style={{
              position: 'absolute', 
              top: '10%', 
              left: '50%', 
              width: '45%', 
              height: '100%', 
              transform: 'translate(-50%,-10%)', 
              backgroundColor:'CadetBlue',
              marginBottom: '100%'
            }}>
            <button onClick={() => dealHand("player1")} >D E A L</button>
            <Player name= "player1" hand= {player1}/>
          </div>
        </div>
        <div style={{backgroundColor: 'DarkGreen', position: 'relative'}}>
          2
          <div 
              style={{
                position: 'absolute', 
                top: '10%', 
                left: '50%', 
                width: '45%', 
                height: '100%', 
                transform: 'translate(-50%,-10%)', 
                marginBottom: '100%'
            }}
          >
            <Card name="card_back" rank="K" suit="❤" hidden={true}/>
          </div>
        </div>
        <div style={{backgroundColor: 'DarkGrey', position: 'relative'}}>
          <div 
              style={{
                position: 'absolute', 
                top: '10%', 
                left: '50%', 
                width: '45%', 
                height: '100%', 
                transform: 'translate(-50%,-10%)', 
                backgroundColor:'CadetBlue',
                marginBottom: '100%'
              }}>
              <button onClick={() => dealHand("player2")} >D E A L</button>
              <Player name= "player2" hand= {player2}/>
            </div>
        </div>
      </div>
    </>
  );
  
}

export default Board;