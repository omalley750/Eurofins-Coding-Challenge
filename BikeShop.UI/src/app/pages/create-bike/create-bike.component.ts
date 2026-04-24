import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../bike.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-bike',
  templateUrl: './create-bike.component.html',
  styleUrls: ['./create-bike.component.scss']
})
export class CreateBikeComponent implements OnInit {
  form!: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private bikeService: BikeService, private router: Router) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      manufacturer: ['', [Validators.required, Validators.maxLength(100)]],
      model: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', [Validators.required, Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      colour: ['', [Validators.required, Validators.maxLength(100)]],
      weight: [null, [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      imageUrl: ['', [Validators.required, Validators.maxLength(255), Validators.pattern(/^(https?:\/\/[^\s]+|\/assets\/images\/[^\s]+)$/i)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.bikeService.createBike(this.form.value).subscribe({
      next: (bike) => this.router.navigate(['/bike-details', bike.reference]),
      error: () => this.errorMessage = 'Failed to create bike. Please try again.'
    });
  }
}
