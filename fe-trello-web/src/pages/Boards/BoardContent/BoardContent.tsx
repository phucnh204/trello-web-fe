import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
import { BoardProps } from "../../../apis/type-mock-data";
import { mapOrder } from "../../../utils/sort";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import {
  Card as ICard,
  ColumnsProps,
  Column as IColumn,
} from "./ListColumns/type";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import { cloneDeep } from "lodash";
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent: React.FC<BoardProps> = ({ board }) => {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  const sensors = useSensors(pointerSensor);

  const [orderedColumnsState, setOrderedColumnsState] = useState<
    ColumnsProps["columns"]
  >([]);
  const [activeDragItemId, setActiveDragItemId] = useState<string | null>(null);
  const [activeDragItemType, setActiveDragItemType] = useState<string | null>(
    null
  );
  const [activeDragItemData, setActiveDragItemData] = useState<
    IColumn | ICard | null
  >(null);

  const findColumnByCardId = (cardId: string) => {
    return orderedColumnsState.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    );
  };

  // Bắt đầu kéo - drag 1 phần tử
  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragItemId(event?.active?.id?.toString() ?? null);
    const currentData = event?.active?.data?.current;

    if (currentData?.columnId) {
      // Kéo một Card
      setActiveDragItemType(ACTIVE_DRAG_ITEM_TYPE.CARD);
      setActiveDragItemData(currentData as ICard);
    } else {
      // Kéo một Column
      setActiveDragItemType(ACTIVE_DRAG_ITEM_TYPE.COLUMN);
      setActiveDragItemData(currentData as ColumnsProps);
    }
  };

  // Trong quá trình kéo - drag 1 phần tử
  const handleDragOver = (event: DragOverEvent) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = event;
    if (!active || !over) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId.toString());
    const overColumn = findColumnByCardId(overCardId.toString());

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumnsState((preColumns) => {
        const overCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        );

        let newCardIndex: number;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards.length + 1;

        const nextColumns = cloneDeep(preColumns);

        // const nextActiveColumn = next

        return nextColumns;
      });
    }
  };

  // Kết thúc kéo - drag 1 phần tử
  const handleDragEnd = (event: DragEndEvent) => {
    console.log("handleDragEnd: ", event);

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      return;
    }

    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = orderedColumnsState.findIndex(
        (c) => c._id === active.id
      );
      const newIndex = orderedColumnsState.findIndex((c) => c._id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const dndOrderedColumns = arrayMove(
          orderedColumnsState,
          oldIndex,
          newIndex
        );
        setOrderedColumnsState(dndOrderedColumns);
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

  useEffect(() => {
    if (!board?.columns || !board?.columnOrderIds) return;
    const fixedColumns = board.columns.map((column) => ({
      ...column,
      cards: column.cards as ICard[],
    }));
    setOrderedColumnsState(mapOrder(fixedColumns, board.columnOrderIds, "_id"));
  }, [board]);

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          height: "calc(100vh - 55px - 65px)",
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumnsState} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}

          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
            activeDragItemData &&
            "cardOrderIds" in activeDragItemData && (
              <Column column={activeDragItemData as IColumn} />
            )}

          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD &&
            activeDragItemData &&
            "_id" in activeDragItemData && (
              <Card card={activeDragItemData as ICard} />
            )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default BoardContent;
