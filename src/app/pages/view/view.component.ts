import {Component, HostListener, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router, RouterLink} from "@angular/router";
import { GetPriceService } from '../../../services/get-price.service';
import {catchError, Subject, throttleTime} from 'rxjs';
import {NutritionFacts} from '../../../models/NutritionFacts';
import {NutritionFactsComponent} from './nutrition-facts/nutrition-facts.component';
import {AllergenesComponent} from './allergenes/allergenes.component';
import {Allergens} from '../../../models/Allergens';
import {environment} from '../../../enviroment';
import {getSettings} from '../../../getSettings';
import {formatCurrency} from "@angular/common";

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterLink, NutritionFactsComponent, AllergenesComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
  barcode!: string;
  activatedRoute = inject(ActivatedRoute);
  getPricesService = inject(GetPriceService);
  router = inject(Router);
  price!: number;
  nutritionFacts?: NutritionFacts;
  allergens?: Allergens;
  queryParams: any;
  timeoutId: any;
  private mouseActivityHappenedSubject = new Subject<void>();

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.mouseActivityHappenedSubject.next();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseActivityHappenedSubject.next();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.queryParams = params;
    });

    this.mouseActivityHappenedSubject.pipe(
      throttleTime(1500)
    ).subscribe(() => {
      this.mouseActivityHappened();
    });

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.barcode = paramMap.get('id') ?? '';

      this.getPricesService.get(this.barcode).pipe(
        catchError((error) => {
          this.router.navigate(['/scan'], { queryParams: { error: 'true' } });
          return error;
        }))
        .subscribe((priceInfo:any) => {
          this.price = priceInfo.price;
          this.nutritionFacts = priceInfo.nutritionFacts;
          if (!Object.values(priceInfo.allergens).every(value => value === 0 || value === null || value === undefined || value === '')) {
            this.allergens = priceInfo.allergens;
          }
        },
        );
    });
  }

  private startTimeout() {
    if (!getSettings.isKioskMode()) {
      return;
    }
    this.timeoutId = setTimeout(() => {
      this.router.navigate(['/scan']);
    }, environment.kioskPageTimeout);
  }

  private mouseActivityHappened() {
    clearTimeout(this.timeoutId);
    this.startTimeout();
  }

  protected readonly formatCurrency = formatCurrency;
}
