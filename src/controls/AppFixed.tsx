import React, { ReactNode } from 'react';

type AppFixedProps = {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    width?: string;
    height?: string;
    children?: ReactNode;
}
export function AppFixed(props: AppFixedProps) {
    return (
        <div className='app-fixed' style={{...props}}>
            {props.children}
        </div>
    );
}