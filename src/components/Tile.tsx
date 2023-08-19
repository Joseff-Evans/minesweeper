import { TileInterface } from './interface'
import './Tile.css'

function Tile({winner, setGameOver, setMinesLeft, mines, width, height, x , y , board, setBoard} : {winner : boolean | undefined, mines : number, width : number, height: number, x : number, y : number, board : TileInterface[][], setBoard : Function, setMinesLeft : Function, setGameOver : Function}) {
    
    const thisTile = board[y][x]

    function Flag(e : any) {
        e.preventDefault();

        if (e.button === 1 || (thisTile.state !== "" && thisTile.state !== "flagged")) return

        let tempboard = [...board]

        tempboard[y][x]['state'] = thisTile['state'] === "flagged" ? "" : "flagged"

        setBoard(tempboard)
        countMinesLeft()
    }

    function Select() {

        if( thisTile.state !== "" ) return

        let tempBoard = [...board]

        if( thisTile.isMine ) {
            thisTile.state = "mine active"
            tempBoard[y][x] = thisTile

            tempBoard = revealBoard(tempBoard)

            setBoard(tempBoard)
            setGameOver(false)
            return
        }

        const mines = board.filter(
            (row) => row.filter(
                (item) => item.isMine
            ).length
        ).length
    
        if( mines === 0 ) {
            tempBoard = placeMines(tempBoard)
        }

        selectTile(tempBoard, x, y)

    }

    function selectTile (board : TileInterface[][],x : number ,y : number) {

        let tempTile = board[y][x]
        tempTile.state = "number"
        board[y][x] = tempTile

        let nearby = getNearbyTiles(x,y)
        const currentMines = nearby.filter(tile => tile.isMine)

        nearby = nearby.filter(tile => tile.state === "")

        if ( currentMines.length === 0) {
            nearby.forEach(item => selectTile(board,item.x,item.y))
        }

        if( countTilesCleared() === (width*height)-mines ) {
            setGameOver(true)
            board = revealBoard(board)
        }

        setBoard(board)
    }

    function placeMines(board : TileInterface[][]) {

        let tempBoard = board
    
        let placedMines = Array.from(Array(width*height).keys());

        for(let xMin = x === 0 ? 0 : -1; xMin <= (x === width-1 ? 0 : 1); xMin++){
            for(let yMin = y === 0 ? 0 : -1; yMin <= (y === height-1 ? 0 : 1); yMin++){
                if( (x+(y*width)+(yMin*width)+xMin) >= 0 ) placedMines.splice(placedMines.indexOf(x+(y*width)+(yMin*width)+xMin),1)
            }
        }

        placedMines = placedMines.sort(() => Math.random() - 0.5).slice(0, mines)
    
        for(let i = 0; i < placedMines.length; i++) {
            tempBoard[Math.floor(placedMines[i]/width)][placedMines[i]%width]['isMine'] = true
        }
    
        return tempBoard

      }

    function countMinesLeft () {

        const countMarked = board.reduce((count, row) => {
            return count + (row.filter(tile => tile.state === "flagged").length)
        }, 0)

        setMinesLeft(mines - countMarked)
    }

    function countTilesCleared () {

        const countMarked = board.reduce((count, row) => {
            return count + (row.filter(tile => tile.state === "number").length)
        }, 0)

        return countMarked
    }

    function getNearbyTiles(thisX : number ,thisY: number ) {
        let nearby = [];

        for(let xCoOrd = -1; xCoOrd <= 1; xCoOrd++) {
            for(let yCoOrd = -1; yCoOrd <= 1; yCoOrd++) {
                const tile = board[thisY + yCoOrd]?.[thisX + xCoOrd]
                if(tile) nearby.push(tile)
            }        
        }

        return nearby
    }

    function revealBoard(board : TileInterface[][]) {
        let tempBoard = board

        for(let i = 0; i < tempBoard.length; i++) {
            for(let j = 0; j < tempBoard[i].length; j++) {
                let tempTile = tempBoard[i][j]
                if ( tempTile.state === "" ) {
                    tempTile.state = tempTile.isMine ? "mine" : ""
                    tempBoard[i][j] = tempTile    
                } else if ( tempTile.state === "flagged" ) {
                    tempTile.state = tempTile.isMine ? "flaggedMine" : "flagged"
                    tempBoard[i][j] = tempTile                       
                }
            }
        }

        return tempBoard
    }

    const minesNearby = getNearbyTiles(x,y).filter(t => t.isMine).length

    return (
        <div className={"itemContainer " + (thisTile.state ? thisTile.state : "")}>
        <button className="item" style={
            {
                color: minesNearby === 1 ? "#0000FF" : 
                minesNearby === 2 ? "#208620" : 
                minesNearby === 3 ? "#FF0000" : 
                minesNearby === 4 ? "#208620" : 
                minesNearby === 5 ? "#7B0000" : 
                minesNearby === 6 ? "#007B7B" : 
                minesNearby === 7 ? "#000000" : 
                minesNearby === 8 ? "#7B7B7B" :
                ""
            }
        }
            onClick={() => winner === undefined ? Select() : ""}
            onAuxClick={(e) => winner === undefined ? Flag(e) : ""}
            onContextMenu={(e) => winner === undefined ? e.preventDefault() : ""}
        >
            {thisTile.state === 'number' ? minesNearby > 0 ? minesNearby : "" : ""}
        </button>
        </div>
    )
}

export default Tile