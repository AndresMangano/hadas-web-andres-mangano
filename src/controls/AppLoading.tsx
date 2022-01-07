import React, { ReactNode } from 'react';

type AppLoadingProps = {
    children?: ReactNode;
}
export function AppLoading({children}: AppLoadingProps) {
    return (
        <div className='app-loading'>
            <div className='app-loading-logo'>
                <img src='/assets/logo-md.png' alt="Hadas Brand"/>
                <span>{children}</span>
            </div>
        </div>
    );
}