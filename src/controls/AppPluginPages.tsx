import React, { useEffect } from 'react';
import { UrlLink } from '../state/dynamic.types';
import { AppColumn } from './AppColumn';

type AppPluginsPagesProps = {
    facebook: UrlLink;
    instagram: UrlLink;
}
export function AppPluginPages({facebook, instagram}: AppPluginsPagesProps) {
    useEffect(() => {
        (function(){
            var d = document;
            var i: HTMLScriptElement = d.createElement("script");
            var e: Element|null = null;
            var s = "script";
            i.async = true;
            i.src = instagram.url;
            e = d.getElementsByTagName(s)[0];
            e?.parentNode?.insertBefore(i, e);
        })();
    }, [instagram])

    return(
            <AppColumn className="app-plugin-pages">
                <div className="app-plugin-pages-facebook">
                    <h3>Visitanos en Facebook</h3>
                    <iframe src={facebook.url} scrolling="no" frameBorder="0" allow="encrypted-media" title="Hadas Facebook"></iframe>
                </div>
                <div className="app-plugin-pages-instagram">
                    <h3>Seguinos en Instagram</h3>
                    <div id="curator-feed-default-feed-layout">
                        <a href="https://curator.io" target="_blank" rel='noopener noreferrer' className="app-plugin-pages-instagram crt-logo crt-tag">Powered by Curator.io</a>
                    </div>
                </div>
            </AppColumn>
    )
}