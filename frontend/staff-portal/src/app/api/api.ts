import { useApi } from "@repo/web-kit/hooks/use-api";
import { config } from "../../config";

export const useStaffApi = () => useApi({
  baseUrl: config.api.url,
  auth: config.auth
})