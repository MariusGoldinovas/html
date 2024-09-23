

const Slider = ({ min, max, value, onChange }) => {
    return (
        <div className="row d-flex justify-content-center align-items-center">
            <label className="form-label d-flex justify-content-center mb-3">Customize your new password</label>
            <div className="col-3"><span>Characters</span></div>
            <div className="col-7">
                <input
                    type="range"
                    className="form-range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChange}
                />
            </div>
            <div className="col-2"><span>{value}</span></div>
        </div>
    );
};

export default Slider;
