import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  quizzes: {};
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.GetQuizzes();
  }

  GetQuizzes() {
   
    this.api.getQuizzes().subscribe(res => {
      this.quizzes = res;
    },
      (error) => {
        console.log(error);

      });
  }

}
