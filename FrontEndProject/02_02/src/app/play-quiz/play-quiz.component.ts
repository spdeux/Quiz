import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Question } from '../Models/QuestionModel';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FinishedComponent } from "../finished/finished.component";

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {
  questions: {}
  quizId;
  constructor(private rout: ActivatedRoute, private api: ApiService, public dialog: MdDialog) { }

  ngOnInit() {
    this.quizId = this.rout.snapshot.paramMap.get('quizId');
    this.getQuestions(this.quizId);
  }

  getQuestions(quizId) {
    this.api.getQuestions(quizId).subscribe(res => {
      this.questions = res;

      (this.questions as Question[]).forEach(question => {
        question.answers = [
          question.correctAnswer,
          question.answer1,
          question.answer2,
          question.answer3
        ]
        this.shuffle(question.answers);
      });



    })
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }


  finish() {
    var correct = 0;
    var questions = (this.questions as Question[]);

    questions.forEach(question => {
      if (question.correctAnswer == question.selectedAnswer)
        correct++;
    });

    const dialogRef = this.dialog.open(FinishedComponent, {
      width: '250px',
      data: { correct, total: questions.length }
    });

  }



  //for accardon of material angular
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
