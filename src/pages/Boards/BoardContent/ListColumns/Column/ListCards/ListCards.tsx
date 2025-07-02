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
        minHeight: 56,
        borderRadius: 8,
        background: "linear-gradient(90deg, #e0f7fa 0%, #f4f6fa 100%)",
        border: "2px dashed #00C2E0",
        opacity: 0.5,
        margin: "6px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontStyle: "italic",
        color: "#00C2E0",
        fontWeight: 500,
        fontSize: 15,
        cursor: "pointer",
        transition: "background 0.2s, border 0.2s",
      }}
      data-empty-drop
      onMouseOver={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "#e0f7fa";
        (e.currentTarget as HTMLDivElement).style.border = "2px solid #00C2E0";
        (e.currentTarget as HTMLDivElement).style.opacity = "0.8";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.background =
          "linear-gradient(90deg, #e0f7fa 0%, #f4f6fa 100%)";
        (e.currentTarget as HTMLDivElement).style.border = "2px dashed #00C2E0";
        (e.currentTarget as HTMLDivElement).style.opacity = "0.5";
      }}
    >
      Thả thẻ vào đây
    </div>
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
          gap: 1.2,
          minHeight: 60,
          transition: "background 0.2s",
          background:
            cards.length === 0
              ? "linear-gradient(90deg, #e0f7fa 0%, #f4f6fa 100%)"
              : "transparent",
          borderRadius: 2,
        }}
      >
        {/* Always render cards (if any), then the placeholder */}
        {cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
        <EmptyCardPlaceholder />
      </Box>
    </SortableContext>
  );
}

export default ListCards;
