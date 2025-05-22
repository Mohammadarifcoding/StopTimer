import React from "react";
import Logo from "../Logo";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CreateTimer from "../Create/CreateTimer";

const Navbar = ({createTime}:{createTime :(name:string)=>void}) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
      <div className="container max-w-5xl mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Logo />
          <h1 className="text-xl font-bold text-white">StopTimer</h1>
        </div>
         <CreateTimer createTime={createTime}>

  <Button className="bg-purple-600 hover:bg-purple-700 text-white border-0 gap-2">
          <PlusCircle className="h-4 w-4" />
          New
        </Button>

         </CreateTimer>
      
      </div>
    </header>
  );
};

export default Navbar;
