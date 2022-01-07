import React, { ReactNode } from 'react';

type AppButtonListProps = {
    children?: ReactNode;
}
export function AppButtonList({children}: AppButtonListProps) {
    return (
        <ul className='app-button-list'>
        {
            React.Children.map(children, (child, i) =>
                <li key={i} className='app-button-list-item'>
                    {child}
                </li>)
        }
        </ul>
    );
}