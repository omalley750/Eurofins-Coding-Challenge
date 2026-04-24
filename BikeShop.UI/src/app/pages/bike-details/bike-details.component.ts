import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BikeService } from '../../bike.service';
import { Bike } from '../../models/bike.model';

@Component({
  selector: 'app-bike-details',
  templateUrl: './bike-details.component.html',
  styleUrls: ['./bike-details.component.scss']
})
export class BikeDetailsComponent implements OnInit {
  bike: Bike | null = null;
  errorMessage = '';
  inFavourites = false;


  constructor(private route: ActivatedRoute, private bikeService: BikeService) { }

  ngOnInit(): void {
    const reference = this.route.snapshot.paramMap.get('reference');
    if (reference) {
      this.bikeService.getBikeByReference(reference).subscribe({
        next: (bike) => {
          this.bike = bike;
          const storedFavourites: string[] = JSON.parse(localStorage.getItem('favouriteBikes') ?? '[]');
          this.inFavourites = storedFavourites.includes(bike.reference);
        },
        error: () => {
          this.errorMessage = 'Bike not found';
        }
      });
    }
  }

  addToFavourites() {
    if (!this.bike) return;
    const favourites: string[] = JSON.parse(localStorage.getItem('favouriteBikes') ?? '[]');
    if (!favourites.includes(this.bike.reference)) {
      favourites.push(this.bike.reference);
      localStorage.setItem('favouriteBikes', JSON.stringify(favourites));
    }
    this.inFavourites = true;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (!img.src.includes('/assets/images/bikes/placeholder-bike.png')) {
      img.src = '/assets/images/bikes/placeholder-bike.png';
    }
  }

}
