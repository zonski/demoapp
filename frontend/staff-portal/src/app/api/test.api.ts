import { useMutation, useQuery } from "@tanstack/react-query";
import { useStaffApi } from "./api";

const keys = {
  all: () => ["test"] as const,
};

export const useTestData = () => {
  const api = useStaffApi()
  return useQuery({
    queryKey: keys.all(),     
    queryFn: () => api.get<{message: string}>('/')
  });
};

export const useTestDataMutate = () => {
  const api = useStaffApi()
  return useMutation({
    mutationFn: (message: string) => api.post<{message: string}>('/', {message}),
  });
};
