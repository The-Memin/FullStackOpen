import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types";
import diaryEntryService from "./services/diaryEntryService";

const Label = ({ name, value }: { name: string; value: string }) => (
  <p className="text-gray-600">
    {name}: <span className="font-medium">{value}</span>
  </p>
);

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryEntryService.getAll().then((data) => {
      setDiaryEntries(data);
    });
  }, []);

  return (
    <div>

        <div className="m-auto max-w-5xl py-12">
          <h2 className="text-2xl font-semibold">Diary Entries</h2>
          {
            diaryEntries.map( entry => (
              <div key={entry.id} className="mt-4 border rounded-lg border-gray-200 p-4 shadow-sm">
                <h3 className="font-semibold text-xl">{entry.date}</h3>
                <Label name="Weather" value={entry.weather} />
                <Label name="Visibility" value={entry.visibility} />
                {
                  entry.comment && <Label name="Comment" value={entry.comment} />
                }
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default App