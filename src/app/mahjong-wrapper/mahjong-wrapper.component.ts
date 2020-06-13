import { Component, OnInit, ɵConsole } from '@angular/core';
import { CardState } from '../models/model';
import { timer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MahjongWrapperService } from './mahjong-wrapper.service';

@Component({
  selector: 'app-mahjong-wrapper',
  templateUrl: './mahjong-wrapper.component.html',
  styleUrls: ['./mahjong-wrapper.component.scss']
})
export class MahjongWrapperComponent implements OnInit {
  public cardNumbers: Array<CardState> = [];

  private cardHideSubscription: Subscription;
  private selectedCard: CardState;

  constructor(public mahjongWrapperService: MahjongWrapperService) {}

  public ngOnInit() {
    this.cardNumbers = this.mahjongWrapperService.generateAndShuffleNumbers();

    timer(3000)
      .pipe(
        take(1)
      )
      .subscribe(() => this.mahjongWrapperService.hideAllCards(this.cardNumbers))
  }

  public onCardClicked(card: CardState) {
    if (
      card.isChoosen || card.isActive
      || this.cardHideSubscription && !this.cardHideSubscription.closed
      ) {
      return;
    }

    card.isChoosen = true;

    if (!this.selectedCard) {
      this.selectedCard = card;
      return;
    }

    if (this.selectedCard && this.selectedCard.number === card.number) {
      card.isActive = true;
      this.selectedCard.isActive = true;
      this.selectedCard = null;
    } else {
      this.cardHideSubscription = timer(1000)
        .pipe(
          take(1)
        )
        .subscribe(() => {
          this.selectedCard.isChoosen = false;
          card.isChoosen = false;
          this.selectedCard = null;
        })
    }
  }
}
