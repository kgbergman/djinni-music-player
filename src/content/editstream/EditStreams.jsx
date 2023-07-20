import React from "react";
import { EditStream } from "./EditStream"

export function EditStreams({ folders, openedFolder, openedStream }) {

    if (openedStream === "new") {
        const editStreamData = {
            "name": "",
            "link": "",
            "volume": 50,
            "loop": false,
            "loop1": 0,
            "loop2": 1
        };
        return (
            <div>
                <EditStream editStreamData={editStreamData}></EditStream>
            </div>
        );
    }
    else {
        const thisFolder = folders.filter(folder => parseInt(folder.id) === parseInt(openedFolder))[0];
        const thisFolderStreams = thisFolder.streams;
        const thisStream = thisFolderStreams.filter(stream => parseInt(stream.id) === parseInt(openedStream))[0];
        
        const renderEditStreams = () => {
            //Find the stream by this id
            return thisStream.streamData.map(editStreamData => {
                return <EditStream editStreamData={editStreamData}></EditStream>
            });
        };

        return (
            <div>
                {renderEditStreams()}
            </div>
        );
    }
}