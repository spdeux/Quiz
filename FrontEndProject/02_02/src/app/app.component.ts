import { Component } from '@angular/core'
import { QuestionComponent } from './question.component'

@Component({
  selector: 'app-root',
  template: '<app-nav></app-nav><router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'my app';
}
