import React, { useRef, useEffect } from 'react';

function Input({ value, onChange }) {
const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
        inputRef.current.focus();
        }
    }, []);

    return (
        <input
            type='text'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className='blinking-caret'
            ref={inputRef}
        />
    );
}

export default Input;
