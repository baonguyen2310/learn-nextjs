'use client'
import { useState } from 'react'
import './style.css'
import Board from './board'

export interface TictactoePageProps {

}

export default function TictactoePage(props: TictactoePageProps) {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState<number>(0)
    const xIsNext = currentMove % 2 == 0
    const currentSquares = history[currentMove]

    function handlePlay(nextSquares: Array<null> | Array<string>) {
        const nextHistory = [...history, nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
    }

    function jumpTo(nextMove: number) {
        const pastHistory = history.slice(0, nextMove + 1)
        setHistory(pastHistory)
        setCurrentMove(nextMove)
    }

    const moves = history.map((squares, move) => {
        let description
        if (move == 0) {
            description = `Go to game start`
        } else {
            description = `Go to move # ${move}`
        }

        return (
            <li key={move}>
                <button  onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <div className="tictactoe">
            <header className="tictactoe-header">
                <h1>Tictactoe Page</h1>
            </header>
            <main className="tictactoe-content">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
                <div className="tictactoe-content-history">
                    <h2>History:</h2>
                    <ol>{moves}</ol>
                </div>
            </main>
        </div>
    )
}