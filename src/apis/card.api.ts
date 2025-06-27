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
  moveCard: async (
    cardId: string,
    data: { newColumnId: string; newPosition: number }
  ) => {
    const response = await axiosClient.put(`/cards/${cardId}/move`, data);
    return response.data;
  },
  updateCard: async (cardId: string, data: { title: string }) => {
    const response = await axiosClient.put(`/cards/${cardId}`, data);
    return response.data;
  },
  deleteCard: async (cardId: string) => {
    const response = await axiosClient.delete(`/cards/${cardId}`);
    return response.data;
  },
};