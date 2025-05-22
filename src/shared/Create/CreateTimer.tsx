import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import manageTime from "@/src/lib/manageTime";
import React, { useState } from "react";

const CreateTimer = ({ children }: React.PropsWithChildren) => {
  const [newTimerName, setNewTimerName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createTimer = () => {
    if (newTimerName.trim() !== "") {
      manageTime.createTimer(newTimerName);
      setNewTimerName("");
      setIsDialogOpen(false);
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-gray-900 border border-gray-800 text-white max-w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Timer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="timer-name" className="text-gray-300">
              Timer Name
            </Label>
            <Input
              id="timer-name"
              placeholder="e.g., Coding, Reading, Exercise"
              value={newTimerName}
              onChange={(e) => setNewTimerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") createTimer();
              }}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Button
            onClick={createTimer}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white border-0"
          >
            Create Timer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTimer;
