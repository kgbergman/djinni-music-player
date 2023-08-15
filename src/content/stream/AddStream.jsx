import React from "react";
import "./stream.css";
import AddIcon from "@mui/icons-material/Add";

export function AddStream({ addStreamClicked }) {
	return (
		<div className="add-stream" onClick={addStreamClicked}>
			<div className="add-stream-icon">
				<AddIcon sx={{ fontSize: 40 }}/>
			</div>
		</div>
	);
}