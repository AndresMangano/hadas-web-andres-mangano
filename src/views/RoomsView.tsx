import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppColumn } from '../controls/AppColumn';
import { AppFooter } from '../controls/AppFooter';
import { AppHeader } from '../controls/AppHeader';
import { AppHighlightedText } from '../controls/AppHighlightedText';
import { AppPicture } from '../controls/AppPicture';
import { AppRow } from '../controls/AppRow';
import { AppText } from '../controls/AppText';
import { AppTitle } from '../controls/AppTitle';
import { AppView } from '../controls/AppView';
import { AppStateData } from '../state/app.state';

type RoomsViewProps = {
    state: AppStateData;
} & RouteComponentProps;
export function RoomsView({state}: RoomsViewProps) {
    const {
        header,
        title,
        items,
        bottom
    } = state.salas;
    
    return (
        <AppView>
            <AppHeader {...state.header} />
            <AppRow size='half'>
                <AppTitle text={header} />
            </AppRow>
            <AppRow size="half">
                <AppColumn>
                    <AppText fontSize='md' text={title} />
                </AppColumn>
            </AppRow>
            {
                items.map((e, index) =>
                    <AppRow key={index} size='full' padding='md' reverse={index % 2 === 1}>
                        <AppColumn grow={2}>
                            <AppPicture source={e.image} title='Sala' />
                        </AppColumn>
                        <AppColumn alignSelf='center'>
                            <h2><AppText fontSize='md' animated={300} text={e.text.title} /></h2>
                            <ul style={{listStyle: 'none', textAlign: 'left'}}>
                            {
                                e.text.items.map((e, index) =>
                                    <li key={index}><AppHighlightedText color='default'>{e.value}</AppHighlightedText></li>        )
                            }
                            </ul>
                        </AppColumn>
                    </AppRow>)
            }
            <AppRow size="auto">
                <AppColumn>
                    <h3><AppText fontSize='md' animated={300} text={bottom.title} /></h3>
                    <AppText fontSize='md' animated={300} text={bottom.body} />
                </AppColumn>
            </AppRow>
            <AppFooter {...state.footer} />
        </AppView>
    );
}