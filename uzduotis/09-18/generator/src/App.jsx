import Generator from './components/generator/Generator'
import Header from './components/header/Header'
import History from './components/history/History'

import './App.css'

function App() {


  return (
    <>
     <div className="container-lg d-flex justify-content-center ">
       <Header />
       <Generator />
     </div>
    </>
  )
}

export default App
