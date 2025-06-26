export interface Card {
  _id: string;
  boardId: string;
  columnId: string;
  title: string;
  description: string | null;
  cover: string | null;
  memberIds: string[];
  comments: string[];
  attachments: string[];
  FE_PlaceholderCard?: boolean;
}

export interface Column {
  _id: string;
  boardId: string;
  title: string;
  cardOrderIds: string[];
  description?: string;
  cover?: string;
  memberIds?: string[];
  cards: Card[];
}

export interface ColumnsProps {
  columns: Column[];
  boardId: string;
  onColumnAdded?: (newColumn: Column) => void;
  onColumnTitleUpdated?: (columnId: string, newTitle: string) => void;
  onColumnDeleted: (deletedColumnId: string) => void;
}
