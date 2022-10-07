import React, { useState, useEffect } from 'react';
import './style.css';
import Button from './components/Button';

export default function App() {
  const [bigText, setBigText] = useState('0');
  const [total, setTotal] = useState(false);
  const [operator, setOperator] = useState(null);
  const [currentState, setCurrentState] = useState('');
  const [preState, setPreState] = useState('');
  const [smallText, setSmallText] = useState(preState)

  const inputNum = (e) => {
    e.preventDefault();

    if (currentState.includes('.') && e.target.innerText === '.') return;
    if (total) {
      setPreState('');
    }

    currentState
      ? setCurrentState((pre) => pre + e.target.innerText)
      : setCurrentState(e.target.innerText);
    setTotal(false);

  };

  useEffect(() => {
    setBigText(currentState);
  }, [currentState]);

  useEffect(() => {
    setBigText('0');
  }, []);

  const clear = (e) => {
    e.preventDefault()
    setPreState('');
    setCurrentState('');
    setBigText('0');
    setSmallText('')
  };

  const operatorType = (e) => {
    e.preventDefault()
    setTotal(false)
    setOperator(e.target.innerText)
    if(currentState == '') return
    if(preState !== '') equals()
    setPreState(currentState)
    setCurrentState('')
  }

  //tolocalestring(en-us) to separate with commas
  const equals = (e) => {
    if(e?.target.innerText === '=') {
      setTotal(true)
    }
    let cal
    switch(operator) {
      case '÷':
        cal = (parseFloat(preState) / parseFloat(currentState)).toLocaleString('en-US');
        break;
      case 'x':
        cal = (parseFloat(preState) *  parseFloat(currentState)).toLocaleString('en-US');
        break;
      case '-':
        cal = (parseFloat(preState) - parseFloat(currentState)).toLocaleString('en-US');
        break;
      case '+':
        cal = (parseFloat(preState) +  parseFloat(currentState)).toLocaleString('en-US');
        break;
      default: return
  
      
    }
    setPreState('')
    setCurrentState(cal)
    setBigText(cal)
    setSmallText(preState + operator + currentState )

  }

  const percentage = (e) => {
    e.preventDefault()
    let percent = parseFloat(bigText)/100
    setBigText(String(percent))
  }

  const num = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'];
  const operators = ['÷', 'x', '-', '+']


  const numBtn = num.map((num, index) => {
    return <Button key={index} value={num} click={inputNum} />;
  });

  const operatorsBtn = operators.map((op, idx) => {
    return <Button key={idx} value={op} click={operatorType}/>;
  });

 

  return (
    <div className="calculator">
      <div className="display-field">
        <p className="first-input">{smallText}</p>
        <h2 className="sec-input">{bigText}</h2>
      </div>
      <div className="grid-btns">
        <div className="grid-nums">
          <Button value={'AC'} click={clear}/>
          <Button value={'%'} click={percentage}/>
          {numBtn}
        </div>
        <div className="grid-op">
          {operatorsBtn}
          <Button value={'='} click={equals} />
        </div>
      </div>
    </div>
  );
}
