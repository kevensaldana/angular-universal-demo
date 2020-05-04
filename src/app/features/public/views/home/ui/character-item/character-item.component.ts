import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-character-item',
  styleUrls: ['./character-item.component.scss'],
  templateUrl: './character-item.component.html'
})
export class CharacterItemComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() image: string;
}
