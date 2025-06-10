// frontend/src/components/TaskForm.js
import React, { useState } from "react";
import { Box, TextField, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title,
      description,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label="Titre de la tâche"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<AddIcon />}
            sx={{ height: "100%" }}
          >
            Ajouter
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskForm;
