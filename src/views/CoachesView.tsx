import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppCircularItem } from '../controls/AppCircularItem';
import { AppColumn } from '../controls/AppColumn';
import { AppFooter } from '../controls/AppFooter';
import { AppHeader } from '../controls/AppHeader';
import { AppRow } from '../controls/AppRow';
import { AppTitle } from '../controls/AppTitle';
import { AppView } from '../controls/AppView';
import { AppStateData } from '../state/app.state';

type CoachesViewProps = {
    state: AppStateData;
} & RouteComponentProps;
export function CoachesView({state, history}: CoachesViewProps) {
    const {
        header,
        coaches
    } = state.profes;

    return (
        <AppView>
            <AppHeader {...state.header} />
            <AppRow size='half'>
                <AppTitle text={header} />
            </AppRow>
            <AppRow size='full'>
                {
                    coaches.slice(0, 2).map((e, index) => 
                        <AppColumn key={index}>
                            <AppCircularItem image={e.image} onClick={() => history.push(`/profes/${index}`)} imageTitle={e.name}/>
                        </AppColumn>)
                }
            </AppRow>
            <AppRow size='full'>
                {
                    coaches.slice(2).map((e, index) => 
                        <AppColumn key={index}>
                            <AppCircularItem image={e.image} onClick={() => history.push(`/profes/${index + 2}`)} imageTitle={e.name}/>
                        </AppColumn>)
                }
            </AppRow>
            <AppFooter {...state.footer} />
        </AppView>
    );
}