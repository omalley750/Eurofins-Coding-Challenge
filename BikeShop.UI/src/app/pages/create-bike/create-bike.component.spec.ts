import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CreateBikeComponent } from './create-bike.component';
import { BikeService } from '../../bike.service';
import { HttpClientModule } from '@angular/common/http';
import { mockBike } from 'src/app/components/item/item.component.spec';
import { of, throwError } from 'rxjs';

class MockRouter {
  navigate() { }
}

describe('CreateBikeComponent', () => {
  let component: CreateBikeComponent;
  let fixture: ComponentFixture<CreateBikeComponent>;
  let bikeService: BikeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBikeComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBikeComponent);
    component = fixture.componentInstance;
    bikeService = TestBed.inject(BikeService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not call createBike when form is invalid', () => {
    spyOn(bikeService, 'createBike');
    component.onSubmit();
    expect(bikeService.createBike).not.toHaveBeenCalled();
  });

  it('should call createBike and navigate on successful form submission', () => {
    component.form.setValue({
      manufacturer: 'Carrera',
      model: 'Karkinos',
      category: 'Mountain Bike',
      price: 415,
      colour: 'Red',
      weight: 14,
      imageUrl: '/assets/images/bikes/Carrera-Karkinos-Mountain-Bike.png'
    });
    spyOn(bikeService, 'createBike').and.returnValue(of(mockBike as any));
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.onSubmit();

    expect(bikeService.createBike).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/bike-details', mockBike.reference]);
  });

  it('should set errorMessage on failed form submission', () => {
    component.form.setValue({
      manufacturer: 'Carrera',
      model: 'Karkinos',
      category: 'Mountain Bike',
      price: 415,
      colour: 'Red',
      weight: 14,
      imageUrl: '/assets/images/bikes/Carrera-Karkinos-Mountain-Bike.png'
    });
    spyOn(bikeService, 'createBike').and.returnValue(throwError(() => new Error('Error occurred')));

    component.onSubmit();

    expect(component.errorMessage).toBe('Failed to create bike. Please try again.');
  });
});
