import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./components/winning_Combination"
import GameOver from "./components/GameOver"

const PLAYERS ={
  X : 'Player 1', 
  O : 'Player 2'
}
const initial_Game_Board=[
    [null, null, null],
     [null, null, null],
      [null, null, null]

]
function derivedActivePlayer(gameTurns){
   let currentPlayer ="X"
      if ( gameTurns.length > 0 && gameTurns[0].player ==="X"){
        currentPlayer='O'
      }
      return currentPlayer

}
function deriveGameBoard(gameTurns){
  let gameBoard = [...initial_Game_Board.map(array=> [...array])]
    for(const turn of gameTurns){
        const {square, player} = turn
        const {row, col} = square
        gameBoard[row][col]= player
    }
    return gameBoard

}
function deriveWinner(gameBoard, players){
   let winner = null
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol =  gameBoard[combination[2].row][combination[2].column]
      if(firstSquareSymbol && firstSquareSymbol ===secondSquareSymbol && firstSquareSymbol &&thirdSquareSymbol){
 winner = players[firstSquareSymbol]
      }      
  }
  return winner
}
function App() {
 // const [activePlayer, setActivePlayer]= useState('X')
  const[gameTurns, setGameTurns]=useState([]) // first
  const [players, setPlayers]= useState(PLAYERS)
  
  const activePlayer = derivedActivePlayer(gameTurns)
  const gameBoard = deriveGameBoard(gameTurns)
  
   const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurns.length === 9 && !winner
  function handleSelectSquare(rowIndex, colIndex){
   // setActivePlayer((curActivePlayer)=> curActivePlayer === 'X'? 'O': 'X')
    setGameTurns((prevTurns) => {
     const currentPlayer = derivedActivePlayer(prevTurns)
      const updatedTurns = [{square : {row: rowIndex, col: colIndex}, player : currentPlayer },...prevTurns]
       return updatedTurns
    })
   
  }
  function handleRestart(){
    setGameTurns([])
  }
  function handlePlayerName(symbol, newName){
    setPlayers(prevPlayers=>{
      return {
        ...prevPlayers,
        [symbol]:newName
      }
    })

  }

  return (
   <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        
        <Player initialName={PLAYERS.X} symbol="X"  isActive={activePlayer==='X'} 
        onChangeName={handlePlayerName}/>
         <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer==='O'}
          onChangeName={handlePlayerName} />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner}  onRestart={handleRestart}/>}
     <GameBoard  onSelectSquare={handleSelectSquare} board={gameBoard} />
      
    </div>
    <Log turns={gameTurns}/>
    
   </main>
  )
}

export default App
