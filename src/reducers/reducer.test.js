// import { calculateWinner }  from '../helperFunctions/helpers';

const SWITCH_PLAYER = 'SWITCH_PLAYER';
const MARK_BOARD = 'MARK_BOARD';
const SET_WINNER = 'SET_WINNER';
const ADD_TO_HISTORY = 'ADD_TO_HISTORY';

function switchPlayer(player){
 return {
   type: SWITCH_PLAYER,
   player
 }
}

function markBoard(player, position){
 return {
   type: MARK_BOARD,
   player,
   position
 }
}

function setWinner(player){
  return {
    type: SET_WINNER,
    player
 }
}

function addToHistory(player, move){
  return {
    type: ADD_TO_HISTORY,
    player,
    move
  }
}



const initialState = {
  player: '🤖',
  board: new Array(9).fill(null),
  winner: null,
  history: []
};

function game(state = initialState, action) {
  switch (action.type) {
    case SWITCH_PLAYER:
      return Object.assign({}, state, { player: action.player })
    case MARK_BOARD:
      const newBoard = state.board.slice();
      newBoard[action.position] = action.player

      return Object.assign({}, state, { board: newBoard })
    case SET_WINNER:
      return Object.assign({}, state, { winner: action.player })
    case ADD_TO_HISTORY:
      const newHistory = state.history.slice();
      newHistory.push([action.player, action.move]);

      return Object.assign({}, state, { history: newHistory })
    default:
      return state;
  }
}


describe('Game reducer', () => {
  it('Returns the state with the player updated', () => {
    expect(game(initialState, switchPlayer('👾'))).toEqual(
      {
        player: '👾',
        board: new Array(9).fill(null),
        winner: null,
        history: []
      }
    )
  })

  it('Returns the state with the player updated', () => {
    let state = {
           player: '🤖',
           board: new Array(9).fill(null),
           winner: null,
           history: []
    }
    state = game(state, switchPlayer('👾'));
    state = Object.assign({}, state, game(state, markBoard('🤖', 0)));
    expect(game(state, addToHistory('🤖', 0 ))).toEqual(
      {
            player: '👾',
            board: ["🤖", null, null, null, null, null, null, null, null],
            winner: null,
            history: [
              ['🤖', 0 ]
            ]
          }

    )
  })

  it('Returns the state with the player updated', () => {
    let state = {
           player: '🤖',
           board: new Array(9).fill(null),
           winner: null,
           history: []
    }
    state = game(state, switchPlayer('👾'));
    state = Object.assign({}, state, game(state, markBoard('🤖', 0)));
    state = Object.assign({}, state, game(state, addToHistory('🤖', 0)));

    state = game(state, switchPlayer('🤖'));
    state = Object.assign({}, state, game(state, markBoard('👾', 4)));
    expect(game(state, addToHistory('👾', 4 ))).toEqual(
      {
            player: '🤖',
            board: ['🤖', null, null, null, '👾', null, null, null, null],
            winner: null,
            history: [
              ['🤖', 0 ],
              ['👾', 4 ],
            ]
          }

    )
  })
})
