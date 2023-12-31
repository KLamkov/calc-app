import React, { useEffect, useRef } from 'react';

function KeypadHandler({ inputValue, setInputValue, calculate }) {
    const keypadRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                calculate();
                e.preventDefault();
                return;
            }

            if (e.key === 'Backspace') {
                setInputValue(prevValue => prevValue.slice(0, -1));
                e.preventDefault();
                return;
            }

            const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/'];
            const pressedKey = e.key;

            if (validKeys.includes(pressedKey)) {
                e.preventDefault();
                const operatorMap = {
                    '/': '÷',
                    '*': '×'
                };

                const lastChar = inputValue.slice(-1);
                const lastIsOperator = ['.', '+', '-', '×', '*', '/', '÷'].includes(lastChar);
                const pressedIsOperator = ['.', '+', '-', '×', '*', '/', '÷'].includes(pressedKey);

                if (lastIsOperator && pressedIsOperator) {
                    return; // не додаємо новий оператор чи крапку якщо останній символ оператор чи крапка
                }

                setInputValue(prevValue => prevValue.concat(operatorMap[pressedKey] || pressedKey));
            }

            if (e.key.length === 1 && !validKeys.includes(e.key)) {
                e.preventDefault(); // не даємо вводити неприпустимі символи, літери
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputValue, setInputValue, calculate]);

    return <div ref={keypadRef} tabIndex="0"></div>;
}

export default KeypadHandler;
