import React, { useState, useEffect }  from "react";
import { getImage } from "../../images";
import './stream.css'

export function AddStream({ addStreamClicked }) {

    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width < 580;

    if (isMobile) {
        return (
            <div className="add-stream add-stream-mobile" onClick={addStreamClicked}>
                <div className="add-stream-icon">
                    <img src={getImage("add_no_circle")}/>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="add-stream" onClick={addStreamClicked}>
                <div className="add-stream-icon">
                    <img src={getImage("add_no_circle")}/>
                </div>
            </div>
        );
    }
}