import volume_mute from "./images/volume_mute.svg";
import volume_zero from "./images/volume_zero.svg";
import volume_low from "./images/volume_low.svg";
import volume_full from "./images/volume_full.svg";
import left from "./images/left.svg";
import right from "./images/right.svg";
import close from "./images/close.svg";
import error from "./images/error.svg";

/** Get the svg for this image string */
export function getImage(image: string) {
    switch (image.toLowerCase().replace(/['-]/g, "").replace(/[ ]/g, "_")) {
        case "volume_mute":
            return volume_mute;
        case "volume_zero":
            return volume_zero;
        case "volume_low":
            return volume_low;
        case "volume_full":
            return volume_full;
        case "left":
            return left;
        case "right":
            return right;
        case "close":
            return close;
        default:
            return error;
    }
  }
  