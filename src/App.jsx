import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './compontent/Navbar'
import HeroPage from './compontent/HeroPage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <HeroPage />
      {/* <div className="p-6">
        <h1 className="text-3xl font-bold">Welcome to Grace Packing!</h1>
      </div> */}
    </div>
  )
}

export default App
