import React from "react";
import SidebarBtnElement from "./sidebar-btn-element";
import { FormElements } from "./form-elements";
import { Separator } from "./ui/separator";

export default function FormElementsSidebar() {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag and drop elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 place-items-center gap-2 md:grid-cols-2">
        <p className="col-span-1 my-2 place-self-start text-sm text-muted-foreground md:col-span-2">
          Layout elements
        </p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubTitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.SpacerField} />
        <SidebarBtnElement formElement={FormElements.SeparatorField} />

        <p className="col-span-1 my-2 place-self-start text-sm text-muted-foreground md:col-span-2">
          Form elements
        </p>
        <SidebarBtnElement formElement={FormElements.TextField} />
      </div>
    </div>
  );
}
