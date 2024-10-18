import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const SubmitTODO = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null); // Allow string or null

  const submitTODO = async () => {
    const response = await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, priority }),
    });

    if (!response.ok) {
      setError("Failed to submit TODO"); // This is now valid
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title && priority) {
      submitTODO();
    } else {
      setError("Title and Priority are required.");
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            label="Priority"
            type="number"
            value={priority}
            onChange={(event) => setPriority(parseInt(event.target.value))}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Button type="submit">Submit TODO</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SubmitTODO;
