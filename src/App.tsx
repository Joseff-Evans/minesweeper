import Board from './components/Board'
import './App.css'
import { useState } from 'react'

function App() {

  const [settings, setSettings] = useState({
    width: 16,
    height: 16,
    mines: 40
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
          mines: 10
        })}>Easy!</button>
        <button onClick={() => setSettings({
          width: 16,
          height: 16,
          mines: 40
        })}>Medium!</button>
        <button onClick={() => setSettings({
          width: 30,
          height: 16,
          mines: 99
        })}>Hard!</button>
      </div>
    </div>
  )
}

export default App
