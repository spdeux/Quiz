import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdButtonModule, MdInputModule, MdCardModule, MdListModule, MdToolbarModule, MdExpansionModule, MdRadioModule,MdDialogModule } from '@angular/material'


import { AppComponent } from './app.component'
import { QuestionComponent } from './question.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ApiService } from './api/api.service'
import { AuthService } from "./auth/auth.service";
import { AuthInterceptorService } from "./auth-interceptor/auth-interceptor.service";
import { QuestionsComponent } from './questions/questions.component'
import { RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PlayComponent } from './play/play.component';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { FinishedComponent } from './finished/finished.component';


const routes = [
  { path: "", component: HomeComponent },
  { path: "question", component: QuestionComponent },
  { path: "question/:quizId", component: QuestionComponent },
  { path: "questions", component: QuestionsComponent },
  { path: "quiz", component: QuizComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "play", component: PlayComponent },
  { path: "playQuiz/:quizId", component: PlayQuizComponent }
]

@NgModule({
  declarations: [
    AppComponent, QuestionComponent, QuestionsComponent, HomeComponent, NavComponent, QuizComponent, QuizzesComponent, RegisterComponent, LoginComponent, PlayComponent, PlayQuizComponent, FinishedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdListModule,
    MdToolbarModule,
    MdExpansionModule,
    MdRadioModule,
    MdDialogModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ApiService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true //it indicates that we can use multiple httpInterceptors
    }

  ],
  bootstrap: [AppComponent],
  entryComponents:[FinishedComponent]
})
export class AppModule { }
