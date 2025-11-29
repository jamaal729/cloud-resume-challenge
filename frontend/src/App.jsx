import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import HeaderBlock from './components/HeaderBlock.jsx'
import SectionsBlock from './components/SectionsBlock.jsx'

  function App() {
    const [count, setCount] = useState(0)

    return (
      <>
        <div className="page">

          <HeaderBlock />
          <SectionsBlock />

        </div>
      </>
    )
  }

export default App
