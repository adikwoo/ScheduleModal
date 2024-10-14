import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { scheduleState, appointmentDurationState } from '../store';
import styles from './ScheduleModal.module.scss';

const ScheduleModal = ({ onClose }: { onClose: () => void }) => {
  const [schedule, setSchedule] = useRecoilState(scheduleState);
  const [duration] = useRecoilState(appointmentDurationState);
  const [tempSchedule, setTempSchedule] = useState<string[]>(schedule);
  const [isDragging, setIsDragging] = useState(false);
  const [startSlot, setStartSlot] = useState<string | null>(null);
  const [isDeselecting, setIsDeselecting] = useState(false);

  useEffect(() => {
    setTempSchedule(schedule);
  }, [schedule]);

  const handleSlotClick = (slot: string) => {
    if (tempSchedule.includes(slot)) {
      setTempSchedule(tempSchedule.filter(s => s !== slot));
    } else {
      setTempSchedule([...tempSchedule, slot]);
    }
  };

  const handleSave = () => {
    setSchedule(tempSchedule);
    onClose();
  };

  const generateTimeSlots = (duration: number) => {
    const slots = [];
    let hour = 0;
    let minutes = 0;

    while (hour < 24) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      const endMinutes = minutes + duration;
      const endHour = hour + Math.floor(endMinutes / 60);
      const endMinutesCorrected = endMinutes % 60;

      if (endHour < 24 || (endHour === 23 && endMinutesCorrected <= 59)) {
        slots.push(timeSlot);
      }

      minutes += duration;

      if (minutes >= 60) {
        hour += Math.floor(minutes / 60);
        minutes = minutes % 60;
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots(duration);

  const selectRange = (start: string, end: string) => {
    const startIdx = timeSlots.indexOf(start);
    const endIdx = timeSlots.indexOf(end);
    const range = timeSlots.slice(
      Math.min(startIdx, endIdx),
      Math.max(startIdx, endIdx) + 1
    );

    const updatedSchedule = [...tempSchedule];

    range.forEach(slot => {
      if (isDeselecting) {
        const index = updatedSchedule.indexOf(slot);
        if (index > -1) {
          updatedSchedule.splice(index, 1);
        }
      } else {
        if (!updatedSchedule.includes(slot)) {
          updatedSchedule.push(slot); 
        }
      }
    });

    setTempSchedule(updatedSchedule);
  };

  const handleMouseDown = (slot: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartSlot(slot);
    setIsDeselecting(tempSchedule.includes(slot)); 
  };

  const handleMouseEnter = (slot: string) => {
    if (isDragging && startSlot) {
      selectRange(startSlot, slot); 
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartSlot(null);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <h2>Редактирование графика</h2>
      </div>
      <div
        className={styles.scheduleGrid}
        onMouseUp={handleMouseUp}
      >
        {timeSlots.map((timeSlot) => (
          <div
            key={timeSlot}
            className={`${styles.slot} ${tempSchedule.includes(timeSlot) ? styles.active : ''}`}
            onMouseDown={(e) => handleMouseDown(timeSlot, e)}
            onMouseEnter={() => handleMouseEnter(timeSlot)}
          >
            {timeSlot}
          </div>
        ))}
      </div>
      <div className={styles.actions}>
        <button className={styles.saveButton} onClick={handleSave}>
          Сохранить
        </button>
        <button className={styles.cancelButton} onClick={onClose}>
          Отменить
        </button>
      </div>
    </div>
  );
};

export default ScheduleModal;





