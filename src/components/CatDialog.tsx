import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

interface Cat {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
}

interface EditCatDialogProps {
  open: boolean;
  handleClose: () => void;
  cat: Cat;
  handleSave: (id: string, updatedCat: Cat) => void;
}

const EditCatDialog: React.FC<EditCatDialogProps> = ({
  open,
  handleClose,
  cat,
  handleSave,
}) => {
  const [updatedCat, setUpdatedCat] = useState<Cat>({ ...cat });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedCat({ ...updatedCat, name: e.target.value });
  };

  const handleSubmit = () => {
    handleSave(cat.id, updatedCat);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Cat</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={updatedCat.name}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCatDialog;
