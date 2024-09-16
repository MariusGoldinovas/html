import Logo_small from  '../../assets/logo-with-shadow.png';
import './Logo.css'

const Logo = () => {
    return (
        <div className="logo">
            <img className='logoSmall' src={Logo_small} alt="" />
            <div className="byLogo">Vite</div>
        </div>
    )
}

export default Logo;