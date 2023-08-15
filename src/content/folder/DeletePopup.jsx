import React from "react";
import "./folder.css";
import Button from "@mui/material/Button";

export function DeletePopup({ closeDeletePopup, type, deleteClicked }) {
	let mouseOrigin = "bg";

	function popupBackgroundMouseUp() {
		if (mouseOrigin === "bg") {
			closeDeletePopup();
		}
	}

	function popupClicked(event) {
		event.stopPropagation();
		mouseOrigin = "popup";
	}

	function popupBackgroundMouseDown() {
		mouseOrigin = "bg";
	}

	const buttonStyle = { 
		color: "rgb(187, 153, 255)",
		"&:hover": {
			backgroundColor: "rgb(56, 57, 82)",
		},
		borderRadius: "15px",
	};

	const deleteButtonStyle = { 
		color: "rgb(255, 167, 38)",
		"&:hover": {
			backgroundColor: "rgb(56, 57, 82)",
		},
		borderRadius: "15px",
	};

	return (
		<div className="popup-background" onMouseDown={popupBackgroundMouseDown} onMouseUp={popupBackgroundMouseUp}>
			<div className="delete-folder-popup" onMouseDown={popupClicked}>
				<div className="popup-header">Delete this {type}?</div>
				<div className="popup-caption">This operation cannot be undone.</div>
				<div className="popup-buttons-container">
					<Button variant="text" sx= {deleteButtonStyle} onClick={deleteClicked}>
                        Delete
					</Button>
					<Button variant="text" sx= {buttonStyle} onClick={closeDeletePopup}>
                        Cancel
					</Button>
				</div>
			</div>
		</div>
	);
}