import { useQuery } from "@tanstack/react-query";
import { boardAPI } from "../apis/board.api";

export const useBoard = (boardId: string) => {
  return useQuery({
    queryKey: ["board", boardId],
    queryFn: async () => {
      const data = await boardAPI.getFullBoard(boardId);
      console.log("🔍 useBoard data:", data);
      return data;
    },
    enabled: !!boardId,
  });
};

