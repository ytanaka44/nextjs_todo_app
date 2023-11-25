"use client";

import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import EditableCell from "./EditableCell";
import { TodoItem } from "./types";

const ToDo: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [newTaskName, setNewTaskName] = useState("");

  const addNewItem = () => {
    const newItem: TodoItem = {
      id: uuidv4(),
      taskName: newTaskName,
      status: "Not Started",
      createDate: new Date().toLocaleDateString(),
      updateDate: new Date().toLocaleDateString(),
    };
    setItems([...items, newItem]);
    setNewTaskName("");
  };

  const updateStatus = (id: string, status: TodoItem["status"]) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, status, updateDate: new Date().toLocaleDateString() }
          : item
      )
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: "center",

        flexDirection: "column",
        p: 2,
      }}
    >
      <Typography variant="h2">ToDo App</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Create Date</TableCell>
            <TableCell>Update Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <EditableCell item={item} />
              <TableCell>
                <FormControl fullWidth>
                  <Select
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(
                        item.id,
                        e.target.value as TodoItem["status"]
                      )
                    }
                  >
                    <MenuItem value="Not Started">Not Started</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>{item.createDate}</TableCell>
              <TableCell>{item.updateDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ display: "flex" }}>
        <Button
          onClick={addNewItem}
          startIcon={<AddIcon />}
          sx={{ width: "100%", justifyContent: "flex-start" }}
        >
          新規
        </Button>
      </Box>
    </Box>
  );
};

export default ToDo;
