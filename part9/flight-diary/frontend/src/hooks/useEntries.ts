import type { DiaryEntry } from '../types'
import { useEffect, useState } from "react";
import diaryEntryService from "../services/diaryEntryService";
import axios from 'axios';

export const useEntries = () => {
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      diaryEntryService.getAll().then((data) => {
        setDiaryEntries(data);
      });
    }, []);

    const addEntry = async (entry: Omit<DiaryEntry, 'id'>) => {
      try {
        const data = await diaryEntryService.create(entry)
        setDiaryEntries([...diaryEntries, data]);
      } catch (error) {
        if (axios.isAxiosError<string>(error) && error.response) {
          setError(error.response.data);
          setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
        } else {
          setError('An unexpected error occurred');
          setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
        }
      }
    }

    return { diaryEntries, addEntry, error };
}