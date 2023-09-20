"use client";
//need to use client because is rendered on the client side
import { Combobox } from "@headlessui/react";
export default function SearchBox() {
  return (
    <Combobox>
      <Combobox.Input placeholder="Search" />
    </Combobox>
  );
}
