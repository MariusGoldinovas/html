import { useState } from "react";
import Display from "../display/Display";
import Buttons from "../buttons/Buttons";


const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleClick = (value) => {
    if (value === "=") {
      if (input.includes('/0')){
        setResult("Ups, ką čia darai?")
      } else {
        let expression = input.replace('x', '*').replace('%', '/100');
        const numberResult = eval(expression);
        setResult(numberResult);
      }
    } else if (value === "C") {
      setInput('');
      setResult(null);
    } else {
       setInput(input + value);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
      <Display result={result} input={input} />
      <Buttons handleClick={handleClick} />
      </div>
    </div>
  );
};

export default Calculator;