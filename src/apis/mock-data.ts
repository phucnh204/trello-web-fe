interface Card {
  _id: string;
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  cover: string | null;
  memberIds: string[];
  comments: string[];
  attachments: string[];
  status: string;
  dueDate: string;
}

// interface Column {
//   _id: string;
//   boardId: string;
//   title: string;
//   cardOrderIds: string[];
//   cards: Card[];
// }

const mockData = {
  board: {
    _id: "board-id-01",
    title: "Dự án Trello Clone",
    description: "Quản lý công việc nhóm với mô hình Kanban",
    type: "Private",
    ownerIds: ["user-admin-01"],
    memberIds: ["user-dev-01", "user-dev-02", "user-tester-01"],
    columnOrderIds: [
      "column-id-01",
      "column-id-02",
      "column-id-03",
      "column-id-04",
    ],
    columns: [
      {
        _id: "column-id-01",
        boardId: "board-id-01",
        title: "Việc cần làm",
        cardOrderIds: [] as string[], // Chỉ định kiểu dữ liệu cho cardOrderIds
        cards: [] as Card[], // Chỉ định kiểu dữ liệu cho cards
      },
      {
        _id: "column-id-02",
        boardId: "board-id-01",
        title: "Đang thực hiện",
        cardOrderIds: [] as string[],
        cards: [] as Card[],
      },
      {
        _id: "column-id-03",
        boardId: "board-id-01",
        title: "Hoàn thành",
        cardOrderIds: [] as string[],
        cards: [] as Card[],
      },
      {
        _id: "column-id-04",
        boardId: "board-id-01",
        title: "Tồn đọng",
        cardOrderIds: [] as string[],
        cards: [] as Card[],
      },
    ],
  },
};

const generateMockData = () => {
  const columns = mockData.board.columns;

  for (let i = 0; i < 100; i++) {
    const cardId = `card-id-${i + 1}`;
    const columnIndex = i % 4;
    const column = columns[columnIndex];

    const card: Card = {
      _id: cardId,
      boardId: "board-id-01",
      columnId: column._id,
      title: `Công việc ${i + 1}`,
      description: `Mô tả cho công việc ${i + 1}`,
      cover: i % 5 === 0 ? `https://example.com/cover-${i + 1}.png` : null,
      memberIds: [`user-dev-${(i % 3) + 1}`, `user-tester-${(i % 2) + 1}`],
      comments: [
        `Bình luận 1 cho công việc ${i + 1}`,
        `Bình luận 2 cho công việc ${i + 1}`,
      ],
      attachments: i % 4 === 0 ? [`attachment-${i + 1}.pdf`] : [],
      status:
        columnIndex === 0
          ? "pending"
          : columnIndex === 1
          ? "in-progress"
          : columnIndex === 2
          ? "done"
          : "backlog",
      dueDate: `2025-03-${(i % 30) + 1}`,
    };

    column.cards.push(card); 
    column.cardOrderIds.push(cardId);
  }
};

generateMockData();
