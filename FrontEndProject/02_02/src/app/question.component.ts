import { Component, OnInit } from '@angular/core'
import { ApiService } from './api/api.service';
import { HttpClient } from '@angular/common/http';
import { Question } from './Models/QuestionModel';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'question',
    templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {
    qq: Question = new Question();
    quizId;

    constructor(private api: ApiService, private http: HttpClient, private rout: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.quizId = this.rout.snapshot.paramMap.get('quizId');
        this.api.getSelectedQuestion().subscribe(question => {
            this.qq = question;
        })
    }


    post(question) {
        question.quizId=this.quizId;
        this.api.postQuestion(question).subscribe(x => {
            console.log(x)
        },
            (error) => {
                console.log(error);

            });

    }
    profile = {};
    get() {

        this.api.getQuestions(this.quizId).subscribe(data => {
            this.profile = data;
            console.log(this.profile)
        },
            (error) => {
                console.log(error);

            }
        );
    }

    put(question) {
        this.api.putQuestion(question).subscribe(x => {
            console.log(x)
        },
            (error) => {
                console.log(error);

            });

    }

}