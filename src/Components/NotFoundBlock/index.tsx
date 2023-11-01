import React from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        Ничего не найдено <br />
        <span>😞</span>
      </h1>
    </div>
  );
};
