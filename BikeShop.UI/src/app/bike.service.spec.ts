import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BikeService } from './bike.service';
import { of } from 'rxjs';

export const bikesResponse = [
  {
    "manufacturer": "Carrera",
    "reference": "07e9548b-f35e-4e00-99d7-e49b5fb08907",
    "model": "Karkinos",
    "category": "Mountain Bike",
    "price": 415.00,
    "colour": "Red",
    "weight": 14,
    "imageUrl": "/assets/images/bikes/Carrera-Karkinos-Mountain-Bike.png"
  },
  {
    "manufacturer": "Indi",
    "reference": "62343d00-1503-43fb-9db4-80cd06d24345",
    "model": "ATB 1",
    "category": "Mountain Bike",
    "price": 156.60,
    "colour": "Black",
    "weight": 15.5,
    "imageUrl": "/assets/images/bikes/Indi-ATB-1-Mountain-Bike.png"
  },
  {
    "manufacturer": "Boardman",
    "reference": "79204036-aa35-405b-8030-f1562d7a4f18",
    "model": "HYB 8.8",
    "category": "Hybrid Electric Bike",
    "price": 1020.00,
    "colour": "Blue",
    "weight": 17.5,
    "imageUrl": "/assets/images/bikes/Boardman-HYB-8.png"
  },
  {
    "manufacturer": "Carrera",
    "reference": "6eddfc34-0fbd-42da-afd8-6d52566ab5a1",
    "model": "Vengeance E",
    "category": "Hybrid Electric Bike",
    "price": 1319.00,
    "colour": "Grey",
    "weight": 18,
    "imageUrl": "/assets/images/bikes/Carrera-Vengeance-E-Electric-Bike.png"
  },
  {
    "manufacturer": "Pendleton",
    "reference": "8c3c304b-b7ca-4155-af05-e6e29bfe89e0",
    "model": "Somerby Electric Bike",
    "category": "Hybrid Electric Bike",
    "price": 1450.00,
    "colour": "Dark Blue",
    "weight": 22,
    "imageUrl": "/assets/images/bikes/Pendleton-Somerby-Electric-Bike.png"
  },
  {
    "manufacturer": "X-Rated",
    "reference": "b53806b2-1774-45e6-b273-68cee9571399",
    "model": "Shockwave DBS Superleggera",
    "category": "BMX Bike",
    "price": 185.00,
    "colour": "Orange",
    "weight": 11,
    "imageUrl": "/assets/images/bikes/X-Rated-Shockwave-BMX-Bike.png"
  },
  {
    "manufacturer": "Voodoo",
    "reference": "de65dac3-bc15-413c-b9f6-93079c9eba8f",
    "model": "Zaka",
    "category": "BMX Bike",
    "price": 225.00,
    "colour": "Blue",
    "weight": 12.5,
    "imageUrl": "/assets/images/bikes/Voodoo-Zaka-BMX-Bike.png"
  },
  {
    "manufacturer": "Assist",
    "reference": "501d25e3-6cc0-4d85-a816-b8d25275c4b9",
    "model": "2021",
    "category": "Hybrid Electric Bike",
    "price": 594.00,
    "colour": "White",
    "weight": 18,
    "imageUrl": "/assets/images/bikes/Assist-Hybrid-Electric-Bike.png"
  },
  {
    "manufacturer": "Boardman",
    "reference": "91d0a29b-f352-47a1-a2b7-1b21f4e8d187",
    "model": "MHT 8.6",
    "category": "Mountain Bike",
    "price": 760.00,
    "colour": "Red",
    "weight": 13.5,
    "imageUrl": "/assets/images/bikes/Boardman-MHT-8.png"
  },
  {
    "manufacturer": "Pendleton",
    "reference": "863618e2-60fa-4742-8824-9cdd4b16a294",
    "model": "Somerby",
    "category": "Hybrid Electric Bike",
    "price": 385.00,
    "colour": "Maroon Red",
    "weight": 14.6,
    "imageUrl": "/assets/images/bikes/Pendleton-Somerby-Hybrid-Bike.png"
  },
  {
    "manufacturer": "Carrera",
    "reference": "f69caf5d-ee90-4b62-b5da-bea3f3646949",
    "model": "Virtuoso",
    "category": "Road Bike",
    "price": 520.00,
    "colour": "White",
    "weight": 11.6,
    "imageUrl": "/assets/images/bikes/Carrera-Virtuoso-Road-Bike.png"
  },
  {
    "manufacturer": "Boardman",
    "reference": "b61bea5b-4eda-4401-bfeb-aafad3f24e8f",
    "model": "SLR 8.9",
    "category": "Road Bike",
    "price": 2100.00,
    "colour": "Black",
    "weight": 11,
    "imageUrl": "/assets/images/bikes/Boardman-SLR-8.png"
  }
]

export class MockBikesService {
  mockBikesResponse: any[] = bikesResponse;
  getBikes() {
    return of(this.mockBikesResponse);
  }
}

describe('BikeService', () => {
  let service: BikeService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BikeService]
    });
    service = TestBed.inject(BikeService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getBikes method', () => {
    expect(service.getBikes).toBeDefined();
    expect(typeof service.getBikes).toEqual('function');
  });

  it('should fetch bikes correctly', () => {
    let response: any[] = [];
    service.getBikes().subscribe( data => {
      response = <any[]>data;
      expect(data).toEqual(bikesResponse);
    });
    const req = controller.expectOne({
      method: 'GET',
      url: 'http://localhost:5111/api/bikes'
    });
    req.flush(bikesResponse);
    controller.verify();
    expect(response.length).toBeGreaterThan(0);
  });
});
