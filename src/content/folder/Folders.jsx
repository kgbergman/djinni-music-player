import React, { useState } from "react";
import './folder.css'
import Grid from '@mui/material/Grid';
import { Folder } from "./Folder";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

export function Folders({ folders, openedPage, sortByAlpha, editFolderClicked, folderOpened, openDeletePopup, selectedFolder, setSelectedFolder }) {

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
            const sorted = [...folders].sort(function(a, b) {
                var textA = a.folderName.toUpperCase();
                var textB = b.folderName.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            return sorted.map(folder => {
                return <Grid item xs={6} sm={3}>
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
                return <Grid item xs={6} sm={3}>
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
        <ThemeProvider theme={theme}>
            <Grid container rowSpacing={1} columnSpacing={1}>
                {renderFolders()}
            </Grid>
        </ThemeProvider>
    );
}