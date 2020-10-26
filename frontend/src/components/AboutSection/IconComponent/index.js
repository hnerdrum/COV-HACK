import React from 'react';
import styles from './IconComponent.module.css';

const IconComponent = ({ imgSrc, text}) => {
    return (
        <div className={styles.container}>
            <img alt="" src={imgSrc} />
            <h4>{text}</h4>
        </div>
    )
};

export default IconComponent;