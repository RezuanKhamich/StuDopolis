import React, {Component} from "react";
import classes from './style.module.css';
import ActiveQuiz from "../../containers/QuizComponents/ActiveQuiz";
import FinishedQuiz from "../../containers/QuizComponents/FinishedQuiz";

class Quiz extends Component{
    state = {
        results: {}, // {[id]: success error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зеленый', id: 4}
            ]},
            {
                id: 2,
                question: 'Какой первый цвет флага РФ?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Синий', id: 1},
                    {text: 'Белый', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зеленый', id: 4}
            ]},
            // {
            //     id: 3,
            //     question: 'Что открыл Христофор Колумб?',
            //     rightAnswerId: 4,
            //     answers: [
            //         {text: 'Европу', id: 1},
            //         {text: 'Индию', id: 2},
            //         {text: 'Японию', id: 3},
            //         {text: 'Америку', id: 4}
            // ]},
            // {
            //     id: 4,
            //     question: 'Что тяжелее 1кг железа или 1кг ваты?',
            //     rightAnswerId: 3,
            //     answers: [
            //         {text: '1кг железа', id: 1},
            //         {text: '1кг ваты', id: 2},
            //         {text: 'Одинаково', id: 3},
            // ]},
            // {
            //     id: 5,
            //     question: 'Для чего применяют штангенциркуль?',
            //     rightAnswerId: 1,
            //     answers: [
            //         {text: 'Для измерения', id: 1},
            //         {text: 'Для строительного ремонта', id: 2},
            //         {text: 'Это деталь автомобиля', id: 3},
            //         {text: 'Для рисования овальных объектов', id: 4}
            // ]}, 
        ]
    }

    onAnswerClickHandler = answerId => {

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if(question.rightAnswerId === answerId){
            if(!results[question.id]){
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeOut = window.setTimeout(()=>{
                if(this.isQuizFinished()){
                    this.setState({
                        isFinished: true
                    })
                }else{
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeOut);
            }, 1000)

            
        }else{
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    isQuizFinished(){
        return (this.state.activeQuestion + 1 === this.state.quiz.length);
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render(){
        return(
        <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
                <h1>Ответьте на все вопросы</h1>

                {
                    this.state.isFinished 
                    ?   <FinishedQuiz 
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                    :   <ActiveQuiz 
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion+1}
                            state={this.state.answerState}
                        />
                }
            </div>
        </div>
        )
    }
}

export default Quiz;