export const SWITCH_PLAYER = 'SWITCH_PLAYER';
export const MARK_BOARD = 'MARK_BOARD';
export const SET_WINNER = 'SET_WINNER';
export const ADD_TO_HISTORY = 'ADD_TO_HISTORY';
export const STEP_NUMBER = 'STEP_NUMBER';

export function switchPlayer(player){
 return {
   type: SWITCH_PLAYER,
   player
 }
}

export function markBoard(player, position){
  return {
    type: MARK_BOARD,
    player,
    position
 }
}

export function setWinner(player){
  return {
    type: SET_WINNER,
    player
 }
}

export function addToHistory(move){
  return {
    type: ADD_TO_HISTORY,
    move
  }
}


export function stepNumber(step_num){
 return {
   type: STEP_NUMBER,
   step_num
 }
}
