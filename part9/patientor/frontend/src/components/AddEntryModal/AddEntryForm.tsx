import { Button, TextField, Select, MenuItem, InputLabel, SelectChangeEvent, FormLabel, FormControl, Stack, Autocomplete } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryFormValues, HealthCheckRating, EntryType, OccupationalHealthcareEntry, Diagnose } from "../../types";

interface Props{
    entryId: string,
    onCancel: () => void,
    onSubmit: ( values: EntryFormValues, entryId: string) => void
    setWarning: (message: string) => void,
    diagnoses: Diagnose[]
}

interface Discharge {
    date: string,
    criteria: string
}


const AddEntryForm = ({ onCancel, onSubmit, entryId, setWarning, diagnoses }: Props) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[] | undefined>();
    const [healthCheckRating, setHealthcheckRating] = useState<number>(HealthCheckRating.Healthy);
    const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
    const [discharge, setDischarge] = useState<Discharge | undefined>();
    const [employerName, setEmployerName] = useState<string>('');
    const [sickLeave, setSickLeave] = useState<OccupationalHealthcareEntry['sickLeave']>(undefined);

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();

        if (!description || !date || !specialist) {
            setWarning('Please fill in all required fields');
            return;
        }

        const baseEntry = {
            description,
            date,
            specialist,
            diagnosisCodes
        };

        switch (type) {
            case EntryType.HealthCheck: {
                const payload: EntryFormValues = {
                    type,
                    ...baseEntry,
                    healthCheckRating
                };

                onSubmit( payload, entryId);
            }
                break;
            case EntryType.Hospital: {
                if (!discharge?.date || !discharge?.criteria) {
                    setWarning('Discharge date and criteria are required for Hospital entries');
                    return;
                }

                const payload: EntryFormValues = {
                        type,
                        ...baseEntry,
                        discharge
                };

                onSubmit(payload,entryId);
            }
                break;
            case EntryType.OccupationalHealthcare: {
                const payload: EntryFormValues = {
                    type,
                    ...baseEntry,
                    employerName,
                    ...(sickLeave?.startDate &&
                    sickLeave?.endDate && {
                        sickLeave
                    })
                };

                onSubmit(payload, entryId);
                break;
            }
        }

    };

    const onTypeChange = (event: SelectChangeEvent<EntryType>) => {
        event.preventDefault();
        if (typeof event.target.value === 'string') {
            const value = event.target.value;
            const type = Object.values(EntryType).find(t => t === value);
            if (type) {
                setType(type);
            }
        }
    };

    const onRatingChange = (rating: number) => {
        if (typeof rating === 'number') {
            const healthRating = Object.values(HealthCheckRating).find(r => r === rating);
            if (Number(healthRating) >= HealthCheckRating.Healthy && Number(healthRating) <= HealthCheckRating.CriticalRisk ) {
                setHealthcheckRating(healthRating as number);
            }
        }
    };

    return (
        <div>
            <form onSubmit={addEntry}>
                <div className="flex flex-col gap-2">
                    <div>
                        <InputLabel>Type</InputLabel>
                        <Select
                            label='Type'
                            fullWidth
                            value={type}
                            onChange={onTypeChange}
                        >
                        {
                            Object.values(EntryType).map(type =>  
                                <MenuItem key={type} value={type}>
                                {type}
                                </MenuItem>)
                        }
                        </Select>
                    </div>
                    <TextField
                        label='Description'
                        fullWidth
                        value={description}
                        onChange={({ target }) => setDescription(target.value)}
                    />
                    <TextField
                        label="Date"
                        type="date"
                        fullWidth
                        value={date}
                        InputLabelProps={{ shrink: true }}
                        onChange={({ target }) => setDate(target.value)}
                    />
                    <TextField
                        label='Specialist'
                        fullWidth
                        value={specialist}
                        onChange={({ target }) => setSpecialist(target.value)}
                    />
                    <Autocomplete
                        multiple
                        options={diagnoses.map(d => d.code)}
                        getOptionLabel={(option) => {
                            const diagnosis = diagnoses.find(d => d.code === option);
                            return diagnosis ? `${diagnosis.code} ${diagnosis.name}` : option;
                        }}
                        value={diagnosisCodes || []}
                        onChange={(_event, newValue) => setDiagnosisCodes(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Diagnosis Codes"
                                placeholder="Select diagnosis codes"
                            />
                        )}
                    />
                    {
                        (type === EntryType.HealthCheck) && 
                        <div>
                            <Select
                                label='Health Check Rating'
                                fullWidth
                                value={healthCheckRating}
                                onChange={(e) => {
                                    const value = Number(e.target.value);

                                    if (value >= HealthCheckRating.Healthy && value <= HealthCheckRating.CriticalRisk) {
                                        onRatingChange(value);
                                    }
                                }}
                            >
                                {
                                    Object.entries(HealthCheckRating).filter(([key]) => isNaN(Number(key))).map(([key, value]) =>
                                        <MenuItem key={key} value={value}>
                                            {key}
                                        </MenuItem>
                                    )
                                }
                            </Select>   
                            
                        </div>
                    }
                    {
                        (type === EntryType.Hospital) &&
                        <div className="flex flex-col gap-1">
                            <InputLabel>Discharge</InputLabel>
                            <TextField
                                type="date"
                                value={discharge?.date || ""}
                                onChange={(e) =>
                                    setDischarge({
                                        criteria: discharge?.criteria || "",
                                        date: e.target.value
                                    })
                                }
                            />

                            <TextField
                                label="Criteria"
                                value={discharge?.criteria}
                                onChange={(e) =>
                                    setDischarge({
                                        date: discharge?.date || "",
                                        criteria: e.target.value
                                    })
                                }
                            />
                        </div>
                    }
                    {
                        (type === EntryType.OccupationalHealthcare) && 
                        <div className="flex flex-col gap-3">
                            <TextField
                                label="Employer Name"
                                fullWidth
                                value={employerName}
                                onChange={({target}) => setEmployerName(target.value)}
                            />
                            <FormControl fullWidth>
                                <FormLabel>Sick Leave (optional)</FormLabel>

                                <Stack spacing={2} mt={1}>
                                    <TextField
                                        label="Start Date"
                                        type="date"
                                        value={sickLeave?.startDate || ""}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e) => {
                                            setSickLeave({
                                                startDate: e.target.value,
                                                endDate: sickLeave?.endDate || ""
                                            });
                                        }}
                                    />

                                    <TextField
                                        label="End Date"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={sickLeave?.endDate || ""}
                                        onChange={(e) => {
                                            setSickLeave({
                                                startDate: sickLeave?.startDate || "",
                                                endDate: e.target.value
                                            });
                                        }}
                                    />
                                </Stack>
                            </FormControl>
                        </div>
                    }
                </div>
                <div className="flex justify-between mt-10">
                    <Button
                        color="error"
                        variant="contained"
                        style={{ float: "left" }}
                        type="button"
                        onClick={onCancel}
                        >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Add
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddEntryForm;