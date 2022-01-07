import React from 'react';

type AppTextAreaProps = {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    name: string;
    rows: number;
    value: string;
}
export function AppTextArea({placeholder, name, rows, value, onChange}: AppTextAreaProps) {
    return (
        <textarea className='app-text-area' rows={rows} name={name} value={value} placeholder={placeholder} onChange={onChange} />
    );
}