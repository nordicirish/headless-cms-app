"use client";
//need to use client because is rendered on the client side
import { Combobox } from "@headlessui/react";
import { useEffect, useState } from "react";

// custom hook
function useIsClient() {
  //isClient is used to prevent the search box from rendering on the server
  // prevents id mismatch between server and client

  const [isClient, setIsClient] = useState(false);
  //useffect is used to set isClient to true after the component is mounted
  useEffect(() => setIsClient(true), []);
  console.log("[SearchBox] isClient:", isClient);
  return isClient;
}
export default function SearchBox() {
  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }
  return (
    <Combobox>
      <Combobox.Input placeholder="Search" />
    </Combobox>
  );
}
