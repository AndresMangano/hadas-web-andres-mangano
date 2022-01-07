import React from 'react';
import { UrlLink } from '../state/dynamic.types';

type AppGoogleMapsProps = {
    address: UrlLink;
}
export function AppGoogleMaps({address}: AppGoogleMapsProps) {
    return (
        <div className="app-google-map">
            <iframe src={address.url} title='Hadas Google Maps' aria-hidden="false"></iframe>
        </div>
    );
}