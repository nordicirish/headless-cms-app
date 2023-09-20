"use client";
//need to use client because is rendered on the client side
import { Combobox } from "@headlessui/react";
import { useIsClient } from "@/lib/hooks";

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
