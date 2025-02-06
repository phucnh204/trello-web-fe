import { Box } from "@mui/material";
import Card from "./Card/Card";

interface CardProps {
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
interface ListCardsProps {
  cards: CardProps[]; // cards là một mảng các object Card
}
function ListCards({ cards }: ListCardsProps) {
  return (
    <Box
      sx={{
        mt: 1,
        px: "15px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {/* Card 1 */}
      {cards?.map((card) => (
        <Card key={card._id} card={card} />
      ))}
    </Box>
  );
}

export default ListCards;
