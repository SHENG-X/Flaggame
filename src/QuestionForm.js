import React, { Component } from 'react';
import './css/index.css'

export default class QuestionForm extends Component{
    render(){
        const {countries, options, correctoption } = this.props;
        const myoptions = options.map((val, index) => <div key = {val} >
                                                        <div className='radio'>
                                                            <label>
                                                            <input
                                                                    type = 'radio'
                                                                    name ='country'
                                                                    value = {countries[val].name}
                                                                    onChange = {(e)=>this.props.userSelect(val)}
                                                                    />
                                                             {` ${countries[val].name}`}
                                                             </label>
                                                         </div>
                                                    </div>);
        const src = countries[correctoption].flag;
        return(
            <div className='question-form'>
                <div className='flag-image-container'>
                    <img src={src} alt='' className='flag-image'/>
                </div>
                <div className='options-container'>
                    <form onSubmit={this.props.submitAnswer}>
                    <br/>
                    <div className="alert alert-success">
                        <strong>Correct!</strong>
                    </div>
                    <div className="alert alert-danger">
                        <strong>Wrong!</strong>
                    </div>
                    <div className="alert alert-warning">
                        <strong>Choose a answer!</strong>
                    </div>
                        {myoptions}
                        <input value='Guess' type='submit' className='btn btn-info control'/>
                        <input value='Next' type='button' className='btn btn-success' onClick = {this.props.nextQuestion}/>
                    </form>
                </div>
            </div>
        );
    }
}
