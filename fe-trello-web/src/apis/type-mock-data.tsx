export interface BoardProps {
  board: {
    _id: string;
    title: string;
    description: string;
    type: string;
    ownerIds: string[];
    memberIds: string[];
    columnOrderIds: string[];
    columns: {
      _id: string;
      boardId: string;
      title: string;
      cardOrderIds: string[];
      cards: {
        _id: string;
        columnId: string;
        title: string;
      }[];
    }[];
  };
}
