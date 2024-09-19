import { useState } from 'react';

const Quantity = () => {
    const [qty, setQty] = useState(1);

 

    const handleClickMin = (e) => {
        qty > 0 ? setQty(qty - 1) : 0  
    }

    const handleClickPlus = (e) => {
        qty < 10 ? setQty(qty + 1) : 10  
    }

    return (
        <>
        <div className="row">
            <div className="col d-flex justify-content-center align-items-center gap-4">
                <button onClick={handleClickMin} className="btn btn-primary"><i className="bi bi-dash"></i></button>
                <div className="dty">{qty}</div>
                <button onClick={handleClickPlus} className="btn btn-primary"><i className="bi bi-plus-lg"></i></button>
                </div>
        </div>
        </>
    )
};

export default Quantity;