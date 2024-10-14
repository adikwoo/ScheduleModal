import { atom } from 'recoil';


export const scheduleState = atom<string[]>({
  key: 'scheduleState',
  default: [],
});


export const appointmentDurationState = atom<number>({
  key: 'appointmentDurationState',
  default: 30, 
});

