"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import TableCell from "@mui/material/TableCell";
import {
  Box,
  Button,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { TodoItem } from "./types";

interface EditableCellProps {
  item: TodoItem;
  // text: string;
}

const EditableCell: React.FC<EditableCellProps> = ({ item }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [taskName, setTaskName] = useState(item.taskName);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(item.taskName);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setEditMode(false);
    setIsHovering(false);
    setError("");
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTaskName(e.target.value);
    setTaskName(e.target.value);
  };
  const handleSave = () => setIsEditing(false);

  return (
    <TableCell onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Box display="flex" alignItems="center">
        {isEditing ? (
          <TextField
            ref={inputRef}
            autoFocus
            type="text"
            value={editedTaskName}
            onChange={handleTaskNameChange}
            onBlur={handleSave}
            fullWidth
          />
        ) : (
          <Typography fontSize="14px">{taskName}</Typography>
        )}
        <Box>
          {isHovering && !isEditing ? (
            <IconButton size="small" onClick={handleEditClick}>
              <EditIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton size="small" style={{ visibility: "hidden" }}>
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
    </TableCell>
  );
};

export default EditableCell;
