"use client";

import {
  DataGrid,
  GridApi,
  GridApiCommon,
  GridColDef,
  GridRow,
  GridRowModel,
  GridRowModesModel,
  GridRowProps,
  useGridApiContext,
  useGridApiRef,
} from "@mui/x-data-grid";
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getAllTodos } from "./api";
import { ToDo } from "./types";
import DraggableDataGrid from "./DraggableDataGrid";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import AddToDo from "./AddToDo";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import {
  GridInitialStateCommunity,
  GridStateCommunity,
} from "@mui/x-data-grid/models/gridStateCommunity";

const columns: GridColDef[] = [
  {
    field: "drag",
    headerName: "",
    width: 50,
    renderCell: (params) => {
      const {
        attributes,
        listeners,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
      } = useSortable({ id: params.id });
      const style = {
        cursor: isDragging ? "grabbing" : "grab",
      };

      return (
        <div
          ref={setActivatorNodeRef}
          style={style}
          {...listeners}
          {...attributes}
        >
          <DragIndicatorIcon />
        </div>
      );
    },
    sortable: false,
  },
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  { field: "taskName", headerName: "TASKNAME", width: 180, editable: true },
];

const App: React.FC = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  // todoを取得するAPI
  const fetchGetAllTodos = async () => {
    const todos = await getAllTodos();
    setTodos(todos);
  };

  useEffect(() => {
    fetchGetAllTodos();
  }, []);

  const handleCangeRows = useCallback(
    (rows: ToDo[]) => {
      setTodos(rows);
    },
    [setTodos]
  );

  return (
    <div className="App">
      <Box>
        <DraggableDataGrid
          columns={columns}
          rows={todos}
          setTodos={setTodos}
          onChange={handleCangeRows}
          rowModesModel={rowModesModel}
          setRowModesModel={setRowModesModel}
        />
        <AddToDo
          todos={todos}
          setTodos={setTodos}
          setRowModesModel={setRowModesModel}
        />
      </Box>
    </div>
  );
};

export default App;
