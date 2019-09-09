import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  ;

  questions: {};
  quizId
  constructor(private api: ApiService, private rout: ActivatedRoute) { }

  ngOnInit() {
    this.GetQuestions();
  }

  GetQuestions() {
    this.quizId = this.rout.snapshot.paramMap.get('quizId');
    this.api.getQuestions( this.quizId).subscribe(res => {
      this.questions = res;
    },
      (error) => {
        console.log(error);

      });
  }

}
