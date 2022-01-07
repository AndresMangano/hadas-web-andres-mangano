import classNames from 'classnames';
import React, { ReactNode, useState } from 'react';

type AppCarouselProps = {
    width: number;
    widthUnit?: 'vw'|'px'|'rem'|'vh';
    children?: ReactNode;
    arrow?: 'dark'|'light';
}
export function AppCarousel({children, width, widthUnit = 'vw', arrow = 'dark'}: AppCarouselProps) {
    const [actualIndex, setActualIndex] = useState(0);
    const itemCount = React.Children.count(children);

    function right() {
        setActualIndex(actualIndex >= itemCount - 1 ? actualIndex : actualIndex + 1);
    }
    function left() {
        setActualIndex(actualIndex <= 0 ? 0 : actualIndex - 1);
    }

    return (
        <div className='app-carousel' style={{width: width+widthUnit}}>
            {
                (actualIndex > 0) &&
                    <button className={classNames('app-carousel-arrow', {
                        'to-left': true,
                        'is-dark': arrow === 'dark',
                        'is-light': arrow === 'light'
                    })} onClick={left}>{'<'}</button>
            }
            <div className='app-carousel-panel' style={{width: width+widthUnit}}>
                <div className='app-carousel-panel-content' style={{ left: `${-actualIndex*width}${widthUnit}`}}>
                {
                    React.Children.map(children, (slide, index) =>
                        <div className={classNames('app-carousel-panel-content-slide')} style={{minWidth: width+widthUnit}}>
                            {slide}
                        </div>)
                }
                </div>
            </div>
            {
                (actualIndex < itemCount - 1) &&
                    <button className={classNames('app-carousel-arrow', {
                        'to-right': true,
                        'is-dark': arrow === 'dark',
                        'is-light': arrow === 'light'
                    })} onClick={right}>{'>'}</button>
            }
        </div>
    );
}