"use client";

import { Form } from "@prisma/client";
import SaveFormBtn from "./save-form-btn";
import Designer from "./designer";
import { DndContext } from "@dnd-kit/core";

export default function FormBuilder({ form }: { form: Form }) {
  return (
    <DndContext>
      <main className="flex w-full flex-col">
        <nav className="flex items-center justify-between gap-3 border-b-2 p-4">
          <h2 className="truncate font-medium">
            <span className="mr-2 text-muted-foreground">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
    </DndContext>
  );
}
