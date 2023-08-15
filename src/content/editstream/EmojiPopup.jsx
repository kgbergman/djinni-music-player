import React from "react";
import "./emojipopup.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export function EmojiPopup({ closeEmojiPopup, updateEmoji }) {

	function emojiSelected(emoji) {
		updateEmoji(emoji);
		closeEmojiPopup();
	}

	function backgroundClicked() {
		closeEmojiPopup();
	}

	function popupClicked(event) {
		event.stopPropagation();
	}

	return (
		<div className="emoji-popup-background" onClick={backgroundClicked}>
			<div className="picker-container" onClick={popupClicked}>
				<Picker
					data={data} 
					onEmojiSelect={emojiSelected} 
					categories={["people", "nature", "foods", "activity", "places", "objects", "symbols", "flags"]}
					searchPosition={"none"}
					previewPosition={"none"}
					skinTonePosition={"none"}
					perLine={7}
					emojiButtonColors={["rgb(62, 64, 80)"]}
				/>
			</div>
		</div>
	);
}