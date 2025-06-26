
import axiosClient from "./axiosClient";


export const boardAPI = {
  getFullBoard: async (boardId: string) => {
    const response = await axiosClient.get(`boards/${boardId}/full`);
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


