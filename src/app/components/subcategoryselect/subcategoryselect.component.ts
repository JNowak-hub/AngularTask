import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Industry} from '../../models/industry/Industry';

@Component({
  selector: 'app-subcategoryselect',
  templateUrl: './subcategoryselect.component.html',
  styleUrls: ['./subcategoryselect.component.css']
})
export class SubcategoryselectComponent implements OnInit {

  @Output() subcategory = new EventEmitter<string>();
  @Input() selectedIndustry: Industry;
  selectedSubcategory: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.selectedIndustry.name);
  }

  emmitValue(value: string ): void {
    this.subcategory.emit(value);
  }
}
