import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { FormEvent } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAddTask: (title: string, description: string) => void;
}

export default function CreateTaskModal({ open, onClose, onAddTask }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const title = formData.get("title") as string;
            const description = formData.get("description") as string;
            onAddTask?.(title, description);
            onClose();
          },
        },
      }}
    >
      <DialogContent>
        <TextField
          autoFocus
          required
          id="title"
          name="title"
          label="Task Title"
          type="text"
          margin="dense"
        />
        <TextField
          required
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={3}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Task</Button>
      </DialogActions>
    </Dialog>
  );
}
