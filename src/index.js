import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';

const SWITCH_PLAYER = 'SWITCH_PLAYER';
const MARK_BOARD = 'MARK_BOARD';
const ADD_TO_HISTORY = 'ADD_TO_HISTORY';
const INCREASE_STEP_COUNT = 'INCREASE_STEP_COUNT';
const JUMP_TO_HISTORY = 'JUMP_TO_HISTORY';

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

function addToHistory(board, stepCount){
  return {
    type: ADD_TO_HISTORY,
    board,
    stepCount
  }
}

function increaseStepCount(value){
  return {
    type: INCREASE_STEP_COUNT,
    value
  }
}

function jumpToHistory(stepCount){
  return {
    type: JUMP_TO_HISTORY,
    stepCount
  }
}

function playersTurn(player, position) {
  store.dispatch(markBoard(player, position))
  store.dispatch(increaseStepCount(1))
  store.dispatch(addToHistory(store.getState().board))
  if (calculateWinner(store.getState().board)) {
    return;
  }
  player === "🤖" ? store.dispatch(switchPlayer("👾")) : store.dispatch(switchPlayer("🤖"))
}

function jumpTo(step) {
       store.dispatch(jumpToHistory(step));
}

const initialState = {
  player: '🤖',
  board: new Array(9).fill(null),
  history: [
    {
      squares: Array(9).fill(null),
      player: '🤖',
      stepNumber: 0,
    }
  ],
  stepNumber: 0
};

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_PLAYER:
      return Object.assign({}, state, { player: action.player })
    case MARK_BOARD:
      const newBoard = state.board.slice();
      newBoard[action.position] = action.player

      return Object.assign({}, state, { board: newBoard })
    case ADD_TO_HISTORY:
      return Object.assign({}, state, { history: state.history.concat([{squares: action.board, stepNumber: store.getState().stepNumber , player: store.getState().player}])})
    case INCREASE_STEP_COUNT:
        return Object.assign({}, state, { stepNumber: state.stepNumber + 1 })
    case JUMP_TO_HISTORY:
      return Object.assign({}, state, {board: state.history[action.stepCount].squares}, { stepNumber: state.history[action.stepCount].stepNumber }, {player: state.history[action.stepCount].player})
    default:
      return state;
  }
}

const store = createStore(gameReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }


  let result = squares.every(function(i){
    return i !== null;
  });

  if(result) {
    return "No Winner";
  }

  return null;
}


class Game extends React.Component {
  handleClick(i) {
    if(store.getState().board[i] === null){
      playersTurn(store.getState().player, i)
    }
  }

  render() {
    const history = store.getState().history;
    const winner = calculateWinner(store.getState().board);

    const moves = history.map((step, move) => {
      const desc = move ? "Move #" + move : "Game start";
      return (
        <li key={move}>
          <a href ="#" onClick={() => jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + store.getState().player
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={store.getState().board}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(<Game />, document.getElementById("root"));
}

store.subscribe(render)
render()
