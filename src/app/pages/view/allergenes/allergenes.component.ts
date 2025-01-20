import {Component, Input, OnInit} from '@angular/core';
import {Allergens} from '../../../../models/Allergens';
import {AllergensValuesDictionary} from '../../../../models/AllergensValuesDictionary';

@Component({
  selector: 'app-allergenes',
  imports: [],
  templateUrl: './allergenes.component.html',
  styleUrl: './allergenes.component.css'
})
export class AllergenesComponent implements OnInit{
  @Input() allergens!: Allergens;
  traces: string[] = [];
  present: string[] = [];

  ngOnInit() {
    this.traces = Object.keys(this.allergens).filter(key => this.allergens[key as keyof Allergens] === 1);
    this.present = Object.keys(this.allergens).filter(key => this.allergens[key as keyof Allergens] === 2);
  }

  getAllergenTraces(): string[] {
    return this.traces.map((allergen) => AllergensValuesDictionary[allergen]);
  }

  getAllergenPresent(): string[] {
    return this.present.map((allergen) => AllergensValuesDictionary[allergen]);
  }
}
