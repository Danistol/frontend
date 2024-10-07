import { Box, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

type Cat = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    const fetchCats = async () => {
      const response = await fetch("http://localhost:8080/cats");
      const data = await response.json();

      setCats(data);
    };

    fetchCats();
  }, []);
  return (
    <Box>
      <Typography variant="h3">Cats</Typography>
      <List>
        {cats.map((cat) => (
          <ListItem key={cat.id}>{JSON.stringify(cat)}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Cats;
