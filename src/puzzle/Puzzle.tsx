import * as React from "react";
import styled from "react-emotion";
import Tile from './Tile';


const GameBoard = styled('div')`
    position: relative;
    background: #aaa;
    padding: 10px;
    border: solid 2px #333;
    border-radius: 4px;
    margin: 50px auto;
`

const StyledButton = styled('button')`
    position: relative;
    background: #aaa;
    padding: 10px  20px 10px;
    margin: 10px;
    border: solid 2px #333;
    border-radius: 4px;
`
const StyledControls= styled('div')`
    text-align: center;
`

const StyledComplete = styled('div')`
    position: absolute;
    background: rgba(0,0,0,0.7);
    line-height: 90px;
    font-size: 50px;
    color: #fff;
`

export default class Puzzle extends React.Component {

    numTiles: number = 16;
    lines: number = Math.sqrt(this.numTiles);
    finishedString: string = "";

    state = {
        currentPos: this.numTiles - 1,
        tiles: this.getTiles(),
        complete: false
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
        let newTiles = this.getTiles();

        this.state = {
            currentPos: this.numTiles - 1,
            tiles: newTiles,
            complete: false
        }

        this.finishedString = newTiles.join();

        this.messItUp();
    }

    /**
    * @returns Create tiles and put the blank one (tile 0) at the end of the array.
    */
    getTiles(): Array<number> {
        let tiles = [];
        for (let i = 1; i < this.numTiles; i++) {
            tiles.push(i);
        }
        tiles.push(0);
        return tiles;
    }

    messItUp() {
        // bigger board needs more messing 
        const moves = this.numTiles * 30;
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
        this.setState({ complete: false })
    }


    /**
    * @param pos  A position in the array.
    * @returns An array of possible positions to move to.
    */
    possibleMoves(pos: number): Array<number> {
        let pmoves: Array<number> = [];
        for (let i = 0; i < this.numTiles; i++) {
            if (this.isAdjacent(pos, i)) {
                pmoves.push(i);
            }
        }
        return pmoves;
    }

    /**
     * @param pos1  A position in the array
     * @param pos2  A position in the array
     * @return boolean If pos1 and pos2 are 1 position away on the grid.
     */

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
            if (this.state.tiles.join() == this.finishedString) {
                this.setState({ complete: true })
            }
        }
    }

    /**
     * Swaps the position of two tiles in the array and sets the new state.
     * @param pos1  A position in the array
     * @param pos2  A position in the array
     */
    swapTiles(pos1: number, pos2: number) {
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

                    {this.state.complete == true && (
                        <StyledComplete style={{ width: this.lines * 100, height: this.lines * 100 }}>
                            YOU DID IT!
                        </StyledComplete>
                    )
                    }
                </GameBoard>
                <StyledControls>
                    <StyledButton onClick={(e) => this.initBoard(9)}>3x3</StyledButton>
                    <StyledButton onClick={(e) => this.initBoard(16)}> 4x4</StyledButton>
                    <StyledButton onClick={(e) => this.initBoard(25)}> 5x5</StyledButton>
                    <StyledButton onClick={(e) => this.initBoard(36)}> 6x6</StyledButton>
                </StyledControls>
            </div>


        )
    }

}
