import React, {useState} from 'react';
import Board from './Board';

const Game = () => {

  const [gameState] = useState({
    squares: Array(9).fill("K"),
    suits: ["d", "c", "h", "s"],
    ranks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  })

  return (
    <div className="parent-div" style={{height: '98vh', width: '98vw', position: 'relative'}}>
      <Board suits= {gameState.suits} ranks= {gameState.ranks}/>
      
    </div>
  );
  
}

export default Game;