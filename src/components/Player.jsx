import React, { useState } from 'react'

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing]= useState(false)
    const [playerName, setPlayerName]= useState(initialName)
    function handleClick(){
        setIsEditing(isEditing => !isEditing)
      if(isEditing){
          onChangeName(symbol, playerName)
      }
    }

    function handleText(event){
        setPlayerName(event.target.value)

    }
    let editablePlayerName =   <span className="player-name">{playerName}</span>
    if (isEditing){
        editablePlayerName = <input type="text" value={playerName} required onChange={handleText} />
    }
  return (
    <li className={isActive? 'active': undefined}>
        <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{isEditing? 'Save':'Edit'}</button></li>
  )
}
