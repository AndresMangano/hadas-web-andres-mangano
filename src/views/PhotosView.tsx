import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppColumn } from '../controls/AppColumn';
import { AppFooter } from '../controls/AppFooter';
import { AppHeader } from '../controls/AppHeader';
import { AppPicture } from '../controls/AppPicture';
import { AppRow } from '../controls/AppRow';
import { AppTitle } from '../controls/AppTitle';
import { AppView } from '../controls/AppView';
import { AppStateData } from '../state/app.state';

type PhotosViewProps = {
    state: AppStateData;
} & RouteComponentProps;
export function PhotosViews({state}: PhotosViewProps) {
    const {
        header,
        images
    } = state.fotos;

    return (
        <AppView>
            <AppHeader {...state.header} />
            <AppRow size='half'>
                <AppTitle text={header} />
            </AppRow>
            {
                images.filter((_, i) => i % 2 === 0).map((e, i) =>
                    <AppRow key={i} size='half' padding='lg'>
                        <AppColumn>
                            <AppPicture source={e} title='Hadas image' />
                        </AppColumn>
                        {
                            images[i*2+1] !== undefined &&
                                <AppColumn>
                                    <AppPicture source={images[i*2+1]} title='Hadas image' />
                                </AppColumn>
                        }
                    </AppRow>)
            }
            <AppFooter {...state.footer} />
        </AppView>
    )
}