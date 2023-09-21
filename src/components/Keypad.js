import React from 'react';
import Button from './Button';

function Keypad({ handleClick, clear, calculate }) {
    return (
        <div className='keypad'>
        <Button name='' onClick={clear} className='AC' label='AC' />
        <Button name='/' onClick={handleClick} className='operator' label='÷' />
        <Button name='7' onClick={handleClick} label='7' />
        <Button name='8' onClick={handleClick} label='8' />
        <Button name='9' onClick={handleClick} label='9' />
        <Button name='*' onClick={handleClick} className='operator' label='×' />
        <Button name='4' onClick={handleClick} label='4' />
        <Button name='5' onClick={handleClick} label='5' />
        <Button name='6' onClick={handleClick} label='6' />
        <Button name='-' onClick={handleClick} className='operator' label='-' />
        <Button name='1' onClick={handleClick} label='1' />
        <Button name='2' onClick={handleClick} label='2' />
        <Button name='3' onClick={handleClick} label='3' />
        <Button name='+' onClick={handleClick} className='operator' label='+' />
        <Button name='0' onClick={handleClick} className='zero' label='0' />
        <Button name='.' onClick={handleClick} label='.' />
        <Button name='=' onClick={calculate} className='equal' label='=' />
        </div>
    );
}

export default Keypad;
