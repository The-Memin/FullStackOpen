import { Dialog, DialogTitle, DialogContent, Divider, Alert } from "@mui/material";
import AddEntryForm from "./AddEntryForm";
import { Diagnose, EntryFormValues } from "../../types";
import { useState } from "react";

interface Props {
  modalOpen: boolean;
  entryId: string;
  onSubmit: (values: EntryFormValues, entryId: string) => void,
  onClose: () => void;
  error?: string;
  diagnoses: Diagnose[]
}

const AddEntryModal = ({modalOpen, entryId, onClose, onSubmit, error, diagnoses}: Props) => {
    const [warning, setWarning] = useState<string>();
    
    const onChangeWarning = (message: string) => {
        setWarning(message);
        setInterval(() => { setWarning(undefined);
        }, 5000);
    }; 

    return(
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
            <DialogTitle>Add a new Entry</DialogTitle>
            <Divider/>
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}
                {warning && <Alert severity="warning">{warning}</Alert>}
                <AddEntryForm diagnoses={diagnoses} onCancel={onClose} entryId={entryId} onSubmit={ onSubmit } setWarning ={onChangeWarning}/>
            </DialogContent>
        </Dialog>
    );
};

export default AddEntryModal;