import { useQuery } from "@tanstack/react-query";
import axiosClient from "../apis/axiosClient";
import { getUserId } from "../utils/auth";

interface Board {
  _id: string;
  title: string;
  createdAt: string;
}

export const useLatestBoardId = () => {
  return useQuery({
    queryKey: ["latest-board"],
    queryFn: async (): Promise<string | null> => {
      try {
        const userId = getUserId();
        const res = await axiosClient.get(`/boards?userId=${userId}`);
        const data: Board[] = res.data;

        if (!data || data.length === 0) return null;

        const sorted = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return sorted[0]?._id || null;
      } catch (error) {
        console.error("Error fetching latest board:", error);
        return null;
      }
    },
    // Thêm staleTime để tránh refetch liên tục
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
