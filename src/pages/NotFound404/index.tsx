import React from 'react';

import NotFoundBlock from '../../Components/NotFoundBlock';

import styles from './NotFound404.module.scss';

const NotFound404: React.FC = () => {
  return (
    <>
      <NotFoundBlock />
      <p className={styles.description}>Данная страница не найдена или не существует</p>
    </>
  );
};

export default NotFound404;
