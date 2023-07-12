import React from "react";
import { getImage } from "../images";
import './slider.css'

export function Slider(props: { min: number; max: number; value: number; }) {
    return (
        <div className="top-volume-container">
          <input type="range" min={props.min} max={props.max} defaultValue={props.value} className="top-slider" id="playerSlider"/>
        </div>
    );
}