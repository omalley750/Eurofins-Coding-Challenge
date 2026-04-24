import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../bike.service';
import { Bike } from '../../models/bike.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bikes: Bike[] = [];
  favourites: string[] = [];

  constructor(private bikeService: BikeService) { }

  ngOnInit(): void {
    this.bikeService.getBikes().subscribe({
      next: (response) => {
        this.bikes = response;
      },
      error: (error) => console.log('Error: ', error)
    });
  }

  markBikeAsFavourite(bikeList: Bike[], favouriteBikeRef: string) {
    const bikeFound = bikeList.find((bike: Bike) => bike.reference === favouriteBikeRef);
    if (bikeFound) {
      bikeFound.inFavourites = true;
    }
  }

  addBikeToFavourites(ref: string) {
    this.markBikeAsFavourite(this.bikes, ref);

    const existingFavourites = localStorage.getItem('favouriteBikes');

    if (existingFavourites) {
      try {
        let parsedFavourites: string[] = JSON.parse(existingFavourites);
        parsedFavourites.push(ref);
        localStorage.setItem('favouriteBikes', JSON.stringify(parsedFavourites));
      } catch {
        throw new Error('Failed to parse favourites');
      }
    } else {
      localStorage.setItem('favouriteBikes', JSON.stringify([ref]));
    }
  }
}
