import React, { ReactNode } from 'react';
import { AppColumn } from './AppColumn';
import { AppRow } from './AppRow';

type AppFormProps = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children?: ReactNode;
}
export function AppForm({children, onSubmit}: AppFormProps) {
    return (
        <AppColumn className='app-form' align='stretch'>
            <form onSubmit={onSubmit}>
            { React.Children.map(children, (child, index) => 
                <AppRow key={index} className='app-form-row' transparent>
                    { child }
                </AppRow>
            )}
            </form>
        </AppColumn>
    );
}