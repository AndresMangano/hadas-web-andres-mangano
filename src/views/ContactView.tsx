import React, { useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';
import { AppFooter } from '../controls/AppFooter';
import { AppHeader } from '../controls/AppHeader';
import { AppRow } from '../controls/AppRow';
import { AppView } from '../controls/AppView';
import { AppGoogleMaps } from '../controls/AppGoogleMap';
import { AppTitle } from '../controls/AppTitle';
import { AppPluginPages } from '../controls/AppPluginPages';
import { AppInscriptionForm } from '../components/AppInscriptionForm';
import { AppGovernmentLogo } from '../controls/AppGovernmentLogo';
import { AppText } from '../controls/AppText';
import { AppColumn } from '../controls/AppColumn';
import { AppStateData } from '../state/app.state';
import { RouteComponentProps } from 'react-router-dom';

type ContactViewProps = {
    state: AppStateData;
} & RouteComponentProps;
export function ContactView({state}: ContactViewProps) {
    const {
        header,
        main,
        form,
        address,
        instagram,
        facebook,
        governmentLogo
    } = state.contacto;

    useEffect(() => ReactPixel.trackCustom('inscripción'), []);
    
    return (
        <AppView>
            <AppHeader {...state.header} />
            <AppRow size='half'>
                <AppTitle text={header} />
            </AppRow>
            <AppRow size='quarter'>
                <AppColumn>
                    <AppText fontSize='md' text={main.text} />
                </AppColumn>
            </AppRow>
            <AppRow size='quarter'>
                <AppColumn>
                    <AppText fontSize='md' text={main.bottomText} />
                </AppColumn>
            </AppRow>
            <AppRow size='full' padding='md'>                
                <AppColumn grow={2} align='stretch'>
                    <AppText fontSize='lg' text={form.title} />
                    <AppInscriptionForm />
                </AppColumn>
                <AppColumn>
                    <AppPluginPages instagram={instagram} facebook={facebook}/>
                </AppColumn>
            </AppRow>           
            <AppRow size='full'>
                <AppColumn>
                    <AppGoogleMaps address={address}/>
                    <AppGovernmentLogo image={governmentLogo} />
                </AppColumn>
            </AppRow>
            <AppFooter {...state.footer} /> 
        </AppView>
    );
}

