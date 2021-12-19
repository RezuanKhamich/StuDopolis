import React, {Component} from 'react';
import classes from './style.module.css';
import MenuToogle from "../../components/QuizComponents/Navigation/MenuToogle";
import {Drawer} from "@mui/material";

class Layout extends Component {

    state = {
        menu: false
    }
    
    toogleMenuHandler = () => {
        console.log('hi')
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }
    
    render(){
        return (
            <div className={classes.Layout}>

                
                <Drawer 
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                /> 
                <MenuToogle
                    onToggle={this.toogleMenuHandler}
                    isOpen={this.state.menu}
                > 
                    
                </MenuToogle> 
                
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;