import classNames from 'classnames';
import React from 'react';
import { useVisibility } from '../hooks/useVisibility';
import { DynamicText, SimpleText } from '../state/dynamic.types';
import { AppHighlightedText } from './AppHighlightedText';

type AppTextProps = {
    fontSize: 'sm'|'md'|'lg';
    text: DynamicText|SimpleText;
    animated?: number;
    card?: boolean;
}

export function AppText({fontSize, text, card = false, animated}: AppTextProps) {
    const [isVisible, currentElement] = useVisibility<HTMLDivElement>(animated || 0);

    return (
        <div ref={currentElement} className={classNames('app-text', {
            'is-animated': animated !== undefined,
            'is-visible': isVisible,
            'has-sm-font': fontSize === 'sm',
            'has-md-font': fontSize === 'md',
            'has-lg-font': fontSize === 'lg',
            'is-card': card
        })}>
        {
            text._type === 'TEXT'
                ?  <>
                    {
                        text.parts.map((e, index) =>
                            e._type === 'BREAK'
                                ? <br key={index} />
                            : e._type === 'RAW_TEXT'
                                ? e.text
                            : e._type === 'LINK_TEXT'
                                ?   <AppHighlightedText key={index} fontSize={e.size} color={e.color}>
                                        <a href={e.link} target='_blank' rel="noopener noreferrer">{e.text}</a>
                                    </AppHighlightedText>
                            : e._type === 'STYLED_TEXT'
                                ? <AppHighlightedText key={index} fontSize={e.size} color={e.color}>{e.text}</AppHighlightedText>
                                : ''
                        )
                    }
                    </>
                :   text._type === 'STRING'
                    &&  text.value
        }
        </div>
    );
}