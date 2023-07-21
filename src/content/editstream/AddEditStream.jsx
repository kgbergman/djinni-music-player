import React from "react";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export function AddEditStream({ addEditStreamClicked }) {
    const buttonStyle = { 
        color: "#ffffff",
        '&:hover': {
        backgroundColor: 'rgb(62, 64, 80)',
        },
    };

    return (
        <div className="add-edit-stream" onClick={addEditStreamClicked}>
            <AddIcon sx={{ fontSize: 40, color: "white" }} />
        </div>
    );
}