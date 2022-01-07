import React from 'react';

type AppInputProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: string;
    name: string;
    value: string;
}
export function AppInput({type, name, placeholder, value, onChange}: AppInputProps) {
    return (
        <input className='app-input' type={type} name={name} value={value} required placeholder={placeholder} onChange={onChange} />
    );
}