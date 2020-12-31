# Seka

## Local Start Up Guide

1. clone repository
2. cd Seka/frontend
3. `npm install`
4. `npm start`

## Progress

### Stage  3: Socket

- **on connection** welcome Seka
- **on connection** add to available players
- When availble players becomes 2, queue up the game
- **on gameStarted** server: send deck and dealt playing card | client: take cards and set as player deck and draying deck
- **on turn** server: send either player1 or player2 | client: set the turn hook accordingly

### Stage 2

- [ ] Add a modal in the beginning that asks for player name
- [ ] After the user entered the player name, another pop up with players online to send a request to play together

### Stage 1

- [x] Spread hand view css
- [ ] Add appropriate grid for board
  - [x] Use a placeholder grid
- [ ] Adding a swap functionality to rearrange cards on hand  
  - [x] Add card pop up feature when clicked
  - [x] Swap two cards when clicked
  - [ ] Add animation
    - [x] Keyframes added for popup, popdown and deal-hand
    - [x] Animation state created in player
    - [ ] Fix animation to conditionally render (ex: adding deal-hand animation will animate everytime a hand renders)
- [x] Adding a Deck in the middle
  - [x] Figure out the data structure
  - [x] Add drawing a card functionality
  - [x] Add a discarded pile
  - [ ] Add animation for drawing the card
- [x] Adding a backface for the cards  
  1. get the design
  2. add it to hide the opponent hand
- [ ] Add a combination checker
  - [x] Add checkTris
  - [x] Add checkQuatris
  - [ ] Improve check function performance
- [ ] Deal the result once a player successfully goes out
  - [ ] Hide the hand of winner player
  - [ ] Create a component that overlaps player that shows the winning combination
  - [ ] Add a conffetti display
  - [ ] Add a reset and restart buttons
- [x] Add a turn checker
  - [x] Add a state to keep track of the players turn
  - [x] Add a display to show whose turn

## Suggetions

- [x] Change the board deck ds from 2d array to arr of card objects
- [x] Remove player hand state and use props
- [x] Change the ranks to numbers and the suits to letters
