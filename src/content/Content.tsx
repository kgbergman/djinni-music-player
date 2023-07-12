import React from "react";
import { ContentHeader } from "./contentheader/ContentHeader";
import { ContentGrid } from "./contentgrid/ContentGrid";
import './content.css'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export function Content() {
    return (
        <div className="content">
            <ContentHeader/>
            <ContentGrid/>
        </div>
    );
}