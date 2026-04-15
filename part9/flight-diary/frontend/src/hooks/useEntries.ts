import type { DiaryEntry } from '../types'
import { useEffect, useState } from "react";
import diaryEntryService from "../services/diaryEntryService";

export const useEntries = () => {
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
      diaryEntryService.getAll().then((data) => {
        setDiaryEntries(data);
      });
    }, []);

    const addEntry = (entry: Omit<DiaryEntry, 'id'>) => {
      diaryEntryService.create(entry).then((data) => {
        setDiaryEntries([...diaryEntries, data]);
      });
    }

    return { diaryEntries, addEntry };
}