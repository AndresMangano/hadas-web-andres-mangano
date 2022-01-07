import React, { ReactNode } from 'react';

type AppButtonProps = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: ReactNode;
}
export function AppButton({children, onClick}: AppButtonProps) {
    return (
        <button className='app-button' onClick={onClick}>
            {children}
        </button>
    );
}