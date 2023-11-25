import {
  DataGrid,
  GridApi,
  GridApiCommon,
  GridColDef,
  GridRowModel,
  GridRowModesModel,
  useGridApiRef,
} from "@mui/x-data-grid";
import { ToDo } from "./types";
import React, { MutableRefObject, useCallback, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import DraggableGridRow from "./DraggableGridRow";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import {
  GridInitialStateCommunity,
  GridStateCommunity,
} from "@mui/x-data-grid/models/gridStateCommunity";
import { editTodo } from "./api";

interface DraggableDataGridProps {
  columns: GridColDef[];
  rows: ToDo[];
  setTodos: any;
  onChange: (rows: ToDo[]) => void;
  rowModesModel: any;
  setRowModesModel: any;
}

const DraggableDataGrid: React.FC<DraggableDataGridProps> = React.memo(
  ({ columns, rows, setTodos, onChange, rowModesModel, setRowModesModel }) => {
    // ドラッグ可能なセンサーを設定
    const sensors = useSensors(useSensor(PointerSensor));

    // ドラッグ終了時の処理
    const handleDragEnd = useCallback(
      async (event: DragEndEvent) => {
        const { active, over } = event;
        if (over) {
          const oldIndex = rows.findIndex((row) => row.id === active.id);
          const newIndex = rows.findIndex((row) => row.id === over.id);
          const newTodos = arrayMove(rows, oldIndex, newIndex);
          onChange(newTodos);
        }
      },
      [rows, onChange]
    );

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };

    const processRowUpdate = async (newRow: GridRowModel) => {
      try {
        // APIを呼び出して行データを更新
        const updatedTodo = await editTodo(
          newRow.id as string,
          newRow.taskName as string
        );

        // ローカルの状態を更新
        setTodos(rows.map((row) => (row.id === newRow.id ? updatedTodo : row)));

        return updatedTodo;
      } catch (error) {
        // エラー処理
        return newRow; // エラーがあった場合は、元の行データを返す
      }
    };

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[
          restrictToVerticalAxis,
          restrictToWindowEdges,
          restrictToParentElement,
        ]}
        autoScroll={false}
      >
        <SortableContext
          items={rows.map((todo) => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            processRowUpdate={processRowUpdate}
            slots={{ row: DraggableGridRow }}
            autoHeight
            // checkboxSelection
            disableRowSelectionOnClick
            onRowModesModelChange={handleRowModesModelChange}
          />
        </SortableContext>
      </DndContext>
    );
  }
);

export default DraggableDataGrid;
