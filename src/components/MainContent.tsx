import {Plus} from "lucide-react";
import React from "react";

const MainContent = () => {
  return (
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <Plus className="w-8 h-8 text-gray-400"/>
          </div>
          <span className="text-gray-400 text-lg">Add equation</span>
        </div>
      </main>
  )
}

export default MainContent;
