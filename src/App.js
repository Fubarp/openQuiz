import React, { Component } from 'react';
import './App.scss';

const newQuiz = [{
  name: "New Quiz",
  author: "John",
  questions: [
    {
      questionName: "What do you like most",
      answers: [
        {
          text: "Bananas"
        },
        {
          text: "Oranges"
        },
        {
          text: "Apples"
        },
      ]
    },
    {
      questionName: "What Games do you play",
      answers: [
        {
          text: "Strategy"
        },
        {
          text: "First Person Shooters"
        },
      ]
    },
    {
      questionName: "Favorite Colors?",
      answers: [
        {
          text: "Red"
        },
        {
          text: "Orange"
        },
        {
          text: "Purple"
        },
        {
          text: "Teal"
        },
      ]
    },
  ]
}]



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizzes: newQuiz,
    }
  }



  // componentDidMount() {
  //   fetch('http://localhost:8080/get-all-quizzes')
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then((myJson) => {
  //       this.setState({ quizzes: myJson }, () => console.log(this.state.quizzes))
  //     });
  // }

  handleAddQuiz = (e) => {
    e.preventDefault();
    console.log(e);
    fetch('http://localhost:8080/add-quiz', {
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
      },
      method: "POST",
      body: JSON.stringify(newQuiz),
    })
      .then(res => {
        if (res.status === 200) {
          console.log("Quiz Added")
        } else {
          console.log("Something died")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">OpenQuiz</span>
          <i onClick={e => this.handleAddQuiz(e)} className="fas fa-plus-circle add-icon"></i>
        </nav>
        <div className="container">
          {this.state.quizzes.map((quiz, index) => {
            return (
              <div key={index}>
                {/* <p>Quiz name: {quiz.name}</p> */}
                <p>Author: {quiz.author}</p>
                {quiz.questions.map((questions, index) => {
                  return (
                    <div key={index}>
                      <div className="card" container>
                        <div className="card-header">Question {index} : {questions.questionName}</div>
                        <ul className="list-group list-group-flush"> {questions.answers.map((answer, index) => {
                          return (
                            <li className="list-group-item" key={index}>{answer.text}</li>
                          )
                        })}
                        </ul>
                      </div></div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    );
  }

}

export default App;
