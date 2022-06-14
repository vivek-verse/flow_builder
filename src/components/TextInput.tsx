import { Input } from 'antd';
import React, { useEffect, useState } from 'react';

const { TextArea } = Input;

export const TextInput = (props: { parentCallback: Function, value : string }): JSX.Element => {

    const [text, setText] = useState('');

    let handleChange = (event : any) => {
        setText(event.target.value);
        props.parentCallback(event.target.value);
    }

    const value = props.value;

    useEffect(() => {
        props.parentCallback(value);
    },[props, value]);

    return (
        <TextArea rows={3}  placeholder="Input some value"  onChange={ handleChange } value={text}/>
    )

}