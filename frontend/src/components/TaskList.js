// frontend/src/components/TaskList.js
import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskList = ({ tasks, onDeleteTask }) => {
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const handleDeleteConfirm = () => {
    if (deleteTaskId) {
      onDeleteTask(deleteTaskId);
      setDeleteTaskId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteTaskId(null);
  };

  if (tasks.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="body1" color="textSecondary">
          Aucune tâche trouvée
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              mb: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <ListItemText
              primary={task.title}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                  >
                    {task.description}
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    color="textSecondary"
                    sx={{ display: "block", mt: 1 }}
                  >
                    Créée le: {new Date(task.created_at).toLocaleDateString()}
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => setDeleteTaskId(task.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={deleteTaskId !== null} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est
            irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Annuler
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskList;
