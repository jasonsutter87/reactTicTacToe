import React from 'react';
import Board from './board';
import { calculateWinner }  from '../helperFunctions/helpers';
import gameReducer from '../reducers/reducers';
import {switchPlayer, markBoard, setWinner, addToHistory, stepNumber} from '../actions/actions';
import { createStore } from 'redux';
const store = createStore(gameReducer);

console.log(store.getState());

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const step_count = store.getState()['step_num']
    // const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const history = store.getState()['history'].slice(0, step_count + 1);

    console.log(store.getState());
    // const current = history[history.length - 1];
    const current = history.length;
    console.log(current);
    // //
    // //
    // const squares = current.squares.slice();
    // // console.log(squares);
    //
    //
    // if (calculateWinner(squares) || squares[i]) {
    //   return;
    // }
    // squares[i] = this.state.xIsNext ? "🤖" : "👾";
    // // squares[i] = store.getState()['player'] ? "🤖" : "👾";
    // // console.log(squares[i]);
    if(store.getState()['player'] === "🤖"){
      store.dispatch(switchPlayer("👾"));
    } else {
      store.dispatch(switchPlayer("🤖"));
    }
    //
    // this.setState({
    //   history: history.concat([
    //     {
    //       squares: squares
    //     }
    //   ]),
    //   stepNumber: history.length,
    //   xIsNext: !this.state.xIsNext
    // });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Move #" + move : "Game start";
      return (
        <li key={move}>
          <a onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
      console.log(store.dispatch(setWinner(winner)))
      console.log(store.getState())
    } else {
      status = "Next player: " + (this.state.xIsNext ? "🤖" : "👾");
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
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



export default Game;
