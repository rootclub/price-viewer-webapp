import {Component, Input} from '@angular/core';
import {NutritionFacts} from '../../../../models/NutritionFacts';
import {KeyValuePipe, NgForOf} from '@angular/common';
import {NutritionValuesDictionary} from '../../../../models/NutritionValuesDictionary';

@Component({
  selector: 'app-nutrition-facts',
  imports: [
    NgForOf,
    KeyValuePipe
  ],
  templateUrl: './nutrition-facts.component.html',
  styleUrl: './nutrition-facts.component.css'
})
export class NutritionFactsComponent {
  @Input() nutritionFacts!: NutritionFacts;
  excludeKeys: string[] = ['weightVolume', 'weightVolumeUnit', 'energy', 'ethanol'];


  getComponents(): { [key: string]: number } {
    const dictionary: { [key: string]: number } = {};
    for (const key in this.nutritionFacts) {
      if (this.nutritionFacts[key as keyof NutritionFacts] != null && !this.excludeKeys.includes(key)) {
        dictionary[key] = this.nutritionFacts[key as keyof NutritionFacts] as number;
      }
    }
    return dictionary;
  }

  // If the weight is not given, the values are returned as is, normalized to 100g
  // If the weight is given, the values are normalized to the given weight of the product
  normalizeToWeight(nutritionComponent: number): number {
    if (this.isWeightNormalized()) {
        return this.formatNumber((nutritionComponent / 100) * this.nutritionFacts.weightVolume!);
    } else {
        return nutritionComponent;
    }
  }

  isWeightNormalized(): boolean {
    return this.nutritionFacts.weightVolumeUnit === 'g' && this.nutritionFacts.weightVolume != null
  }

  formatNumber(value: number): number {
    if (value >= 1) {
      // Round to 2 decimal places for values >= 1
      return Math.round(value * 100) / 100;
    } else {
      // For values < 1, trim after the first group of significant digits (up to 3)
      const strValue = value.toString();
      const match = strValue.match(/0\.0*([1-9]{1,3})/);
      if (match) {
        const significantDigits = match[1].substring(0, 3); // Keep up to 3 significant digits
        return parseFloat(`0.${'0'.repeat(match[0].length - 2)}${significantDigits}`);
      } else {
        return value; // Return as is if no match (e.g., 0.0)
      }
    }
  }

  protected readonly NutritionValuesDictionary = NutritionValuesDictionary;
}
