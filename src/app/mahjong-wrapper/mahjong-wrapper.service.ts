import { Injectable } from '@angular/core';
import { CardState } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class MahjongWrapperService {
  public generateAndShuffleNumbers() {
    const cardNumbers = [];
    
    for (let i = 2; i < 50; i++) {
      if (this.isPrime(i)) {
        cardNumbers.push({
          number: i,
          isActive: true,
          isChoosen: false,
        })
      }
    }

    return [...cardNumbers, ...(JSON.parse(JSON.stringify(cardNumbers)))]
      .sort(() => this.getRandomArbitrary(-1, 1));
  }

  public isPrime(n: number) {
    for (let i = 2; i < n; i++) {
      if (!(n % i)) {
        return false;
      }
    }

    return true;
  }

  public getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  public hideAllCards(cardNumbers) {
    cardNumbers.forEach((i: CardState) => {
      i.isActive = false;
      i.isChoosen = false;
    })
  }
}
