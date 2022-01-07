import React from 'react';
import { YoutubeLink } from '../state/dynamic.types';

type AppYoutubeProps = {
    video: YoutubeLink;
}

export function AppYoutube({video}: AppYoutubeProps) {
    return (
        <div className="app-youtube-video">
            <iframe src={video.link} title='Youtube video' allowFullScreen />
        </div>
    );
}

