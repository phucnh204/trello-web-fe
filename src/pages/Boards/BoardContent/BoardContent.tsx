import { Box, Button } from "@mui/material";
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
  closestCorners,
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
import AllBoards from "./AllBoards";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { boardAPI } from "../../../apis/board.api";
import { cardAPI } from "../../../apis/card.api";

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
  const [, setActiveDragItemId] = useState<string | null>(null);
  const [activeDragItemType, setActiveDragItemType] = useState<string | null>(
    null
  );
  const [activeDragItemData, setActiveDragItemData] = useState<
    IColumn | ICard | null
  >(null);

  const findColumnByCardId = (cardId: string) => {
    if (cardId === "__empty__") {
      // Trả về column chưa có card nào
      return orderedColumnsState.find((col) => col.cards.length === 0);
    }
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
    } else if (currentData && "_id" in currentData && "title" in currentData) {
      // Kéo một Column
      setActiveDragItemType(ACTIVE_DRAG_ITEM_TYPE.COLUMN);
      setActiveDragItemData(currentData as IColumn);
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

        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        const newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards.length + 1;

        const nextColumns = cloneDeep(preColumns);

        const nextActiveColumn = nextColumns.find(
          (column: IColumn) => column._id === activeColumn._id
        );

        const nextOverColumn = nextColumns.find(
          (column: IColumn) => column._id === overColumn._id
        );

        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card: ICard) => card._id !== activeDraggingCardId
          );

          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card: ICard) => card._id
          );
        }

        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card: ICard) => card._id !== activeDraggingCardId
          );

          nextOverColumn.cards.splice(
            newCardIndex,
            0,
            activeDraggingCardData as ICard
          );

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
            (card: ICard) => card._id
          );
        }
        return nextColumns;
      });
    }
    
  };

  // Kết thúc kéo - drag 1 phần tử
  const handleDragEnd = (event: DragEndEvent) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { active, over } = event;
      if (!active || !over) return;

      const activeColumn = findColumnByCardId(active.id.toString());
      const overColumn = findColumnByCardId(over.id.toString());
      if (!activeColumn || !overColumn) return;

      // const oldIndex = activeColumn.cards.findIndex(
      //   (card) => card._id === active.id
      // );
      const newIndex =
        over.id === "__empty__"
          ? 0
          : overColumn.cards.findIndex((card) => card._id === over.id);

      // Cập nhật UI
      setOrderedColumnsState((prevColumns) => {
        const newColumns = cloneDeep(prevColumns);

        // Xóa card khỏi column cũ
        const fromCol = newColumns.find((col) => col._id === activeColumn._id);
        if (fromCol) {
          fromCol.cards = fromCol.cards.filter(
            (card) => card._id !== active.id
          );
          fromCol.cardOrderIds = fromCol.cards.map((card) => card._id);
        }

        // Thêm card vào column mới đúng vị trí
        const toCol = newColumns.find((col) => col._id === overColumn._id);
        if (toCol) {
          const cardData = activeColumn.cards.find(
            (card) => card._id === active.id
          );
          if (cardData) {
            toCol.cards.splice(newIndex, 0, cardData);
            toCol.cardOrderIds = toCol.cards.map((card) => card._id);
          }
        }
        return newColumns;
      });

      // GỌI API LƯU VỊ TRÍ MỚI (dù cùng hay khác column)
      cardAPI.moveCard(active.id.toString(), {
        newColumnId: overColumn._id,
        newPosition: newIndex,
      });

      setActiveDragItemId(null);
      setActiveDragItemType(null);
      setActiveDragItemData(null);
      return;
    }

    // Xử lý kéo thả column như cũ
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

        // Gửi thứ tự mới của columns lên server để lưu lại
        const newColumnOrderIds = dndOrderedColumns.map((c) => c._id);
        boardAPI.updateColumnOrder(board._id, newColumnOrderIds);
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

  useEffect(() => {
    const columnOrderIds = board.columnOrderIds?.length
      ? board.columnOrderIds
      : board.columns.map((col) => col._id);

    const fixedColumns = board.columns.map((column) => ({
      ...column,
      _id: column._id.toString(),
      cards: (column.cards || []) as ICard[],
    }));

    const ordered = mapOrder(fixedColumns, columnOrderIds, "_id");
    setOrderedColumnsState(ordered);
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

  const [showSidebar, setShowSidebar] = useState(true);

  const handleColumnTitleUpdated = (columnId: string, newTitle: string) => {
    setOrderedColumnsState((prev) =>
      prev.map((col) =>
        col._id === columnId ? { ...col, title: newTitle } : col
      )
    );
  };

  // Handler mới cho việc xóa column
  const handleColumnDeleted = (deletedColumnId: string) => {
    setOrderedColumnsState((prev) =>
      prev.filter((col) => col._id !== deletedColumnId)
    );
  };

  const handleCardAdded = (columnId: string, newCard: ICard) => {
    setOrderedColumnsState((prev) =>
      prev.map((col) =>
        col._id === columnId
          ? {
              ...col,
              cards: [...col.cards, newCard],
              cardOrderIds: [...col.cardOrderIds, newCard._id],
            }
          : col
      )
    );
  };

  return (
    <>
      <Button
        startIcon={
          showSidebar ? <KeyboardDoubleArrowLeftIcon /> : <EventNoteIcon />
        }
        onClick={() => setShowSidebar((prev) => !prev)}
        sx={{
          position: "absolute",
          top: 70,
          left: showSidebar ? 400 : 10,
          zIndex: 10,
          transition: "left 0.3s ease",
        }}
      >
        {showSidebar ? "Ẩn bớt" : "Kế hoạch của bạn"}
      </Button>

      <Box
        sx={{
          display: "flex",
          height: { xs: "auto", md: "calc(100vh - 55px - 65px)" },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* LEFT SIDEBAR */}
        <Box
          component="aside"
          sx={{
            width: { xs: "100vw", md: 400 },
            position: { xs: "relative", md: "absolute" },
            left: { xs: 0, md: showSidebar ? 0 : -400 },
            top: 0,
            height: { xs: "auto", md: "100%" },
            p: { xs: 1, md: 2 },
            overflowY: "auto",
            bgcolor: "primary.50",
            transition: "left 0.3s ease",
            zIndex: 9,
            display: { xs: showSidebar ? "block" : "none", md: "block" },
          }}
        >
          <AllBoards />
        </Box>

        {/* MAIN CONTENT */}
        <Box
          sx={{
            flex: 1,
            marginLeft: { xs: 0, md: showSidebar ? "400px" : 0 },
            transition: "margin-left 0.3s ease",
            minWidth: 0,
            p: { xs: 0.5, md: 0 },
          }}
        >
          <DndContext
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            sensors={sensors}
            collisionDetection={closestCorners}
          >
            <Box
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
                height: "calc(100vh - 55px - 65px)",
                p: "10px 0",
              }}
            >
              <ListColumns
                columns={orderedColumnsState}
                boardId={board._id}
                onColumnAdded={(newColumn) => {
                  setOrderedColumnsState((prev) => {
                    const newColumns = [...prev, newColumn];
                    return mapOrder(
                      newColumns,
                      [...board.columnOrderIds, newColumn._id],
                      "_id"
                    );
                  });
                }}
                onColumnTitleUpdated={handleColumnTitleUpdated}
                onColumnDeleted={handleColumnDeleted}
                onCardAdded={handleCardAdded}
              />

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
        </Box>
      </Box>
    </>
  );
};

export default BoardContent;
