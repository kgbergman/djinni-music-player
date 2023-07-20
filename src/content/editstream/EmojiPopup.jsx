import React from "react";
import './emojipopup.css'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export function EmojiPopup({ closeEmojiPopup }) {

    function emojiSelected(emoji) {
        console.log(emoji);
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
                    emojiButtonColors={['rgb(62, 64, 80)']}
                />
            </div>
        </div>
    );
    /*
            <EmojiPicker
                onEmojiClick={onClick}
                autoFocusSearch={false}
                theme={Theme.DARK}
                searchDisabled
                emojiVersion="10.0"
                previewConfig={{
                  showPreview: false
                }}
                height={250}
                width="50%"
                skinTonesDisabled
                emojiStyle={EmojiStyle.NATIVE}
                categories={[
                  {
                    name: "Smileys & People",
                    category: Categories.SMILEYS_PEOPLE
                  },
                  {
                    name: "Animals & Nature",
                    category: Categories.ANIMALS_NATURE
                  },
                  {
                    name: "Food & Drink",
                    category: Categories.FOOD_DRINK
                  },
                  {
                    name: "Travel & Places",
                    category: Categories.TRAVEL_PLACES
                  },
                  {
                    name: "Activities",
                    category: Categories.ACTIVITIES
                  },
                  {
                    name: "Objects",
                    category: Categories.OBJECTS
                  },
                  {
                    name: "Symbols",
                    category: Categories.SYMBOLS
                  },
                  {
                    name: "Flags",
                    category: Categories.FLAGS
                  }
                ]}
            />
            */
}