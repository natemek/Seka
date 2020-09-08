import React from 'react';

const WelcomeModal = props => {
  return (
    <div id="id01" class="modal">
      <header class="modal-header"> 
        <h2>SEKA MULTIPLAYER</h2>
      </header>
      <div class="modal-container">
      <form action="">
        <label for="fname">player name:</label>
        <input type="text" id="pname" name="pname"/>
      </form>
      </div>
    </div>
  );
}

export default WelcomeModal;