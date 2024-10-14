'use client';

import React, { useState } from 'react';
import ScheduleModal from './ScheduleModal';
import styles from './ScheduleEditor.module.scss';
import DurationSelector from './DurationSelector';

const ScheduleEditor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <DurationSelector/>
      <button className={styles.openButton} onClick={handleOpenModal}>
        Редактировать график
      </button>
      {isModalOpen && <ScheduleModal onClose={handleCloseModal} />}
    </div>
  );
};

export default ScheduleEditor;
