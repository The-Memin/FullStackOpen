const Input = ({ label, id, name, type, value, setValue }) => {
  return (
    <div className="flex flex-col w-full">
        <label htmlFor={id}>{label}:</label>
        <input 
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)} 
          className={`border border-gray-300 rounded-sm outline-blue-400`}
        />
    </div>
  )
}

interface Values{
    date: string;
    weather: string;
    visibility: string;
    comment: string;
}

interface Setters {
    setDate: React.Dispatch<React.SetStateAction<string>>;
    setWeather: React.Dispatch<React.SetStateAction<string>>;
    setVisibility: React.Dispatch<React.SetStateAction<string>>;
    setComment: React.Dispatch<React.SetStateAction<string>>;
}

const FormEntries = ({ values, setters, handleSubmitEntry }: { values: Values; setters: Setters; handleSubmitEntry: (e: React.SyntheticEvent) => void }) => {
    const { date, weather, visibility, comment } = values;
    const { setDate, setWeather, setVisibility, setComment } = setters;

    return (
        <div className="mb-12 w-6/12">
          <h2 className="font-semibold text-2xl mb-5">Add new entry</h2>
          <form onSubmit={handleSubmitEntry} className="border border-gray-300 p-4 rounded-lg shadow-sm">
            <div className="flex flex-wrap gap-3 mb-4">
              <Input label="Date" id="date" name="date" type="date" value={date} setValue={setDate}/>
              <Input label="Weather" id="weather" name="weather" type="text" value={weather} setValue={setWeather}/>
              <Input label="Visibility" id="visibility" name="visibility" type="text" value={visibility} setValue={setVisibility}/>
              <Input label="Comment" id="comment" name="comment" type="text" value={comment} setValue={setComment} />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-20 cursor-pointer py-2 self-center  rounded hover:bg-blue-600 transition-colors">Add</button>
          </form>
        </div>
    )
}

export default FormEntries