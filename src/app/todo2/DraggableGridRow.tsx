import { useSortable } from "@dnd-kit/sortable";
import { GridRow, GridRowProps } from "@mui/x-data-grid";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { Box, IconButton } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const DraggableGridRow = React.memo((params: GridRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: params.rowId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
  };
  return (
    <Box ref={setNodeRef} style={style}>
      <GridRow {...params} />
    </Box>
  );
});

export default DraggableGridRow;
