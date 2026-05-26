import { Dialog, DialogTitle, DialogContent, Divider, Alert } from "@mui/material";
import AddEntryForm from "./AddEntryForm";
import { EntryFormValues } from "../../types";

interface Props {
  modalOpen: boolean;
  entryId: string;
  onSubmit: (values: EntryFormValues, entryId: string) => void,
  onClose: () => void;
  error?: string;
}

const AddEntryModal = ({modalOpen, entryId, onClose, onSubmit, error}: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new Entry</DialogTitle>
        <Divider/>
        <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <AddEntryForm onCancel={onClose} entryId={entryId} onSubmit={ onSubmit }/>
        </DialogContent>
    </Dialog>
);

export default AddEntryModal;