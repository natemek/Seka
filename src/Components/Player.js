import React, {useState, useEffect} from 'react';
import Card from './Card';

const Player = props => {
  // const [hand, setHand] = useState([])
  const [selectedCards, setSelectedCards] = useState([])

  const [animatationState, setAminationState] = useState("none")

  // acts like component did mount to re-render 
  // useEffect(() => {
  //   setHand(props.hand)
  //   setSelectedCards([])
  // }, [props.hand])

  useEffect(() => {
    if (selectedCards.length === 2) {
      props.swapHandCards(props.name, props.hand.indexOf(selectedCards[0]), props.hand.indexOf(selectedCards[1]))
      setSelectedCards([])
    }
  }, [selectedCards])

  // This func will be used for rearragnging player's hand
  const handle_card_selected = (index) => {
    let new_hand = [...props.hand]
    let new_selected_cards = [...selectedCards]

    if (new_hand[index].selected === false) {
      new_hand[index].selected = true
      new_selected_cards.push(new_hand[index])
    } else {
      new_hand[index].selected = false
      new_selected_cards.forEach(card => {
        if (card.rank === new_hand[index].rank && card.suit === new_hand[index].suit) {
          new_selected_cards.splice(new_selected_cards.indexOf(card), 1)
        }
      });
    }
    props.setHand(new_hand)
    setSelectedCards(new_selected_cards)
  }

  const renderHand = () => {
    
    const ListCards = ({hand}) => (
      <div className="player">
        {hand.map((card, index) => (
          <Card 
            name={"card"}  
            rot={((index+1)/hand.length)} //rot is used to calulate the rotation of a card in hand
            key={index} 
            id={index} 
            rank={card.rank} 
            suit={card.suit}
            hidden={card.hidden}
            selected={card.selected}
            animate={animatationState}
            handle_card_selected={(index) => handle_card_selected(index)}/>
        ))}
      </div>
    );
    return (
      <>
        <ListCards hand={props.hand} />
      </>
    );
  }

  // calls the discard method from Board
  const handleDiscard = () => {
    if ((props.turn === props.name) && (selectedCards.length === 1)) {
      let index = props.hand.indexOf(selectedCards[0])
      setSelectedCards([])
      props.discardCard(props.name, index)
    } else if (props.turn !== props.name) {
      console.log("Err: wait for your turn before discarding")
    } else if (selectedCards.length !== 1) {
      console.log("Err: you haven't selected a card or have selected multiple cards")
    }
  }

  const check_turn = () => {
    if (props.turn === props.name) {
      return "#dc5331"
    }
  }

  return (
    <div className="player-board" style={{borderColor: check_turn()}}>
      <button onClick={() => handleDiscard()}> D I S C A R D</button>
      {props.name}
      {renderHand()}
    </div>
  );
}

export default Player;