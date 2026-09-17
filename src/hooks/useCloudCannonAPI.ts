import type {
  CloudCannonEditorWindow,
  CloudCannonJavaScriptV1API,
} from "@cloudcannon/javascript-api";
import { useCallback, useEffect, useState } from "react";

declare const window: CloudCannonEditorWindow;

export const useCloudCannonAPI = () => {
  const [cloudcannonAPI, setCloudCannonAPI] =
    useState<CloudCannonJavaScriptV1API | null>(null);

  const loadAPI = useCallback(() => {
    if (window.CloudCannonAPI) {
      const cloudcannon = window.CloudCannonAPI.useVersion("v1", true) as any;
      setCloudCannonAPI(cloudcannon);
      return;
    }
  }, []);

  useEffect(() => {
    if (window.CloudCannonAPI) {
      loadAPI();
      return;
    }

    document.addEventListener("cloudcannon:load", loadAPI, { once: true });

    return () => {
      document.removeEventListener("cloudcannon:load", loadAPI);
    };
  }, []);

  return cloudcannonAPI;
};
