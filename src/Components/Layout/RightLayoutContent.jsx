import React from 'react';
import LayoutStyle from "./Layout.module.css";

const RightLayoutContent = ({ children }) => {
    return (
        <div className={LayoutStyle.right_content}>
            {children}
        </div>
    )
}

export default RightLayoutContent
