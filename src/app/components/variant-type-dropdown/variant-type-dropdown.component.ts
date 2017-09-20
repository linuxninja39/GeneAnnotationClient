import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {DynamicComponentDirective} from '../../directives/dynamic-component.directive';
import {RecursiveSelectItem} from './recursive-select-item';
import {VariantTypeModel} from '../../models/api/variant-type.model';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-variant-type-dropdown',
  templateUrl: './variant-type-dropdown.component.html',
  styleUrls: ['./variant-type-dropdown.component.scss']
})
export class VariantTypeDropdownComponent implements OnInit {
  private _variantTypes: VariantTypeModel[];
  @Input()
  get variantTypes(): VariantTypeModel[] {
    return this._variantTypes;
  }
  set variantTypes(variantTypes: VariantTypeModel[]) {
    this._variantTypes = variantTypes;
    this.selectItems = this.convertVariantTypesToSelectItems(variantTypes);
  }

  selectItems: SelectItem[];

  @ViewChild(DynamicComponentDirective)
  newDropDown: DynamicComponentDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    console.log('variantTypes are', this.variantTypes);
  }

  valueChange(event) {
    console.log('event', event);
    console.log('value', event.value);
    const selectedVariantType = event.value;

    if (selectedVariantType.children && selectedVariantType.children.length > 0) {
      this.addDropdown(selectedVariantType.children);
    }
  }

  addDropdown(children) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(VariantTypeDropdownComponent);
    const viewContainerRef = this.newDropDown.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.variantTypes = children;
    componentRef.changeDetectorRef.detectChanges();
  }

  private convertVariantTypesToSelectItems(types: VariantTypeModel[]): SelectItem[] {
    const selectItems: SelectItem[] = [];
    if (!types) {return this.selectItems};
    for (const variantType of types) {
      selectItems.push(
        {
          label: variantType.name,
          value: variantType
        }
      );
    }
    return selectItems;
  }
}
