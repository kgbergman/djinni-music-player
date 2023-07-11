import volume_mute from "./images/volume_mute.svg";
import volume_zero from "./images/volume_zero.svg";
import volume_low from "./images/volume_low.svg";
import volume_full from "./images/volume_full.svg";
import left from "./images/left.svg";
import right from "./images/right.svg";
import close from "./images/close.svg";
import error from "./images/error.svg";
import open from "./images/open.svg";
import edit from "./images/edit.svg";
import loop from "./images/loop.svg";
import no_loop from "./images/no_loop.svg";
import save from "./images/save.svg";
import add from "./images/add.svg";
import fade from "./images/fade.svg";
import add_no_circle from "./images/add_no_circle.svg";
import remove from "./images/remove.svg";
import sort_recent from "./images/sort_recent.svg";
import sort_name from "./images/sort_name.svg";

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
        case "open":
            return open;
        case "edit":
            return edit;
        case "save":
            return save;
        case "add":
            return add;
        case "add_no_circle":
            return add_no_circle;
        case "remove":
            return remove;
        case "sort_recent":
            return sort_recent;
        case "sort_name":
            return sort_name;
        case "fade":
            return fade;
        case "loop":
            return loop;
        case "no_loop":
            return no_loop;
        default:
            return error;
    }
  }
  