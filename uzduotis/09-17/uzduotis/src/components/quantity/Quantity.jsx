import { useState } from 'react';

const Quantity = () => {
    const [qty, setCounter] = useState(0);

 

    const handleClickMin = (e) => {
        qty > 0 ? setCounter(qty - 1) : 0  
    }

    const handleClickPlus = (e) => {
        qty < 100 ? setCounter(qty + 1) : 100  
    }

    return (
        <>
        <div className="row mt-5">
            <div className="col d-flex justify-content-center align-items-center gap-5">
                <button onClick={handleClickMin} className="btn btn-primary"><i className="bi bi-dash"></i></button>
                <div className="dty">{qty}</div>
                <button onClick={handleClickPlus} className="btn btn-primary"><i className="bi bi-plus-lg"></i></button>
                </div>
        </div>
        </>
    )
};

export default Quantity;