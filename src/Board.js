import React, { Component } from "react";
import "./Board.css";
import Cell from "./Cell";

class Board extends Component {
    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chanceLightStartsOn: 0.25,
    };
    constructor(props) {
        super(props);
        this.state = {
            hasWon: false,
            board: this.createBoard(),
        };
    }

    createBoard() {
        let board = [];
        //create array of arrays of true/false values
        for (let y = 0; y < this.props.nrows; y++) {
            let row = [];
            for (let x = 0; x < this.props.ncols; x++) {
                //push true/false based on if random num < .25 from props
                row.push(Math.random() < this.props.chanceLightStartsOn);
            }
            board.push(row);
        }
        return board;
    }

    flipCellsAround(coord) {
        let { ncols, nrows } = this.props;
        let board = this.state.board;
        let [y, x] = coord.split("-").map(Number);

        function flipCell(y, x) {
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                board[y][x] = !board[y][x];
            }
        }
    }

    render() {
        let tableBoard = [];
        for (let y = 0; y < this.props.nrows; y++) {
            let row = [];
            for (let x = 0; x < this.props.ncols; x++) {
                row.push(<Cell isLit={this.state.board[y][x]} />);
            }
            tableBoard.push(<tr>{row}</tr>);
        }
        return (
            <table className="Board">
                <tbody>{tableBoard}</tbody>
            </table>
        );
    }
}

export default Board;
