import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/src/hooks/use-toast";
import manageTime from "@/src/lib/manageTime";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

const CreateTimer = ({ children ,createTime}:{ children : React.ReactNode, createTime :(name:string)=>void}) => {
  const [newTimerName, setNewTimerName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const createTimer = () => {
    if (newTimerName.trim() !== "") {
      createTime(newTimerName);
      toast({
        title: "Timer Created",
        description: `"${newTimerName}" was added successfully.`,
      });
      setNewTimerName("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-900 border-none rounded-2xl p-6 shadow-xl w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center text-gray-900 dark:text-white">
            New Timer
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <Input
            autoFocus
            placeholder="Enter timer name..."
            value={newTimerName}
            onChange={(e) => setNewTimerName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createTimer()}
            className="bg-gray-100 w-[calc(100%-50px)] dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
          />

          <Button
            onClick={createTimer}
            className="w-[50px] bg-purple-600 hover:bg-purple-700 text-white rounded-lg "
          >
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTimer;
