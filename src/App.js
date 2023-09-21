import React, { useState, useEffect} from 'react';
import { evaluate } from 'mathjs';
import './App.css';

import Input from './components/Input';
import Keypad from './components/Keypad';

import KeypadHandler from './utils/KeypadHandler';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        const buttons = document.querySelectorAll('.keypad button');
        const input = document.querySelector('.blinking-caret');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                input.focus();
            });
        });
    }, []); 

    const handleClick = (e) => {
        const clickedValue = e.target.name;
        const operatorMap = {
            '/': '÷',
            '*': '×'
        };

        const processedValue = operatorMap[clickedValue] || clickedValue;

        // перевірка останнього значення
        const lastChar = inputValue.slice(-1);
        if (processedValue.match(/[.÷×+-]/) && lastChar.match(/[.÷×+-]/)) {
            return; // останній символ та новий символ - оператори, не добавляємо новий
        }

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
                    <Input value={inputValue} onChange={setInputValue} />
                    <input type='text' value={result} readOnly />
                </div>
                <Keypad handleClick={handleClick} clear={clear} calculate={calculate} />
            </div>
            <KeypadHandler inputValue={inputValue} setInputValue={setInputValue} calculate={calculate} />
        </>
    )
}

export default App;


