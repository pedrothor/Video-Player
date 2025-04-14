import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'; // Importar os componentes necessários para rotas

import HomePage from './Pages/Home';
import VideoPage from './Pages/Videos';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/videos" element={<VideoPage />} />
      </Routes>
    </>
  )
}

export default App;
