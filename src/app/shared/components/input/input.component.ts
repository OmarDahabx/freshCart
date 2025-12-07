import { Component, input, Input, InputSignal, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  
  control:InputSignal<any> = input();
  typeInput: InputSignal<string> = input("");
  idInput: InputSignal<string> = input("");
  labelInput: InputSignal<string> = input("");
  element: InputSignal<string> = input('input');

  flag:WritableSignal<boolean> = signal(true);
}
