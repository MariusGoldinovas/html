import './Buttons.css'



const Buttons = (props) => {
  return(

    <div className="d-flex gap-2">
      <button type="button" className="btn btn-secondary">{props}</button>
    </div>

  )
}

export default Buttons;