"use client";

import DesignerSidebar from "./designer-sidebar";
import { useDroppable } from "@dnd-kit/core";

export default function Designer() {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  return (
    <div className="flex h-full w-full">
      <div className="w-full p-4">
        <div className="m-auto flex h-full max-w-[920px] flex-1 flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl bg-background">
          <div className="w-full p-4">
            <div className="h-[120px] rounded-md bg-primary/20"></div>
          </div>
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}
