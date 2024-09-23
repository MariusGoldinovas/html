
const Display = ({result, input}) => {

    return(
<div className="col-12 mb-3">
        <input type="text" 
        className="form-control text-end" 
        placeholder="0"
        value={result !== null ? result : input} 
        readOnly />
      </div>
    )
}

export default Display;