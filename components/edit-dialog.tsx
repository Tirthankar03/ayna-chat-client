import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (newTitle: string) => void;
  initialTitle?: string;
}

export function EditDialog({ open, onOpenChange, onConfirm, initialTitle }: EditDialogProps) {
  const [title, setTitle] = useState(initialTitle || '');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Chat Session</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new title"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onConfirm(title)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 