import React, { useState } from "react";
import './stream.css'
import Grid from '@mui/material/Grid';
import { Stream } from "./Stream"
import { AddStream } from "./AddStream"

export function Streams({ sortByAlpha, folders, openedFolder, streamOpened }) {

    const [selectedStreams, setSelectedStreams] = useState([]);

    function streamClicked(event) {
        const streamId = parseInt(event.currentTarget.id)
        if (selectedStreams.includes(streamId)) {
            setSelectedStreams(selectedStreams.filter(stream => stream !== parseInt(streamId)))
        }
        else {
            setSelectedStreams([...selectedStreams, streamId])
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
    
    const renderStreams = () => {
        if (sortByAlpha) {
            const sorted = [...thisFolderStreams].sort(function(a, b) {
                var textA = a.streamName.toUpperCase();
                var textB = b.streamName.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            return sorted.map(stream => {
                return <Grid item>
                            <Stream stream={stream} id={stream.id} streamClicked={streamClicked} editStreamClicked={editStreamClicked} selected={selectedStreams.includes(parseInt(stream.id))}/>
                        </Grid>;
            });
        }
        else {
            return thisFolderStreams.map(stream => {
                return <Grid item>
                            <Stream stream={stream} streamClicked={streamClicked} editStreamClicked={editStreamClicked} selected={selectedStreams.includes(parseInt(stream.id))}/>
                        </Grid>;
            });
        }
    };

    return (
        <Grid container rowSpacing={1} columnSpacing={1}>
            {renderStreams()}
            <Grid item>
                <AddStream addStreamClicked={addStreamClicked}/>
            </Grid>
        </Grid>
    );
}