import Intro from './components/intro/Intro';
import Navigation from './components/navigation/Navigation';
import Search from './components/search/Search';
import Logo from './components/logo/Logo';
import Cards from './components/cards/Cards';
import './App.css'

const App = () => {

  return(
    <>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="row mt-3">
            <div className="col-1"><Logo/></div>
            <div className="col-2"><Search/></div>
            <div className="col-9"><Navigation/></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col"><Intro/></div>
      </div>
      <div className="row mt-5 mb-5"><Cards/></div>
    </div>
      
    </>
  )
}

export default App;