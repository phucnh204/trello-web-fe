import axiosClient from "./axiosClient";

export const cardAPI = {
  createCard: async (data: {
    boardId: string;
    columnId: string;
    title: string;
  }) => {
    const response = await axiosClient.post("/cards", data);
    return response.data;
  },
};