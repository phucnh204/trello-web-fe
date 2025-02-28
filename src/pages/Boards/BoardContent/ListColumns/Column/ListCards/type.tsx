export interface CardProps {
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

// Định nghĩa kiểu cho props của ListCards
export interface ListCardsProps {
  cards: CardProps[];
}
