import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Quiz } from '../Models/QuizModel';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: Quiz = new Quiz();
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getSelectedQuiz().subscribe(selectedQuiz => {
      this.quiz = selectedQuiz;
    })
  }

  post(quiz: Quiz) {
    this.api.postQuiz(quiz).subscribe(quiz => {
      console.log(quiz);

    }, (error) => {
      console.log(error);

    })
  }

  put(quiz: Quiz) {
    this.api.putQuiz(quiz).subscribe(x => {
      console.log(x)
    },
      (error) => {
        console.log(error);

      });

  }

}
