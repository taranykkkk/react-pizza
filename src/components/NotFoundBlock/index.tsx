import React from 'react';

import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>Нічого не знайдено</h1>
      <p className={styles.description}>Нажаль такої сторінки не існує</p>
    </div>
  );
}

export default NotFoundBlock;
