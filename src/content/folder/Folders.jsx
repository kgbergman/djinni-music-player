import React, { useState } from "react";
import './folder.css'
import Grid from '@mui/material/Grid';
import { Folder } from "./Folder";

export function Folders({ folders, sortByAlpha, editFolderClicked, folderOpened }) {

    const [selectedFolder, setSelectedFolder] = useState(0);

    function folderClicked(event) {
        setSelectedFolder(parseInt(event.currentTarget.id));
    }
    
    function folderDoubleClicked(event) {
        console.log(event.currentTarget);
        folderOpened(event.currentTarget.id);
    }
    
    const renderFolders = () => {
        if (sortByAlpha) {
            const sorted = [...folders].sort(function(a, b) {
                var textA = a.folderName.toUpperCase();
                var textB = b.folderName.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            return sorted.map(folder => {
                return <Grid item>
                            <Folder 
                                folderName={folder.folderName} 
                                folderColor={folder.folderColor} 
                                folderId={folder.id}
                                folderClicked={folderClicked} 
                                folderDoubleClicked={folderDoubleClicked} 
                                editFolderClicked={editFolderClicked}
                                selected={selectedFolder === folder.id}
                            />
                        </Grid>;
            });
        }
        else {
            return folders.map(folder => {
                return <Grid item>
                            <Folder 
                                folderName={folder.folderName} 
                                folderColor={folder.folderColor}
                                folderId={folder.id} 
                                folderClicked={folderClicked} 
                                folderDoubleClicked={folderDoubleClicked} 
                                editFolderClicked={editFolderClicked}
                                selected={selectedFolder === folder.id}
                            />
                        </Grid>;
            });
        }
    };
    return (
        <Grid container rowSpacing={1} columnSpacing={1}>
            {renderFolders()}
        </Grid>
    );
}