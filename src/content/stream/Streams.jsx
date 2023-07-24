import React, { useState } from "react";
import './stream.css'
import Grid from '@mui/material/Grid';
import { Stream } from "./Stream"
import { AddStream } from "./AddStream"
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

export function Streams({ sortByAlpha, folders, openedFolder, streamOpened, currentlyStreaming, setCurrentlyStreaming, streamVolumeChangedFromFolder, volumeStreamClicked }) {

    const deleteStream = React.useCallback((streamToDelete) => {
        setCurrentlyStreaming((currentlyStreaming) =>
            currentlyStreaming.filter((stream) => stream.id !== streamToDelete)
        );
    }, []);

    function streamClicked(event) {
        const streamId = parseInt(event.currentTarget.id)
        const thisFolderStreams = thisFolder.streams;
        const thisStream = thisFolderStreams.filter(stream => parseInt(stream.id) === parseInt(streamId))[0];
        const currentlyStreamingIds = currentlyStreaming.map(stream => stream.id);
        if (currentlyStreamingIds.includes(streamId)) {
            deleteStream(streamId);
        }
        else {
            setCurrentlyStreaming([...currentlyStreaming, thisStream])
        }
    }

    function editStreamClicked(event) {
        console.log(event);
        streamOpened(event.currentTarget.id);
        event.stopPropagation();
    }

    function addStreamClicked(event) {
        streamOpened("new");
        event.stopPropagation();
    }

    const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
    const thisFolderStreams = thisFolder.streams;

    const theme = createTheme({
        breakpoints: {
            values: {
            xs: 0,
            sm: 500,
            },
        },
    });
    
    const renderStreams = () => {
        if (sortByAlpha) {
            const sorted = [...thisFolderStreams].sort(function(a, b) {
                var textA = a.streamName.toUpperCase();
                var textB = b.streamName.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            return sorted.map(stream => {
                return <Grid item xs={6} sm={3}>
                            <Stream 
                                stream={stream} 
                                id={stream.id} 
                                streamClicked={streamClicked} 
                                editStreamClicked={editStreamClicked} 
                                sliderChanged={streamVolumeChangedFromFolder}
                                volumeStreamClicked={volumeStreamClicked}
                                selected={currentlyStreaming.map(stream => stream.id).includes(parseInt(stream.id))}
                            />
                        </Grid>;
            });
        }
        else {
            return thisFolderStreams.map(stream => {
                return <Grid item xs={6} sm={3}>
                            <Stream 
                                stream={stream} 
                                streamClicked={streamClicked} 
                                editStreamClicked={editStreamClicked} 
                                sliderChanged={streamVolumeChangedFromFolder}
                                volumeStreamClicked={volumeStreamClicked}
                                selected={currentlyStreaming.map(stream => stream.id).includes(parseInt(stream.id))}
                            />
                        </Grid>;
            });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container rowSpacing={1} columnSpacing={1}>
                {renderStreams()}
                <Grid item xs={6} sm={3}>
                    <AddStream addStreamClicked={addStreamClicked}/>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}