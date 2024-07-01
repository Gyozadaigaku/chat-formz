import { Save } from "lucide-react";
import { Button } from "./ui/button";

function SaveFormBtn({ id }: { id: number }) {
  return (
    <Button variant="outline" className="gap-2">
      <Save className="size-4" />
      Save
    </Button>
  );
}

export default SaveFormBtn;
