import type { CloudCannonJavaScriptV1APIFile } from "@cloudcannon/javascript-api";
import { useCallback, useEffect, useState } from "react";
import { useCloudCannonAPI } from "./useCloudCannonAPI";

export const useCloudCannonData = (
  filename: string,
): {
  file: CloudCannonJavaScriptV1APIFile | undefined;
  data: Record<string, any> | any[] | undefined;
} => {
  const cloudcannonAPI = useCloudCannonAPI();
  const file = cloudcannonAPI?.file(filename);

  const [value, setValue] = useState<Record<string, any> | any[] | undefined>();

  const updateTheme = useCallback(async () => {
    const data = await file?.data.get();
    setValue(data);
  }, [file]);

  useEffect(() => {
    if (!file) {
      return;
    }

    updateTheme();
    file.data.addEventListener("change", updateTheme);

    return () => {
      file.data.removeEventListener("change", updateTheme);
    };
  }, [file, updateTheme]);

  return {
    file,
    data: value,
  };
};
