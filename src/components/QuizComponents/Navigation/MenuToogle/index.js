import React from "react";
import classes from './style.module.css';

const MenuToogle = props => {
    const cls = [
        classes.MenuToogle,
        'fa',
    ]

    if(props.isOpen) {
        cls.push('fa-times')
        cls.push(classes.open)
    }else{
        cls.push('fa-bars')
    }
    
    return(
        <i
            className={cls.join(' ')}
            onClick={props.onToggle}
        >
            
        </i>
    )
}

export default MenuToogle;