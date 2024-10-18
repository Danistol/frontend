import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import EditCatDialog from "./CatDialog";

interface Cat {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
}

const CatsList = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/cats")
      .then((response) => response.json())
      .then((data) => setCats(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleDelete = (id: string) => {
    fetch(`http://localhost:8080/cats/${id}`, { method: "DELETE" })
      .then(() => setCats(cats.filter((cat) => cat.id !== id)))
      .catch((error) => console.error("Error:", error));
  };

  const handleEditClick = (cat: Cat) => {
    setSelectedCat(cat);
    setOpen(true);
  };

  const handleSave = (id: string, updatedCat: Cat) => {
    fetch(`http://localhost:8080/cats/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCat),
    })
      .then((response) => response.json())
      .then((updatedCat) => {
        setCats(cats.map((cat) => (cat.id === id ? updatedCat : cat)));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cats.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>
                  {new Date(cat.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(cat)}>Update</Button>
                  <Button onClick={() => handleDelete(cat.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedCat && (
        <EditCatDialog
          open={open}
          handleClose={() => setOpen(false)}
          cat={selectedCat}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default CatsList;
