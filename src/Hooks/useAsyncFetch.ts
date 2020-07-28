import { useCallback } from "react";
import usePromise, { ResultObject } from "./usePromise";

// TODO delete after greg/scaling merged, use GET from Helper.js
async function GET({ url }: { url: string }): Promise<unknown> {
  url;
  return;
}

export default function useAsyncFetch<ResultType>(
  url: string,
  dependencies?: Array<unknown> | null,
  defaultValue?: ResultType
): [ResultObject<ResultType>, (params?: Record<string, unknown>) => void] {
  const queryFunc = useCallback(async (): Promise<ResultType> => {
    return (await GET({ url })) as ResultType;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...(dependencies || [])]);

  const [result, refetch] = usePromise<ResultType>(queryFunc, {}, defaultValue);

  return [result, refetch];
}
