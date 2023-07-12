import React from "react";
import { Stream } from "../stream/Stream"
import { AddStream } from "../stream/AddStream"
import { Folder } from "../folder/Folder"
import { EditStream } from "../editstream/EditStream"
import './contentgrid.css'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import Grid from '@mui/material/Grid'; 
import Stack from '@mui/material/Stack'; 

export function ContentGrid() {
    let page = "Folder";

    if (page === "Folder") {
        return (
            <div className="contentgrid">
                <SimpleBar style={{ height: '314px' }}>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <Stream/>
                        </Grid>
                        <Grid item>
                            <AddStream/>
                        </Grid>
                    </Grid>
                    <div className="bottom-row"></div>
                </SimpleBar>
            </div>
        );
    }
    else if (page === "Folders") {
        return (
            <div className="contentgrid">
                <SimpleBar style={{ height: '314px' }}>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                        <Grid item>
                            <Folder/>
                        </Grid>
                    </Grid>
                    <div className="bottom-row"></div>
                </SimpleBar>
            </div>
        );
    }
    else if (page === "Stream") {
        return (
            <div className="contentgrid">
                <SimpleBar style={{ height: '314px' }}>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="stretch"
                        spacing={2}
                    >
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                        <EditStream></EditStream>
                    </Stack>
                    <div className="bottom-row"></div>
                </SimpleBar>
            </div>
        );
    }
}