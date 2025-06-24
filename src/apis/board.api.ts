
import axiosClient from "./axiosClient";


export const boardAPI = {
  getFullBoard: async (boardId: string) => {
    const response = await axiosClient.get(`/boards/${boardId}/full`);
    return response.data;
  },
};
