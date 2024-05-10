import './App.css'
import Navbar from './components/Navbar'
import Mapper from './components/Mapper'

import {Routes, Route} from 'react-router-dom'


function App() {

  return (
    <>
      <div>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Mapper/>}/>
          </Routes>
        <Mapper/>
      </div>
  </>
  )

}



export default App
