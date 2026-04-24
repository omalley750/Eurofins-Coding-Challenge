import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeDetailsComponent } from './bike-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { BikeService } from '../../bike.service';
import { mockBike } from 'src/app/components/item/item.component.spec';
import { of, throwError} from 'rxjs';

describe('BikeDetailsComponent', () => {
  let component: BikeDetailsComponent;
  let fixture: ComponentFixture<BikeDetailsComponent>;
  let bikeService: BikeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BikeDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '07e9548b-f35e-4e00-99d7-e49b5fb08907' } } }
        }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BikeDetailsComponent);
    component = fixture.componentInstance;
    bikeService = TestBed.inject(BikeService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load bike on init', () => {
    spyOn(bikeService, 'getBikeByReference').and.returnValue(of(mockBike as any));
    fixture.detectChanges();
    expect(component.bike).toEqual(mockBike as any);
  });

  it('should set errorMessage when getBikeByReference fails', () => {
    spyOn(bikeService, 'getBikeByReference').and.returnValue(throwError(() => new Error('Not found')));
    fixture.detectChanges();
    expect(component.errorMessage).toBe('Bike not found');
    expect(component.bike).toBeNull();
  });
});
