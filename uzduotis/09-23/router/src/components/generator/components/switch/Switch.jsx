
const Swich = ({ includeNumbers, includeSymbols, onNumbersChange, onSymbolsChange }) => {
    return (
        <>
            <div className="form-check form-switch d-inline-block me-3">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="includeNumbers" 
                    checked={includeNumbers} 
                    onChange={onNumbersChange} 
                />
                <label className="form-check-label">Numbers</label>
            </div>
            <div className="form-check form-switch d-inline-block">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="includeSymbols" 
                    checked={includeSymbols} 
                    onChange={onSymbolsChange} 
                />
                <label className="form-check-label" >Symbols</label>
            </div>
        </>
    );
};

export default Swich;
