import React, { useState } from "react";

import "../Game.css";

import Header from "./Header";
import Footer from "./Footer";
import GameCircle from "./GameCircle";


import { isDraw, isWinner, getComputerMove } from "../helper";
import {
    GAME_STATE_PLAYING,
    GAME_STATE_WIN,
    NO_PLAYER,
    PLAYER_1,
    PLAYER_2,
    NO_CIRCLES,
    GAME_STATE_DRAW,
} from "../Constants";

const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);
// const board=[...gameBoard];  // we are copying the gameBoard array to another array for the change of state
    // board[id]=currentPlayer;
    // setGameBoard(board);


    const initGame = () => {
        setCurrentPlayer(PLAYER_1);
        setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
        setGameState(GAME_STATE_PLAYING);
    }

    const initBoard = () => {
      const circles = [];

      for (let i = 0; i < NO_CIRCLES; i++) {
          circles.push(renderCircle(i));
      }
      return circles;
  };

  const circleClicked = (id) => {
      console.log("circle clicked:" + id);

      if (gameBoard[id] !== NO_PLAYER) return;
      if (gameState !== GAME_STATE_PLAYING) return;

      if (isWinner(gameBoard, id, currentPlayer)) {
          setGameState(GAME_STATE_WIN);
          setWinPlayer(currentPlayer);
      }
      if (isDraw(gameBoard, id, currentPlayer)) {
          setGameState(GAME_STATE_DRAW);
          setWinPlayer(NO_PLAYER);
      }


    setGameBoard(prev => {     //we are doing the same operation as done above but using map function
      return prev.map((circle, pos) => {    // here "circle" is the array and "pos" is the index in the array
        if (pos === id) return currentPlayer;
        return circle;
      })
    })

    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1); // to toggle between player 1 and player 2
    console.log(gameBoard);
    console.log(currentPlayer);
  }


  const renderCircle = (id) => {
    return (
        <GameCircle
            key={id}
            id={id}
            className={`player_${gameBoard[id]}`}
            onCircleClicked={circleClicked}
        />
    );
};

const onSuggestClick = () => {
    circleClicked(getComputerMove(gameBoard));
}

const onNewGameClick = () => {
    initGame();
}

return (
    <>
        <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
        <div className="gameBoard">{initBoard()}</div>
        <Footer onSuggestClick={onSuggestClick} onNewGameClick={onNewGameClick} gameState={gameState}/>
    </>
);
};

export default GameBoard;
