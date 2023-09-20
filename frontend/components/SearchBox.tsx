"use client";
//need to use client because is rendered on the client side
import { Combobox } from "@headlessui/react";
import { useIsClient } from "@/lib/hooks";

const reviews = [
  { slug: "hades-2018", title: "Hades" },
  { slug: "fall-guys", title: "Fall Guys: Ultimate Knockout" },
  { slug: "black-mesa", title: "Black Mesa" },
  { slug: "disco-elysium", title: "Disco Elysium" },
  { slug: "dead-cells", title: "Dead Cells" },
];

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
