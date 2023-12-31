import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

export function AddEditStream({ addEditStreamClicked }) {
	return (
		<Tooltip title="Add Link">
			<div className="add-edit-stream" onClick={addEditStreamClicked}>
				<AddIcon sx={{ fontSize: 40, color: "white" }} />
			</div>
		</Tooltip>
	);
}