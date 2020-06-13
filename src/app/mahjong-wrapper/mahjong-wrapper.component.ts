import { Component, OnInit, ɵConsole } from '@angular/core';
import { CardState } from '../models/model';
import { timer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-mahjong-wrapper',
  templateUrl: './mahjong-wrapper.component.html',
  styleUrls: ['./mahjong-wrapper.component.scss']
})
export class MahjongWrapperComponent implements OnInit {
  public cardNumbers: Array<CardState> = [];

  private cardHideSubscription: Subscription;
  private selectedCard: CardState;

  public ngOnInit() {
    this.generateAndShuffleNumbers();

    timer(3000)
      .pipe(
        take(1)
      )
      .subscribe(() => this.hideAllCards())
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

    this.selectedCard.isChoosen = true;

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

  private generateAndShuffleNumbers() {
    for (let i = 2; i < 50; i++) {
      if (this.isPrime(i)) {
        this.cardNumbers.push({
          number: i,
          isActive: true,
          isChoosen: false,
        })
      }
    }

    this.cardNumbers = [...this.cardNumbers, ...(JSON.parse(JSON.stringify(this.cardNumbers)))]
      .sort(() => this.getRandomArbitrary(-1, 1));
  }

  private isPrime(n: number) {
    for (let i = 2; i < n; i++) {
      if (!(n % i)) {
        return false;
      }
    }

    return true;
  }

  private getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  private hideAllCards() {
    this.cardNumbers.forEach((i: CardState) => {
      i.isActive = false;
      i.isChoosen = false;
    })
  }
}
