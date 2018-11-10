import * as React from "react";
import styled from "react-emotion";


const TileStyled = styled('div')`
    position: absolute;  
    width: 94px;
    height: 94px;
    background: #ddd;
    border: solid 2px #333;
    border-radius: 4px;
    text-align: center;
    /* transition: left 1s ease-in-out, top 1s ease-in-out; */

    .number{
        margin: 0;
        padding: 15px 0 0 0;
        font-size: 60px;
    }
`


interface Props {
    number: number;
    position: number;
    lines: number;
    onClicked: Function;
}


export default class Tile extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        const num = this.props.number;
        const pos = this.props.position;
        const lines = this.props.lines;
        return (
            <TileStyled
                style={{ left: Math.abs((pos % lines) * 100) + 10, top: (Math.floor(pos / lines) * 100) + 10 }}
                onClick={(e) => this.props.onClicked(this.props.position)}
            >
                <div className={'number'}> {num == 0 ? "" : num}</div>
            </TileStyled>
        )
    }

}
