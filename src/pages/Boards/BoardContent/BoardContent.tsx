import { Box, Button, Fade, Typography } from "@mui/material";
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
import { useEffect, useState, useRef } from "react";
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
import { LightbulbCircleOutlined } from "@mui/icons-material";

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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState<IColumn | null>(null);
  const [selectedBoardTitle, setSelectedBoardTitle] = useState<string | null>(
    null
  );
  const columnsContainerRef = useRef<HTMLDivElement>(null);

  // Cải thiện hàm findColumnByCardId
  const findColumnByCardId = (cardId: string) => {
    return orderedColumnsState.find((column) =>
      column?.cards?.some((card) => card._id === cardId)
    );
  };

  // Hàm tìm column bằng ID
  const findColumnById = (columnId: string) => {
    return orderedColumnsState.find((column) => column._id === columnId);
  };

  // Bắt đầu kéo - drag 1 phần tử
  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragItemId(event?.active?.id?.toString() ?? null);
    const currentData = event?.active?.data?.current;

    if (currentData?.columnId) {
      // Kéo một Card
      setActiveDragItemType(ACTIVE_DRAG_ITEM_TYPE.CARD);
      setActiveDragItemData(currentData as ICard);
      // Lưu lại column ban đầu khi kéo card
      const foundColumn = findColumnByCardId(event.active.id.toString());
      setOldColumnWhenDraggingCard(foundColumn ? foundColumn : null);
    } else if (currentData && "_id" in currentData && "title" in currentData) {
      // Kéo một Column
      setActiveDragItemType(ACTIVE_DRAG_ITEM_TYPE.COLUMN);
      setActiveDragItemData(currentData as IColumn);
    }
  };

  // Trong quá trình kéo - drag 1 phần tử
  const handleDragOver = (event: DragOverEvent) => {
    // Không xử lý khi kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = event;
    if (!active || !over) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    // Tìm column chứa card đang kéo và column đích
    const activeColumn = findColumnByCardId(activeDraggingCardId.toString());
    let overColumn: IColumn | undefined;

    // Xử lý khi thả vào vùng trống (empty column)
    if (overCardId === "__empty__") {
      const overColumnId = over.data?.current?.columnId;
      overColumn = overColumnId ? findColumnById(overColumnId) : undefined;
    } else {
      // Xử lý khi thả vào card khác hoặc column
      overColumn =
        findColumnByCardId(overCardId.toString()) ||
        findColumnById(overCardId.toString());
    }

    if (!activeColumn || !overColumn) return;

    // Chỉ xử lý khi kéo card sang column khác
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumnsState((prevColumns) => {
        // Tìm vị trí để chèn card
        let overCardIndex = 0;
        if (overCardId !== "__empty__") {
          // Nếu thả vào card khác, tìm vị trí của card đó
          overCardIndex =
            overColumn?.cards?.findIndex((card) => card._id === overCardId) ??
            0;
        }

        // Xác định vị trí chèn dựa trên vị trí chuột
        const isBelowOverItem =
          active.rect.current.translated &&
          over.rect &&
          active.rect.current.translated.top >
            over.rect.top + over.rect.height / 2;

        const modifier = isBelowOverItem ? 1 : 0;
        const newCardIndex = overCardIndex + modifier;

        const nextColumns = cloneDeep(prevColumns);

        const nextActiveColumn = nextColumns.find(
          (column: IColumn) => column._id === activeColumn._id
        );

        const nextOverColumn = nextColumns.find(
          (column: IColumn) => column._id === overColumn._id
        );

        if (nextActiveColumn && nextOverColumn) {
          // Xóa card khỏi column cũ
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card: ICard) => card._id !== activeDraggingCardId
          );
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card: ICard) => card._id
          );

          // Xóa card nếu đã tồn tại trong column đích (tránh duplicate)
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card: ICard) => card._id !== activeDraggingCardId
          );

          // Cập nhật columnId cho card
          const updatedCard = {
            ...activeDraggingCardData,
            columnId: overColumn._id,
          } as ICard;

          // Thêm card vào vị trí mới
          nextOverColumn.cards.splice(newCardIndex, 0, updatedCard);
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
    const { active, over } = event;

    setOldColumnWhenDraggingCard(null);

    if (!active || !over) {
      setActiveDragItemId(null);
      setActiveDragItemType(null);
      setActiveDragItemData(null);
      return;
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      let overColumn: IColumn | undefined;
      let newIndex = 0;

      if (overCardId === "__empty__") {
        const overColumnId = over.data?.current?.columnId;
        overColumn = overColumnId ? findColumnById(overColumnId) : undefined;
        newIndex = overColumn?.cards.length ?? 0;
      } else {
        overColumn =
          findColumnByCardId(overCardId.toString()) ||
          findColumnById(overCardId.toString());

        if (overColumn) {
          const overCardIndex = overColumn.cards.findIndex(
            (card) => card._id === overCardId
          );
          if (overCardIndex !== -1) {
            const isBelowOverItem =
              over.rect &&
              active.rect.current.translated &&
              active.rect.current.translated.top >
                over.rect.top + over.rect.height / 2;
            newIndex = isBelowOverItem ? overCardIndex + 1 : overCardIndex;
          } else {
            newIndex = overColumn.cards.length;
          }
        }
      }

      const activeColumn = findColumnByCardId(activeDraggingCardId.toString());
      if (!activeColumn || !overColumn) {
        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
        return;
      }

      // Nếu kéo trong cùng column
      if (activeColumn._id === overColumn._id) {
        const oldIndex = activeColumn.cards.findIndex(
          (card) => card._id === activeDraggingCardId
        );
        if (
          oldIndex === newIndex ||
          (oldIndex === newIndex - 1 && newIndex > oldIndex)
        ) {
          setActiveDragItemId(null);
          setActiveDragItemType(null);
          setActiveDragItemData(null);
          return;
        }
        setOrderedColumnsState((prevColumns) => {
          const newColumns = cloneDeep(prevColumns);
          const targetColumn = newColumns.find(
            (col) => col._id === activeColumn._id
          );
          if (targetColumn) {
            const [movedCard] = targetColumn.cards.splice(oldIndex, 1);
            targetColumn.cards.splice(
              newIndex > oldIndex ? newIndex - 1 : newIndex,
              0,
              movedCard
            );
            targetColumn.cardOrderIds = targetColumn.cards.map(
              (card) => card._id
            );
          }
          return newColumns;
        });
      } else {
        // Kéo sang column khác: cập nhật state và gọi API lưu DB
        setOrderedColumnsState((prevColumns) => {
          const newColumns = cloneDeep(prevColumns);
          const sourceColumn = newColumns.find(
            (col) => col._id === activeColumn._id
          );
          const targetColumn = newColumns.find(
            (col) => col._id === overColumn._id
          );
          if (sourceColumn && targetColumn) {
            sourceColumn.cards = sourceColumn.cards.filter(
              (card) => card._id !== activeDraggingCardId
            );
            sourceColumn.cardOrderIds = sourceColumn.cards.map(
              (card) => card._id
            );
            const updatedCard = {
              ...activeDraggingCardData,
              columnId: overColumn._id,
            } as ICard;
            targetColumn.cards = targetColumn.cards.filter(
              (card) => card._id !== activeDraggingCardId
            );
            targetColumn.cards.splice(newIndex, 0, updatedCard);
            targetColumn.cardOrderIds = targetColumn.cards.map(
              (card) => card._id
            );
          }
          return newColumns;
        });

        // Gọi API lưu DB khi kéo sang column khác, KHÔNG gọi lại getFullBoard
        try {
          cardAPI
            .moveCard(activeDraggingCardId.toString(), {
              newColumnId: overColumn._id,
              newPosition: newIndex,
            })
            // .then(() => {
            //   // Đã cập nhật state local, không cần gọi lại getFullBoard ở đây
            // });
            .catch((error: any) => {
              console.error("Error moving card:", error);
            });
        } catch (error) {
          console.error("Error moving card:", error);
        }
      }
    }
    // Xử lý kéo thả column
    else if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldIndex = orderedColumnsState.findIndex(
          (c) => c._id === active.id
        );
        const newIndex = orderedColumnsState.findIndex(
          (c) => c._id === over.id
        );

        if (oldIndex !== -1 && newIndex !== -1) {
          const dndOrderedColumns = arrayMove(
            orderedColumnsState,
            oldIndex,
            newIndex
          );
          setOrderedColumnsState(dndOrderedColumns);

          // Gửi thứ tự mới lên server
          const newColumnOrderIds = dndOrderedColumns.map((c) => c._id);
          try {
            boardAPI.updateColumnOrder(board._id, newColumnOrderIds);
          } catch (error) {
            console.error("Error updating column order:", error);
          }
        }
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

  // Scroll to end when columns change
  useEffect(() => {
    if (columnsContainerRef.current) {
      columnsContainerRef.current.scrollTo({
        left: columnsContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [orderedColumnsState.length]);

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
      {/* Hiển thị title board ở góc giữa trên */}
      {selectedBoardTitle && (
        <Fade in={true} timeout={500}>
          <Box
            sx={{
              position: "fixed",
              top: 24,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1300,
              bgcolor: "#e3f2fd",
              px: 3.5,
              py: 1.5,
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0, 194, 224, 0.15)",
              fontWeight: 700,
              fontSize: 22,
              color: "#1565c0",
              textAlign: "center",
              minWidth: 200,
              maxWidth: "70vw",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              pointerEvents: "none",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <LightbulbCircleOutlined sx={{ fontSize: 24, color: "#0288d1" }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#1565c0",
                letterSpacing: 0.5,
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                m: 0,
                p: 0,
                fontSize: "1.15rem",
              }}
            >
              {selectedBoardTitle}
            </Typography>
          </Box>
        </Fade>
      )}

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
            width: { xs: "100vw", sm: 280, md: 340, lg: 400 },
            minWidth: { xs: 0, sm: 180, md: 240, lg: 320 },
            maxWidth: { xs: "100vw", sm: 340, md: 400, lg: 500 },
            position: { xs: "relative", md: "absolute" },
            left: { xs: 0, md: showSidebar ? 0 : -400 },
            top: 0,
            height: { xs: "auto", md: "100%" },
            p: { xs: 0.5, sm: 1.5, md: 2 },
            overflowY: "auto",
            bgcolor: "primary.50",
            transition: "left 0.3s ease, width 0.3s, padding 0.3s",
            zIndex: 9,
            display: { xs: showSidebar ? "block" : "none", md: "block" },
            boxSizing: "border-box",
          }}
        >
          <AllBoards
            onBoardSelect={(title: string) => setSelectedBoardTitle(title)}
          />
        </Box>

        {/* MAIN CONTENT */}
        <Box
          sx={{
            flex: 1,
            marginLeft: {
              xs: 0,
              md: showSidebar ? "340px" : 0,
              lg: showSidebar ? "400px" : 0,
            },
            transition: "margin-left 0.3s cubic-bezier(.4,2,.6,1)",
            minWidth: 0,
            p: { xs: 0.5, md: 0 },
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #34495e 0%, #1976d2 100%)"
                : "linear-gradient(135deg, #e0f7fa 0%, #f4f6fa 100%)",
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
              ref={columnsContainerRef}
              sx={{
                display: "flex",
                overflowX: "auto",
                bgcolor: "transparent",
                height: "calc(100vh - 55px - 65px)",
                p: "10px 0",
                borderRadius: 3,
                boxShadow: "0 2px 12px 0 #00C2E022",
                transition: "box-shadow 0.2s",
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
