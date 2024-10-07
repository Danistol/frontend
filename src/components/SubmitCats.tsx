import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const SubmitCats = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const submitCat = async () => {
    const response = await fetch("http://localhost:8080/cats", {
      method: "POST",
      body: JSON.stringify({ name: name }),
    });
  };

  //snackbar

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    submitCat();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextField onChange={(event) => setName(event.target.value)} />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SubmitCats;
