import classNames from 'classnames';
import React, { ReactNode } from 'react';

type AppColumnProps = {
    className?: string;
    children?: ReactNode;
    grow?: number;
    justify?: 'flex-start'|'center'|'flex-end'|'space-evenly';
    align?: 'flex-start'|'center'|'flex-end'|'stretch';
    alignSelf?: 'flex-start'|'center'|'flex-end'|'stretch';
    shadow?: boolean;
}

export function AppColumn({className, children, grow = 1, justify = 'space-evenly', align = 'center', alignSelf, shadow = false}: AppColumnProps) {
    return (
        <div className={classNames('app-column', className, {
            'has-shadow': shadow
        })} style={{
            flexGrow: grow,
            justifyContent: justify,
            alignItems: align,
            alignSelf: alignSelf,
        }}>
            {children}
        </div>
    );
}