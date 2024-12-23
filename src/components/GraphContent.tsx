import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from './Dropdown';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogAction
} from './Alerts';
import { MoreVertical } from 'lucide-react';
import InteractiveGraph from "./InteractiveGraph";

const GraphContent = () => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = () => {
        setShowDeleteDialog(false);
        // Add delete logic here
    };

    return (
        <div className="relative w-full h-full bg-white flex-grow">
            {/* Graph Area */}
            <InteractiveGraph/>

            {/* Menu Button */}
            <div className="top-4 right-4 relative">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical className="h-6 w-6 text-gray-600" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Hide / Unhide</DropdownMenuItem>
                        <DropdownMenuItem>Differentiation</DropdownMenuItem>
                        <DropdownMenuItem>Integration</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent className="max-w-xs">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">
                            Are you sure you want to delete this graph?
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex justify-center gap-2">
                        <AlertDialogCancel className="bg-white">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            DELETE
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default GraphContent;