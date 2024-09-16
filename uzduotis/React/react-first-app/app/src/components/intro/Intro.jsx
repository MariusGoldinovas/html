import logo_big from '../../assets/logo-with-shadow.png';
import Buttons from '../buttons/Buttons'
import './Intro.css'

const Intro = () => {
    return (
       <div className='container'>
            <div className="row d-flex justify-content-between align-items-center">
                <div className="col-6">
                <span className='vite'>Vite</span>
                <h1>Next Generation Frontend Tooling</h1>
                <span className='subtext'>Get ready for a development environment that can finally catch up with you.</span>
                </div>
                <div className="col-4">
                <img src={logo_big}  className="img-fluid" alt="" />
                </div>
            </div>
            <div className="row">
                <div className="col"><Buttons text="Mygtukas"/></div>
                <div className="col"><Buttons text="Mygtukas"/></div>
                <div className="col"><Buttons text="Mygtukas"/></div>
                <div className="col"><Buttons text="Mygtukas"/></div>
            </div>
       </div>
    )
}

export default Intro;