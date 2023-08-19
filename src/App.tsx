import Board from './components/Board'
import './App.css'
import { useState } from 'react'

function App() {

  const [settings, setSettings] = useState({
    width: 16,
    height: 16,
    mines: 40,
    id: 0
  })


  return (
    <div className="container">
      <Board
        width={settings.width} 
        height={settings.height} 
        mines={settings.mines}
      />
      <div className="flexRowContainer">
        <p>New Game:</p>
        <button onClick={() => setSettings({
          width: 9,
          height: 9,
          mines: 10,
          id: Math.random()
        })}>Easy!</button>
        <button onClick={() => setSettings({
          width: 16,
          height: 16,
          mines: 40,
          id: Math.random()
        })}>Medium!</button>
        <button onClick={() => setSettings({
          width: 30,
          height: 16,
          mines: 99,
          id: Math.random()
        })}>Hard!</button>
      </div>
    </div>
  )
}

export default App
