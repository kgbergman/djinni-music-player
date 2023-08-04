import React, { useState } from "react";
import './folder.css'
import Grid from '@mui/material/Grid';
import { Folder } from "./Folder";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

export function Folders({ folders, openedPage, sortByAlpha, editFolderClicked, folderOpened, openDeletePopup, selectedFolder, setSelectedFolder, currentlyStreaming, paused }) {

    function folderClicked(event) {
        setSelectedFolder(parseInt(event.currentTarget.id));
    }
    
    function folderDoubleClicked(event) {
        folderOpened(event.currentTarget.id);
    }

    const theme = createTheme({
        breakpoints: {
            values: {
            xs: 0,
            sm: 500,
            },
        },
    });
      
    const renderFolders = () => {
        if (sortByAlpha) {
            let foldersArray = [];
            const keys = Object.keys(folders);
            keys.map(folderKey => {
                if (folderKey !== "undefined") {
                    foldersArray.push(folders[folderKey]);
                }
            });
            const sorted = [...foldersArray].sort(function(a, b) {
                var textA = a.folderName.toUpperCase();
                var textB = b.folderName.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            return sorted.map(folder => {
                return <Grid item xs={6} sm={3}>
                            <Folder 
                                sortByAlpha={sortByAlpha}
                                folders={folders}
                                currentlyStreaming={currentlyStreaming}
                                folderName={folder.folderName} 
                                folderColor={folder.folderColor} 
                                folderId={folder.id}
                                folderClicked={folderClicked} 
                                folderDoubleClicked={folderDoubleClicked} 
                                editFolderClicked={editFolderClicked}
                                selected={selectedFolder === folder.id}
                                paused={paused}
                            />
                        </Grid>;
            });
        }
        else {
            const keys = Object.keys(folders);
            return keys.map(folderKey => {
                if (folderKey !== "undefined") {
                    const folder = folders[folderKey];
                    return <Grid item xs={6} sm={3}>
                                <Folder 
                                    sortByAlpha={sortByAlpha}
                                    folders={folders}
                                    currentlyStreaming={currentlyStreaming}
                                    folderName={folder.folderName} 
                                    folderColor={folder.folderColor}
                                    folderId={folder.id} 
                                    folderClicked={folderClicked} 
                                    folderDoubleClicked={folderDoubleClicked} 
                                    editFolderClicked={editFolderClicked}
                                    selected={selectedFolder === folder.id}
                                    paused={paused}
                                />
                            </Grid>;
                }
            });
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Grid container rowSpacing={1} columnSpacing={1}>
                {renderFolders()}
            </Grid>
        </ThemeProvider>
    );
}