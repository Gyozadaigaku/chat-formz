import { FormElements } from "./form-elements";
import SidebarBtnElement from "./sidebar-btn-element";

export default function DesignerSidebar() {
  return (
    <aside className="flex h-full w-[400px] max-w-[400px] flex-grow flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-background p-4">
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </aside>
  );
}
