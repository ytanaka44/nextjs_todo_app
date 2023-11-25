export interface TodoItem {
  id: string;
  taskName: string;
  status: "Not Started" | "In Progress" | "Done";
  createDate: string;
  updateDate: string;
}
