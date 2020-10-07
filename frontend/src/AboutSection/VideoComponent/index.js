import React from 'react';
import YouTubePlayer from "react-player/lib/players/YouTube";
import styles from './VideoComponent.module.css';

const VideoComponent = ({ text, videoUrl }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{text}</h2>
            <iframe src={videoUrl}
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                    className={styles.video}
                    height='505'
                    width='900'
            />
        </div>
    )
};

export default VideoComponent;