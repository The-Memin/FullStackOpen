import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
};

const create = async (newObject: NewDiaryEntry) => {
    const response = await axios.post<DiaryEntry>(baseUrl, newObject);
    return response.data;
};

export default { getAll, create };