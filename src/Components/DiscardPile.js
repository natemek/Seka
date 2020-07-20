import React from 'react';
import Card from './Card';

const DiscardPile = (props) => {

  const handle_card_selected = () => {
    return console.log("Discard Card Selected")
  }

  const renderDiscardPile = () => {
    
    const ListCards = ({deck}) => (
      <div className="middle-card">
        {deck.map((card, index) => (
          <Card 
            name={"card"}
            key={index} 
            id={index} 
            rank={card.rank} 
            suit={card.suit}
            hidden={false}
            selected={card.selected}
            handle_card_selected={(index) => handle_card_selected(index)}/>
        ))}
      </div>
    );
    return (
      <>
        <ListCards deck={props.deck} />
      </>
    );
  }

  return(
    <div className="discard-deck">
      {renderDiscardPile()}
    </div>
  )
}

export default DiscardPile