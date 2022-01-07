import React from 'react';
import { useFirebase } from '../services/firebase.service';
import { ImageLink, VideoLink } from '../state/dynamic.types';

type AppTopVideoProps = {
    background: ImageLink;
    video: VideoLink;
}
export function AppTopVideo({video}: AppTopVideoProps) {
    const firebaseService = useFirebase();
    const videoLink = firebaseService.get(video.link);

    return (
        <video className="app-top-video" id="bgvid" playsInline autoPlay muted loop>
            <source src={videoLink} type="video/mp4"/>
        </video>
    );
}