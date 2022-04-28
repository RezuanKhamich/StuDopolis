import React from "react";
import classes from './style.module.css';

const Backdrop = props => (
    <div 
        className={classes.BackDrop}
        onClick={props.onClick}
    ></div>
)

export default Backdrop;