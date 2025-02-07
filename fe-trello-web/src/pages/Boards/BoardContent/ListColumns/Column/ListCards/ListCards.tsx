import { Box } from "@mui/material";
import Card from "./Card/Card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ListCardsProps } from "./type";

function ListCards({ cards }: ListCardsProps) {
  return (
    <SortableContext
      items={cards?.map((c) => c._id)}
      strategy={verticalListSortingStrategy}
    >
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
    </SortableContext>
  );
}

export default ListCards;
