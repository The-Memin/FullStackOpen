import diaryData from '../../data/diaries';

import { NonSensitiveEntries, DiaryEntry, NewDiaryEntry } from '../types';

const diaries:DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = ():NonSensitiveEntries[] => {
  return diaries.map(({ id, date, weather, visibility, comment }) => ({
    id,
    date,
    weather,
    visibility,
    comment
  }));
};

const findById = (id:number):DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById
};