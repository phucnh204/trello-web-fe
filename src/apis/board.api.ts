import axiosClient from "./axiosClient";
import { getUserId } from "../utils/auth";

export const boardAPI = {
  getFullBoard: async (boardId: string) => {
    const userId = getUserId();
    const response = await axiosClient.get(`boards/${boardId}/full`, {
      params: { userId }, // Truyền userId lên BE
    });
    return response.data;
  },
  updateColumnOrder: async (boardId: string, columnOrderIds: string[]) => {
    const response = await axiosClient.patch(
      `/boards/${boardId}/update-column-order`,
      {
        columnOrderIds,
      }
    );
    return response.data;
  },
};
