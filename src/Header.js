import React, {Component} from 'react'
import './css/header.css'

export default class Header extends Component{
    render(){
        return(
            <div className = 'page-header'>
                <div className='container'>
                    <h1>Guess Flag Game</h1>
                    <h3>A Simple React App</h3>
                </div>
            </div>
        );
    }
}
