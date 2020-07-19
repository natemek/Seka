import React from 'react';
import Card from './Card';

const DrawingDeck = (props) => {
  
  const renderDrawingDeck = () => {
    
    const ListCards = ({deck}) => (
      <div className="player">
        {deck.map((card, index) => (
          <Card 
            name={"card"} 
            key={index} 
            id={index} 
            rank={card.rank} 
            suit={card.suit}
            hidden={true}
            selected={card.selected}
            handle_card_selected={(index) => props.handle_card_selected(index)}/>
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
    <div className="drawing-deck">
      {renderDrawingDeck()}
    </div>
  )
}

export default DrawingDeck