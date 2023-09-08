import React, { useState, useEffect, useRef } from 'react';
import { evaluate } from 'mathjs';
import './App.css';

import KeypadHandler from './components/KeypadHandler';


function App() {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
	const inputRef = useRef(null);

	useEffect(() => {
        inputRef.current.focus();
    }, []); 

    const handleClick = (e) => {
        const clickedValue = e.target.name;
        const operatorMap = {
            '/': '÷',
            '*': '×'
        };

        const processedValue = operatorMap[clickedValue] || clickedValue;
        setInputValue(prevValue => prevValue.concat(processedValue));
    }

    const clear = () => {
        setInputValue('');
        setResult('');
    }

	const calculate = () => {
		try {
			const updatedInput = inputValue.replace(/÷/g, '/').replace(/×/g, '*');
			const rawResult = evaluate(updatedInput);
			const formattedResult = Number.isInteger(rawResult) ? rawResult : rawResult.toFixed(3);
			setResult(formattedResult.toString());
		} catch(err) {
			setResult('Error');
			setInputValue('');
		}
	}

    return (
        <>
            <div className='container'>
				<div className='input-container'>
                    <input 
                        type='text' 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)} 
                        className='blinking-caret'
                        ref={inputRef} // Передаем реф
                    />
                    <input type='text' value={result} readOnly />
                </div>
                <div className='keypad'>
                    <button name='' onClick={clear} id="clear" className='AC'>AC</button>
                    <button name='/' onClick={handleClick} className='operator'>÷</button>
                    <button name='7' onClick={handleClick}>7</button>
                    <button name='8' onClick={handleClick}>8</button>
                    <button name='9' onClick={handleClick}>9</button>
                    <button name='*' onClick={handleClick} className='operator'>×</button>
                    <button name='4' onClick={handleClick}>4</button>
                    <button name='5' onClick={handleClick}>5</button>
                    <button name='6' onClick={handleClick}>6</button>
                    <button name='-' onClick={handleClick} className='operator'>-</button>
                    <button name='1' onClick={handleClick}>1</button>
                    <button name='2' onClick={handleClick}>2</button>
                    <button name='3' onClick={handleClick}>3</button>
                    <button name='+' onClick={handleClick} className='operator'>+</button>
                    <button name='0' onClick={handleClick} className='zero'>0</button>
                    <button name='.' onClick={handleClick}>'</button>
                    <button name='=' onClick={calculate} className='equal'>=</button>
                </div>
            </div>
            <KeypadHandler inputValue={inputValue} setInputValue={setInputValue} calculate={calculate} />
        </>
    )
}

export default App;


