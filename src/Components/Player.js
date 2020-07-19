import React, {useState, useEffect} from 'react';
import Card from './Card';

const Player = props => {
  const [hand, setHand] = useState([])
  const [selectedCards, setSelectedCards] = useState([])

  const [animatationState, setAminationState] = useState("none")

  // acts like component did mount to re-render 
  useEffect(() => {
    setHand(props.hand)
    setSelectedCards([])
  }, [props.hand])

  useEffect(() => {
    const swap_cards = () => {
      if (selectedCards.length === 2) {
        let i = hand.indexOf(selectedCards[0]) 
        let j = hand.indexOf(selectedCards[1])
        if (i < hand.length && j < hand.length && hand.length > 0) {
          let new_hand = [...hand]
          let temp = new_hand[i]
          new_hand[i] = new_hand[j]
          new_hand[j] = temp
          new_hand[i].selected = false
          new_hand[j].selected = false
          setSelectedCards([])
          setHand(new_hand)
        } else if (hand.length < 1) {
          console.log("Err: hand_count is empty")
        } else {
          console.log("Err: Cannot swap index out of bound")
        }
      } else {
        console.log("Err: Select two cards before swapping")
      }
    }
    if (selectedCards.length === 2) {
      swap_cards(hand.indexOf(selectedCards[0]), hand.indexOf(selectedCards[1]))
    }
  }, [selectedCards])

  // This func will be used for rearragnging player's hand
  const handle_card_selected = (index) => {
    let new_hand = [...hand]
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
    setHand(new_hand)
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
        <ListCards hand={hand} />
      </>
    );
  }

  // calls the discard method from Board
  const handleDiscard = () => {
    if ((props.turn === props.name) && (selectedCards.length === 1)) {
      let new_hand = [...hand]
      let index = new_hand.indexOf(selectedCards[0])
      let removedCard = new_hand.splice(index,1)
      setSelectedCards([])
    } else {
      console.log("Err: you cannot discard when its not your turn or when you selected multiple cards")
    }
  }

  return (
    <>
      <button onClick={() => {console.log("Discard clicked")}}> D I S C A R D</button>
      {props.name}
      {renderHand()}
    </>
  );
}

export default Player;