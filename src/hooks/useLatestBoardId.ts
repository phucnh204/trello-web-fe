import { useQuery } from "@tanstack/react-query";
import axiosClient from "../apis/axiosClient";

interface Board {
  _id: string;
  title: string;
  createdAt: string;
}

export const useLatestBoardId = () => {
  return useQuery({
    queryKey: ["latest-board"],
    queryFn: async (): Promise<string | null> => {
      const res = await axiosClient.get("/boards?userId=user-dev-01");
      const data: Board[] = res.data;

      const sorted = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return sorted?.[0]?._id || null;
    },
  });
};
