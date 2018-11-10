import * as React from "react";
import styled from "react-emotion";
import Tile from './Tile';


const GameBoard = styled('div')`
    position: relative;
    background: #aaa;
    padding: 10px;
    border: solid 2px #333;
    border-radius: 4px;
`

const StyledButton = styled('button')`
    position: relative;
    background: #aaa;
    text-align: left;
    padding: 10px;
    margin: 10px;
    border: solid 2px #333;
    border-radius: 4px;
`


export default class Puzzle extends React.Component {

    numTiles: number = 16;
    lines: number = Math.sqrt(this.numTiles);

    state = {
        currentPos: this.numTiles - 1,
        tiles: this.getTiles()
    }

    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        this.initBoard(this.numTiles);
    }


    initBoard(numTiles: number) {
        this.numTiles = numTiles;
        this.lines = Math.sqrt(this.numTiles);

        this.state = {
            currentPos: this.numTiles - 1,
            tiles: this.getTiles()
        }

        this.messItUp();
    }

    getTiles() {
        // Create tiles and put the blank one (tile 0) at the end of the array.
        let tiles = [];
        for (let i = 1; i < this.numTiles; i++) {
            tiles.push(i);
        }
        tiles.push(0);
        return tiles;
    }



    messItUp() {
        // bigger board needs more messing 
        const moves = 200;
        let i = 0;
        let tempPos = this.state.currentPos;
        let tiles = this.state.tiles;

        while (i < moves) {
            let pmoves = this.possibleMoves(tempPos);
            let rand = Math.floor(Math.random() * pmoves.length)
            let newPos = pmoves[rand];

            var temp = tiles[tempPos];
            tiles[tempPos] = tiles[newPos];
            tiles[newPos] = temp;
            tempPos = newPos;
            i++;
        }

        this.setState({ tiles: tiles })
        this.setState({ currentPos: tempPos })

    }

    possibleMoves(pos: number): Array<number> {
        let pmoves: Array<number> = [];
        for (let i = 0; i < this.numTiles; i++) {
            if (this.isAdjacent(pos, i)) {
                pmoves.push(i);
            }
        }
        return pmoves;
    }

    isAdjacent(pos1: number, pos2: number): boolean {
        const pos1X = Math.abs(pos1 % this.lines) + 1;
        const pos1Y = Math.floor(pos1 / this.lines) + 1;
        const pos2X = Math.abs(pos2 % this.lines) + 1;
        const pos2Y = Math.abs(Math.floor(pos2 / this.lines)) + 1;

        const distX = Math.abs(pos1X - pos2X);
        const distY = Math.abs(pos1Y - pos2Y);

        return distX + distY == 1;
    }

    /**
     * @param pos  The clicked index.
     */

    onClicked(pos: number) {
        if (this.isAdjacent(this.state.currentPos, pos)) {
            this.swapTiles(this.state.currentPos, pos);
        }
    }

    swapTiles(pos1: number, pos2: number): any {
        const tiles = this.state.tiles;
        var temp = tiles[pos1];
        tiles[pos1] = tiles[pos2];
        tiles[pos2] = temp;
        this.setState({ tiles: tiles })
        this.setState({ currentPos: pos2 })
    }

    

    render() {
        return (
            <div>
                <GameBoard style={{ width: this.lines * 100, height: this.lines * 100 }}>
                    {this.state.tiles.map((number, position) => {
                        return (
                            <Tile
                                key={position}
                                number={number}
                                position={position}
                                lines={this.lines}
                                onClicked={(pos: number) => this.onClicked(pos)}
                            />
                        )
                    })
                    }
                </GameBoard>

                <div>
                    <StyledButton onClick={(e) => this.initBoard(9)}>3x3</StyledButton>
                    <StyledButton onClick={(e) => this.initBoard(16)}> 4x4</StyledButton>
                    <StyledButton onClick={(e) => this.initBoard(25)}> 5x5</StyledButton>
                    <StyledButton onClick={(e) => this.initBoard(36)}> 6x6</StyledButton>
                </div>


            </div>


        )
    }

}
