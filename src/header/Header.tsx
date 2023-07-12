import React from "react";
import { Button } from "../button/Button"
import { Slider } from "../slider/Slider"
import './header.css'

export function Header() {
    return (
        <div className="header">
          <div className="buttons-container">
            <div className="buttons">
              <Button image="open"/>
              <Button image="save"/>
            </div>
          </div>
          <div className="buttons-container">
            <div className="buttons">
              <Button image="volume_full"/>
            </div>
            <Slider min={ 0 } max={ 100 } value={ 0 }/>
          </div>
        </div>
    );
    /*
          <div className="scene-container">
            <div className="scene-name-container">
              <span className="scene-name">Scene Name</span>
              <div className="scene-dropdown">
                <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined css-yop3gh" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon">
                  <path d="M7 10l5 5 5-5z"></path>
                </svg>
              </div>
            </div>
            <div className="buttons">
              <div className="scene-sort-container" id="sortButton">
                <Button image="sort_recent"/>
                <div className="scene-dropdown">
                  <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined css-yop3gh" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon">
                    <path d="M7 10l5 5 5-5z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <Button image="add"/>
                <Button image="edit"/>
                <Button image="remove"/>
              </div>
            </div>
          </div>
        </div>
    );
    */
}