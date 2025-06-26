import axiosClient from "./axiosClient";

export const columnAPI = {
  createColumn: async (data: { boardId: string; title: string }) => {
    const response = await axiosClient.post("columns", data);
    return response.data;
  },
  updateColumn: async (columnId: string, title: string) => {
    const response = await axiosClient.patch(`/columns/${columnId}`, { title });
    return response.data;
  },
  deleteColumn: async (columnId: string) => {
    const response = await axiosClient.delete(`/columns/${columnId}`);
    return response.data;
  },
};
