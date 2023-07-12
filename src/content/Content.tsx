import React from "react";
import { ContentHeader } from "./contentheader/ContentHeader";
import { ContentGrid } from "./contentgrid/ContentGrid";
import './content.css'

export function Content() {
    return (
        <div className="content">
            <ContentHeader/>
            <ContentGrid/>
        </div>
    );
}