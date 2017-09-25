import {Injectable} from '@angular/core';
import {VariantTypeModel} from '../models/api/variant-type.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class VariantTypeService {
  private readonly VARIANT_TYPE_TREE: VariantTypeModel[] = [
    {
      name: "SNV",
      children: [
        {name: "Missense"},
        {name: "Nonsense"},
        {name: "Splice Site"},
        {name: "Frameshift"}

      ]
    },
    {
      name: "Deletion",
      children: [
        {name: "Whole"},
        {
          name: "Partial",
          children: [
            {name: "Intragenic"},
            {name: "5'"},
            {name: "3'"}
          ]
        }
      ]
    },
    {
      name: "Duplication",
      children: [
        {name: "Whole"},
        {
          name: "Partial",
          children: [
            {name: "Intragenic"},
            {name: "5'"},
            {name: "3'"}
          ]
        }
      ]
    }
  ];

  constructor() {
  }

  getVariantTypeTree(): Observable<VariantTypeModel[]> {
    return Observable.of(this.VARIANT_TYPE_TREE);
  }
}
