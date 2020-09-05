import React, {useState, useEffect} from 'react';
import Card from './Card';

const Player = props => {
  // const [hand, setHand] = useState([])
  const [selectedCards, setSelectedCards] = useState([])

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
  }, [selectedCards, props])

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

  const handleGoingOut = () => {
    let handCopy = [...props.hand]
    let quatris = []
    let tris = []
    // check quatris
    checkQuatris(handCopy, quatris)
    // check tris
    checkTris(handCopy, tris)
    // check if one card remaining and discard it
    // WIN conffetti and reset game
    console.log("+++++++++++++++\n")
    console.log("tris:", tris)
    console.log("quatris", quatris)
    console.log("discard:", handCopy)
  }

  const checkQuatris = (handCopy, quatris) => {
    let indexToRemove = []
    console.log("Checking Quatris...")
    for (let i = 0; i < handCopy.length && !(quatris.length); i++) { //  && !(quatris.length) => check if one quatris is found and return
      for (let j = i+1; j < handCopy.length && !(quatris.length); j++) {
        for (let k = j+1; k < handCopy.length && !(quatris.length); k++) {
          for (let l = k+1; l < handCopy.length && !(quatris.length); l++) {
            let suits = [handCopy[i].suit, handCopy[j].suit, handCopy[k].suit, handCopy[l].suit]
            if ((handCopy[i].rank === handCopy[j].rank) && (handCopy[j].rank === handCopy[k].rank) && 
                  (handCopy[k].rank === handCopy[l].rank)) {
              if (suits.indexOf('s') !== -1 &&
                  suits.indexOf('d') !== -1 &&
                  suits.indexOf('c') !== -1 &&
                  suits.indexOf('h') !== -1) {
                    quatris.push([handCopy[i], handCopy[j], handCopy[k], handCopy[l]])
                    indexToRemove.push(i,j,k,l)
              }
            } else if (suits.every((i => i === suits[0]))) {
              let ranks = [handCopy[i].rank, handCopy[j].rank, handCopy[k].rank, handCopy[l].rank]
              ranks.sort((a,b) => (a > b) ? 1 : -1)
              // console.log(ranks)
              if ((ranks[0] + 1 === ranks[1]) && (ranks[1] + 1 === ranks[2]) && (ranks[2] + 1 === ranks[3])) {
                quatris.push([handCopy[i], handCopy[j], handCopy[k], handCopy[l]])
                indexToRemove.push(i,j,k,l)
                break;
              }
            }
          }
        }
      }
    }

    // remove the elms from array
    for (let i = indexToRemove.length - 1; i >= 0; i--) {
      handCopy.splice(indexToRemove[i],1)
    }

    console.log(quatris)
    console.log(handCopy)
  }

  const checkTris = (handCopy, tris) => {
    let indexToRemove = []
    console.log("Checking Tris...")
    for (let i = 0; i < handCopy.length; i++) {
      for (let j = i+1; j < handCopy.length; j++) {
        for (let k = j+1; k < handCopy.length; k++) {
          if ((handCopy[i].rank === handCopy[j].rank) && (handCopy[j].rank === handCopy[k].rank)) {
            if ((handCopy[i].suit !== handCopy[j].suit) && 
                (handCopy[i].suit !== handCopy[k].suit) && 
                (handCopy[j].suit !== handCopy[k].suit)) {
                  tris.push([handCopy[i], handCopy[j], handCopy[k]])
                  indexToRemove.push(i,j,k)
            }
          } else if ((handCopy[i].suit === handCopy[j].suit) && (handCopy[j].suit === handCopy[k].suit)) {
            let ranks = [handCopy[i], handCopy[j], handCopy[k]]
            ranks.sort((a,b) => (a.rank > b.rank) ? 1 : -1)
            if ((ranks[0].rank + 1 === ranks[1].rank) && (ranks[1].rank + 1 === ranks[2].rank)) {
              tris.push([handCopy[i], handCopy[j], handCopy[k]])
              indexToRemove.push(i,j,k)
            }
          }
        }
      }
    }

    // remove the elms from array
    for (let i = indexToRemove.length - 1; i >= 0; i--) {
      handCopy.splice(indexToRemove[i],1)
    }

    console.log(tris)
    console.log(handCopy)
  }

  const check_turn = () => {
    if (props.turn === props.name) {
      return "#dc5331"
    }
  }

  return (
    <div className="player-board" style={{borderColor: check_turn()}}>
      <button onClick={() => handleDiscard()}> D I S C A R D</button>
      <button onClick={() => handleGoingOut()}>G O I N G - O U T</button>
      {props.name}
      {renderHand()}
    </div>
  );
}

export default Player;