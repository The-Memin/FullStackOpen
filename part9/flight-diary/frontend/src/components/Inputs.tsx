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

const InputRadioButtons = ({ options, label, setValue, value }) => {
  return (
    <div className="flex gap-3">
      <span>{label}:</span>
      {
        options.map((option: string) => (
          <div key={option} className="flex items-center gap-2">
            <input name={label.toLowerCase()} type="radio" id={option} value={option} checked={option === value} onChange={(e) => setValue(e.target.value)} />
            <label htmlFor={option}>{option}</label>
          </div>
        ))
      }
    </div>
  )
} 

export { Input, InputRadioButtons }