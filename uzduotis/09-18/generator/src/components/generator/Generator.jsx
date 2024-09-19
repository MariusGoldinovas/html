import React, { useState, useEffect} from 'react';
import Slider from '../slider/Slider'
import Buttons from '../buttons/Buttons';
import Swich from '../switch/Switch';
import History from '../history/History'

import './Generator.css'


const PasswordGenerator = () => {
    const [sliderValue, setSliderValue] = useState(50);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [passwordHistory, setPasswordHistory] = useState([]);
    
    useEffect(() => {
        const storedPasswords = localStorage.getItem('passwordHistory');
        if (storedPasswords) {
            setPasswordHistory(JSON.parse(storedPasswords));
        }
    }, []);

    useEffect(() => {
        generatePassword();
    }, [sliderValue, includeNumbers, includeSymbols]);

    const generatePassword = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        let characterSet = letters;

        if (includeNumbers) {
            characterSet += numbers;
        }
        if (includeSymbols) {
            characterSet += symbols;
        }

        let password = '';
        for (let i = 0; i < sliderValue; i++) {
            const randomIndex = Math.floor(Math.random() * characterSet.length);
            password += characterSet[randomIndex];
        }
        setGeneratedPassword(password);
        updatePasswordHistory(password);
    };



    const updatePasswordHistory = (newPassword) => {
        const updatedHistory = [newPassword, ...passwordHistory.slice(0, 9)]; 
        setPasswordHistory(updatedHistory);
        localStorage.setItem('passwordHistory', JSON.stringify(updatedHistory));
    };

    return (
    <>
        <div className="container box p-5 mt-5">
            <div className="card p-4 shadow-sm">
                <div className="mb-4">
                    <Slider min={1} max={100} value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} />
                </div>
                <div className="mb-4">
                    <Swich includeNumbers={includeNumbers} includeSymbols={includeSymbols}
                    onNumbersChange={() => setIncludeNumbers(!includeNumbers)}
                    onSymbolsChange={() => setIncludeSymbols(!includeSymbols)}
                    />
                </div>

                <div className="mb-4 d-flex justify-content-center flex-column ">
                    <label className="form-label">Generated password</label>
                    <input type="text" className="form-control " id="generatedPassword" readOnly value={generatedPassword} />
                </div>
                <Buttons />
                <History passwordHistory={passwordHistory} />   
            </div>
        </div>
    </>
    );
};

export default PasswordGenerator;