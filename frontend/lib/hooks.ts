
import { useEffect, useState } from "react";
// custom hooks
export function useIsClient() {
  //isClient is used to prevent the search box from rendering on the server
  // prevents id mismatch between server and client
  const [isClient, setIsClient] = useState(false);
  //useffect is used to set isClient to true after the component is mounted
  useEffect(() => setIsClient(true), []);
  return isClient;
}