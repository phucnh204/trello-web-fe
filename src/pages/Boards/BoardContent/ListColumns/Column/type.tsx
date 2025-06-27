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
}
export interface ColumnProps {
  column: {
    _id: string;
    boardId: string;
    title: string;
    cardOrderIds: string[];
    cards: Card[];
  };
  onColumnTitleUpdated?: (columnId: string, newTitle: string) => void;
  onColumnDeleted?: (columnId: string) => void;
  onCardAdded?: (columnId: string, newCard: Card) => void;
}


export interface IColumn {
  _id: string;
  boardId: string;
  title: string;
  cardOrderIds: string[];
  // cards: ICard[];
}