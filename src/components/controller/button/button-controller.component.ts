import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'godzilla-forms-button-controller',
  templateUrl: './button-controller.component.html',
})
export class ButtonControllerComponent {
  @Input() label: string | undefined;

  @Output() readonly onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(public controlContainer: ControlContainer) {}
}
