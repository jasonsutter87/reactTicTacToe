import {
  SWITCH_PLAYER,
  MARK_BOARD,
  SET_WINNER,
  ADD_TO_HISTORY
} from  '../actions/actions';


const initialState = {
  player: '🤖',
  board: new Array(9).fill(null),
  history: []
};

function gameReducer(state = initialState, action) {
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

export default gameReducer;
