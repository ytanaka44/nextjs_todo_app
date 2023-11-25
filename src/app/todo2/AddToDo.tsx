import { Box, Button } from "@mui/material";
import React, { FormEvent, MutableRefObject, useState } from "react";
import { ToDo } from "./types";
import AddIcon from "@mui/icons-material/Add";
import {
  GridApiCommon,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import {
  GridInitialStateCommunity,
  GridStateCommunity,
} from "@mui/x-data-grid/models/gridStateCommunity";
import { addTodo } from "./api";

interface AddToDoProps {
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({
  todos,
  setTodos,
  setRowModesModel,
}) => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addNewTodo();
  };

  const addNewTodo = () => {
    const id = todos.length + 1;
    const newToDo = { id: `${id}`, taskName: "" };
    setTodos([...todos, newToDo]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "taskName" },
    }));
    addTodo(newToDo);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <form onSubmit={handleSubmit}>
        <Button
          startIcon={<AddIcon />}
          sx={{ width: "100%", justifyContent: "flex-start" }}
          type="submit"
        >
          新規
        </Button>
      </form>
    </Box>
  );
};

export default AddToDo;
