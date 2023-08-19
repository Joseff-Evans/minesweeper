import './board.css'
import { useEffect, useState } from 'react'
import Tile from './Tile';
import { TileInterface } from './interface'

function Board({width, height, mines} : {width : number, height : number, mines : number}) {
  
  const [board, setBoard] = useState<TileInterface[][]>()
  const [minesLeft, setMinesLeft] = useState<number>(mines)
  const [winner, setWinner] = useState<boolean>()

  function resetBoard() {
    let boardArray = Array.from({length: height},
        (_,y) => Array.from({length: width},
            (_,x) => {
                return {
                    x: x,
                    y: y,
                    isMine: false,
                    state: ""
                }
            }
        )          
    )
    return boardArray
  }

  useEffect(() => {
    setBoard(resetBoard())
    setMinesLeft(mines)
  },[width, height, mines])

  return (
    <>
    <div className="topRow">
        <div>Mines Left: {minesLeft}</div>
        <div>{winner === false? "You Lose" : winner === true? "You Win" : ""}</div>
    </div>
    <div className="board">
        {board && (
            board.map((_,y) =>
                <div className="row" key={"row: " + y}>
                    {
                        board[y].map((_,x) =>
                            <Tile setGameOver={setWinner} setMinesLeft={setMinesLeft} mines={mines} width={width} height={height} x={x} y={y} board={board} setBoard={setBoard} key={"item: " + x + "," + y} />             
                        )
                    }
                </div>
            ))
        }
    </div>
    </>
  )
}

export default Board