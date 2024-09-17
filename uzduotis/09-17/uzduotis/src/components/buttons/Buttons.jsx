
const btnValues = [
  ["C","%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];


const Buttons = ({ handleClick }) => {
    return (
      <>
        {btnValues.map((row, rowIndex) => (
          <div key={rowIndex} className="row mb-2">
            {row.map((btn, btnIndex) => (
              <div
                key={btnIndex}
                className={`col-${btn === '=' || btn === 'C' ? '6' : '3'} d-flex justify-content-center`}
              >
                <button
                  className="btn btn-primary w-100"
                  style={{ height: '60px' }}
                  onClick={() => handleClick(btn)}
                >
                  {btn}
                </button>
              </div>
            ))}
          </div>
        ))}
      </>
    );
  };
  
  export default Buttons;
  