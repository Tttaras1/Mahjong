import { Component, Input } from '@angular/core';

import {
  trigger,
  animate,
  transition,
  style,
  state
} from '@angular/animations';



@Component({
  selector: 'app-mahjong-card',
  templateUrl: './mahjong-card.component.html',
  styleUrls: ['./mahjong-card.component.scss'],
  animations: [
    trigger('test',[
      state('default', style({
        boxShadow: '0 0 6px rgba(0, 0, 0, 0.3)',
      })),
      state('chosen', style({
        boxShadow: '0 0 6px rgba(95, 58, 208, 0.9)',
      })),
      state('active', style({
        boxShadow: '0 0 6px rgba(81, 210, 198, 0.9)',
      })),
      transition('void => *', [
        animate('0s')
      ]),
      transition('* => active', [
        animate('.7s')
      ]),
      transition('* => *', [
        animate('.3s')
      ]),
    ])
  ]
})
export class MahjongCardComponent {
  @Input() num: number;
  @Input() isActive: boolean;
  @Input() isChoosen: boolean;
}
