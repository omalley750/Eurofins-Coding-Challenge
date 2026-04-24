import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bike } from '../../models/bike.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() bike: Bike = {} as Bike;
  @Output() addToFavourites: EventEmitter<string> = new EventEmitter<string>();

  addBikeToFavourites(value: string) {
    this.addToFavourites.emit(value);
  }
}
