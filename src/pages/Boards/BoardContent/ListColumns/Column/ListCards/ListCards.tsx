import { Box } from "@mui/material";
import Card from "./Card/Card";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ListCardsProps } from "./type";

function EmptyCardPlaceholder() {
  const { setNodeRef, attributes, listeners } = useSortable({
    id: "__empty__",
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        minHeight: 48,
        borderRadius: 6,
        background: "transparent",
        pointerEvents: "none",
      }}
      data-empty-drop
    />
  );
}
function ListCards({ cards }: ListCardsProps) {
  return (
    <SortableContext
      items={cards.length > 0 ? cards.map((c) => c._id) : ["__empty__"]}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
          mt: 1,
          px: "10px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {cards.length === 0 ? (
          <EmptyCardPlaceholder />
        ) : (
          cards.map((card) => <Card key={card._id} card={card} />)
        )}
      </Box>
    </SortableContext>
  );
}

export default ListCards;
