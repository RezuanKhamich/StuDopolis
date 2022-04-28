import React, {useState, useEffect} from "react";
import QuizStartPage from "./QuizStartPage";
import QuizResultPage from "./QuizResultPage";
import QuizQuestionsPage from "./QuizQuestionsPage";

const QuizComponent = ({ pageData, doneBtnHandler, currentPageIsDone, updateTestProgressHandler, currentQuizAnswers }) => {

  const [questionId, setQuestionId] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeIsLeft, setTimeIsLeft] = useState(false);
  const [showQuizStartPage, setShowQuizStartPage] = useState(true);

  const timerEndHandler = () => {
    let pendingQuestions = []
    for(let i = questionId; i < pageData.pageTest.length; i++){
      pendingQuestions.push(0)
    }
    setUserAnswers(prevState => [...prevState, [...pendingQuestions]])
    setTimeIsLeft(true)
  }

  const startQuizHandler = () => {
    setShowQuizStartPage(false)
  }

  const selectAnswerHandler = (selectedAnswerId, userAnswers) => {
    setUserAnswers(prevState => [...prevState, (selectedAnswerId+1)])
    if(questionId < pageData.pageTest.length) {
      setQuestionId(prevState => ++prevState)
    }
    if(questionId === (pageData.pageTest.length - 1)) {
      doneBtnHandler(false);
    }
  }

  useEffect(() => {
    if(userAnswers.length === pageData.pageTest.length){
      updateTestProgressHandler(userAnswers);
    }
  },[userAnswers])

  return(
    <>
      {
        showQuizStartPage && !currentPageIsDone ?
          <QuizStartPage startQuizHandler={startQuizHandler}/>
          :
          timeIsLeft || questionId === pageData.pageTest.length || currentPageIsDone?
            <QuizResultPage userAnswers={userAnswers} pageData={pageData} currentQuizAnswers={currentQuizAnswers} />
            :
            <QuizQuestionsPage
              userAnswers={userAnswers}
              pageData={pageData}
              questionId={questionId}
              timerEndHandler={timerEndHandler}
              selectAnswerHandler={selectAnswerHandler}
            />
      }
    </>
  )
}

export default QuizComponent;