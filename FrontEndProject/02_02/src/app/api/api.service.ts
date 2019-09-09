import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Question } from '../Models/QuestionModel';
import { Subject } from 'rxjs';
import { Quiz } from '../Models/QuizModel';
@Injectable()
export class ApiService {
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  url = "https://localhost:44316/api/questions";
  quizUrl = "https://localhost:44316/api/quizzes";
  private subject = new Subject<any>();
  private subject2 = new Subject<any>();

  constructor(private http: HttpClient) { }

  postQuestion(question: Question) {
    return this.http.post(this.url, question, { headers: this.headers });
  }

  getQuestions(quizId) {
    return this.http.get(this.url + `/${quizId}`);
  }

  sendSelectedQuestion(question: Question) {
    this.subject.next(question);
  }

  getSelectedQuestion() {
    return this.subject.asObservable();
  }

  putQuestion(question: Question) {
    return this.http.put(this.url + `/${question.id}`, question);
  }

  postQuiz(quiz: Quiz) {
    return this.http.post(this.quizUrl, quiz, { headers: this.headers });
  }

  getQuizzes() {
    return this.http.get(this.quizUrl);
  }

  sendSelectedQuiz(quiz: Quiz) {
    this.subject2.next(quiz);
  }

  getSelectedQuiz() {
    return this.subject2.asObservable();
  }

  putQuiz(quiz: Quiz) {
    return this.http.put(this.quizUrl + `/${quiz.id}`, quiz);
  }

  //   prepareHeader() {
  //   //  this.headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  //   // this.headers.append("Access-Control-Allow-Origin", "*");
  //   // this.headers.append("Access-Control-Allow-Credentials","true");
  //   // this.headers.append("Access-Control-Allow-Headers", 'X-Requested-With,content-type');
  // }


}


