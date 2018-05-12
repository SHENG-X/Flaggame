import React, { Component } from 'react'
import QuestionForm from './QuestionForm'
import Header from './Header'
import shuffle from 'shuffle-array'
import './css/app.css'


const QuestionStates = {
    QUESTION : 1,
    ANSWER_WRONG : 2,
    ANSWER_CORRECT : 3
}

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            countries : [],
            options : [],
            correctoption : undefined,
            questionState : undefined
        }

        this.getOptions=this.getOptions.bind(this);
        this.userSelect=this.userSelect.bind(this);
        this.submitAnswer=this.submitAnswer.bind(this);
        this.nextQuestion=this.nextQuestion.bind(this);
    }

    userSelect(selection){
        var items=document.getElementsByClassName('alert');
        [...items].map((val, index) => {val.style.display = 'none'});
        if(selection===this.state.correctoption){
                this.setState({questionState : QuestionStates.ANSWER_CORRECT});
                console.log("Correct");
        }
        else {
                this.setState({questionState : QuestionStates.ANSWER_WRONG});
                console.log("Wrong");
        }
    }
    submitAnswer(e){
        e.preventDefault();
        switch(this.state.questionState){
            case QuestionStates.QUESTION:
                document.getElementsByClassName('alert-warning')[0].style.display='block';
                break;
            case QuestionStates.ANSWER_CORRECT:
                document.getElementsByClassName('btn-success')[0].style.display='block';
                document.getElementsByClassName('control')[0].style.display='none';
                document.getElementsByClassName('alert-success')[0].style.display='block';
                // this.nextQuestion();
                break;
            case QuestionStates.ANSWER_WRONG:
                document.getElementsByClassName('alert-danger')[0].style.display='block';
                break;
            default:
                break;
        }
    }
    getOptions(correctoption, countries){
        const options=[];
        options.push(correctoption);
        while(options.length<4){
            let opt = Math.floor(Math.random()*countries.length);
            if(opt !== correctoption){
                options.push(opt)
            }
        }
        return shuffle(options);
    }

    nextQuestion(){
        var items=document.getElementsByClassName('alert');
        const correctoption=Math.floor(Math.random()*this.state.countries.length);
        const options=this.getOptions(correctoption, this.state.countries);
        this.setState({correctoption, options, questionState : QuestionStates.QUESTION},()=>{
            [...items].map((val, index) => {val.style.display = 'none'});
            document.getElementsByClassName('btn-success')[0].style.display='none';
            document.getElementsByClassName('control')[0].style.display='block';
        });

    }

    componentWillMount(){
        fetch('https://restcountries.eu/rest/v2/all')
        .then(reps => reps.json())
        .then(countries => {
            const correctoption=Math.floor(Math.random()*countries.length);
            const options=this.getOptions(correctoption, countries);
            this.setState({
                countries,
                options,
                correctoption,
                questionState : QuestionStates.QUESTION
            });
        });
    }
    render() {
        let { correctoption } = this.state;
        var output = () => <div>Loading....</div>;
        if(correctoption !== undefined){
            output = () => <QuestionForm {...this.state} userSelect={this.userSelect} nextQuestion={this.nextQuestion} submitAnswer={this.submitAnswer} />;
        }
        return (
            <div className='container'>
                <Header/>
                <div className="App">
                    {output()}
                </div>
            </div>

        );
    }
}

export default App;
