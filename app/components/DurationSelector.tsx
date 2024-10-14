import React from 'react';
import { useRecoilState } from 'recoil';
import { appointmentDurationState } from '../store';
import styles from './DurationSelector.module.scss';

const DurationSelector = () => {
  const [duration, setDuration] = useRecoilState(appointmentDurationState);

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(parseInt(e.target.value));
  };

  return (
    <div className={styles.durationSelector}>
      <label htmlFor="duration">Время приема:</label>
      <select id="duration" value={duration} onChange={handleDurationChange}>
        <option value={10}>10 минут</option>
        <option value={20}>20 минут</option>
        <option value={30}>30 минут</option>
        <option value={40}>40 минут</option>
        <option value={50}>50 минут</option>
        <option value={60}>60 минут</option>
        <option value={90}>90 минут</option>
      </select>
    </div>
  );
};

export default DurationSelector;
