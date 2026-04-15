import Entries from "./components/Entries"
import useFormEntries from "./hooks/useFormEntries"
import { Weather, Visibility } from "./types"
import { useEntries } from "./hooks/useEntries"
import FormEntries from "./components/FormEntries"

function App() {
  const { diaryEntries, addEntry } = useEntries();
  const { setters, values, cleanForm } = useFormEntries();
  
  const handleSubmitEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    addEntry({
      date: values.date,
      weather: values.weather as Weather,
      visibility: values.visibility as Visibility,
      comment: values.comment
    });
    cleanForm();
  }

  return (
    <div className="m-auto max-w-5xl py-12">
        <FormEntries 
          values={values}
          setters={setters}
          handleSubmitEntry={handleSubmitEntry}
        />
        <Entries diaryEntries={diaryEntries}/>
    </div>
  )
}

export default App