import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  quizzes: {};
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.GetQuizzes();
  }

  GetQuizzes() {
   
    this.api.getAllQuizzes().subscribe(res => {
      this.quizzes = res;
    },
      (error) => {
        console.log(error);

      });
  }

}
