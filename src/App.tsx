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
      <Board key={settings.id}
        width={settings.width} 
        height={settings.height} 
        mines={settings.mines}
        setSettings={setSettings}
      />
    </div>
  )
}

export default App
