import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { DynamicText, DynamicTextPart, DynamicTextPartColor, DynamicTextPartSize, DynamicTextPartType } from '../state/dynamic.types';
import { AppColumn } from './AppColumn';
import { AppRow } from './AppRow';

type AppTextEditorProps = {
    onAdd: (part: DynamicTextPart) => void;
    onChange: (partIndex: number, text: string) => void;
    onChangeLink: (partIndex: number, link: string) => void;
    onRemove: (partIndex: number) => void;
    text: DynamicText;
}
export function AppTextEditor({onAdd, onChange, onChangeLink, onRemove, text}: AppTextEditorProps) {
    const [textType, setTextType] = useState<DynamicTextPartType>('STYLED_TEXT');
    const [textColor, setTextColor] = useState<DynamicTextPartColor>('primary');
    const [textSize, setTextSize] = useState<DynamicTextPartSize>('lg');
    const [newText, setNewText] = useState('');
    const [newLink, setNewLink] = useState('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onAdd({
            _type: textType,
            color: textColor,
            size: textSize,
            text: newText,
            link: newLink
        });
        setNewText('');
        setNewLink('');
    }
    
    return (
        <AppColumn className='app-text-editor' align='stretch'>
            {
                text.parts.map((p, index) =>
                    <AppRow key={index} className='app-text-editor-part' justify='flex-start'>
                        <button onClick={() => onRemove(index)}><FontAwesomeIcon icon={faTrash} /></button>
                            {
                                p._type === 'LINK_TEXT'
                                    ?   <>
                                            <input value={p.text} placeholder='Etiqueta' onChange={event => onChange(index, event.currentTarget.value)}/>
                                            <input value={p.link} placeholder='Link' onChange={event => onChangeLink(index, event.currentTarget.value)}/>
                                        </>
                                : (p._type === 'RAW_TEXT' || p._type === 'STYLED_TEXT')
                                    ?   <input value={p.text} onChange={event => onChange(index, event.currentTarget.value)}/>
                                : p._type === 'BREAK'
                                    ?   <small>Salto de linea</small>
                                    :   <></>
                            }
                    </AppRow>)
            }
            <AppRow className='app-text-editor-add'>
                <form onSubmit={handleSubmit}>
                    <AppRow wrap={false}>
                        <AppColumn>
                            <label>Tipo: </label>
                            <select value={textType} onChange={event => setTextType(event.currentTarget.value as any)}>
                                <option value='RAW_TEXT'>Simple</option>
                                <option value='STYLED_TEXT'>Estilizado</option>
                                <option value='LINK_TEXT'>Link</option>
                                <option value='BREAK'>Salto</option>
                            </select>
                        </AppColumn>
                        {
                            (textType === 'STYLED_TEXT' || textType === 'LINK_TEXT') &&
                                <AppColumn>
                                    <label>Color: </label>
                                    <select value={textColor} onChange={event => setTextColor(event.currentTarget.value as any)}>
                                        <option value='primary'>primary</option>
                                        <option value='secondary'>secondary</option>
                                        <option value='bold'>bold</option>
                                        <option value='default'>default</option>
                                        <option value='white'>white</option>
                                    </select>
                                </AppColumn>
                        }
                        {
                            (textType === 'STYLED_TEXT' || textType === 'LINK_TEXT') &&
                                <AppColumn>
                                    <label>Tamaño: </label>
                                    <select value={textSize} onChange={event => setTextSize(event.currentTarget.value as any)}>
                                        <option value='lg'>L</option>
                                        <option value='md'>M</option>
                                        <option value='sm'>S</option>
                                    </select>
                                </AppColumn>
                        }
                    </AppRow>
                    <AppRow>
                        {
                            textType !== 'BREAK' &&
                                <input placeholder='Texto' value={newText} onChange={event => setNewText(event.currentTarget.value)} />
                        }
                        {
                            textType === 'LINK_TEXT' &&
                                <input placeholder='Link' value={newLink} onChange={event => setNewLink(event.currentTarget.value)} />
                        }
                        <button type='submit'>Agregar</button>
                    </AppRow>
                </form>
            </AppRow>
        </AppColumn>
    );
}