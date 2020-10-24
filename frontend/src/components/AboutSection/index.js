import React from 'react';
import styles from './AboutSection.module.css';
import IconComponent from "./IconComponent";
import VideoComponent from "./VideoComponent";

const AboutSection = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>We aim to reinvent the scrap metal workflow</h1>
            <div className={styles.innerContainer}>
                <IconComponent imgSrc="book.png" text="Quick search of metals by type"/>
                <IconComponent imgSrc="time.png" text="Recommended purchases based on history"/>
                <IconComponent imgSrc="rating.png" text="Supplier rating"/>
            </div>
            <VideoComponent
                text="Learn more about our vision here:"
                videoUrl="https://www.youtube.com/embed/hBi42qcz-0w"
            />
        </div>
    )
};

export default AboutSection;