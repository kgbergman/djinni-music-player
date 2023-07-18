import React from "react";
import { Stream } from "../stream/Stream"
import { AddStream } from "../stream/AddStream"
import { Folder } from "../folder/Folder"
import { EditStream } from "../editstream/EditStream"
import './contentgrid.css'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import Grid from '@mui/material/Grid'; 

export function ContentGrid() {
    let page = "Stream";

    if (page === "Folder") {
        return (
            <div className="contentgrid">
                <SimpleBar style={{ height: '300px' }}>
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
                <SimpleBar style={{ height: '300px' }}>
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
                <SimpleBar style={{ height: '300px' }}>
                    <div>
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
                        <EditStream></EditStream>
                    </div>
                    <div className="bottom-row"></div>
                </SimpleBar>
            </div>
        );
    }
}