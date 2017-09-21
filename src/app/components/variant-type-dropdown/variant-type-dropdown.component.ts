import {Component, ComponentFactoryResolver, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {DynamicComponentDirective} from '../../directives/dynamic-component.directive';
import {RecursiveSelectItem} from './recursive-select-item';
import {VariantTypeModel} from '../../models/api/variant-type.model';
import {SelectItem} from 'primeng/primeng';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-variant-type-dropdown',
  templateUrl: './variant-type-dropdown.component.html',
  styleUrls: ['./variant-type-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VariantTypeDropdownComponent),
      multi: true
    }
  ]
})
export class VariantTypeDropdownComponent implements OnInit, ControlValueAccessor {
  private onChange = (val: any) => {};

  @Input('value') _value: VariantTypeModel;
  get value() {
    console.log('got value', this._value);
    return this._value;
  }
  set value(val: VariantTypeModel) {
    console.log('set value', val);
    this._value = val;
    this.onChange(val);
  }

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

  private parent: VariantTypeDropdownComponent;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    console.log('ngOnInit variantTypes are', this.variantTypes);
    console.log('ngOnInit parent is', this.parent);
  }

  valueChange(event) {
    console.log('valueChange', event.value);
    const selectedVariantType = event.value;

    this.value = event.value;
    if (this.parent) {
      this.parent.value = this.value;
    }

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
    componentRef.instance.parent = this;
    componentRef.changeDetectorRef.detectChanges();
  }

  private convertVariantTypesToSelectItems(types: VariantTypeModel[]): SelectItem[] {
    const selectItems: SelectItem[] = [];
    if (!types) {
      return this.selectItems;
    }

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

  writeValue(obj: VariantTypeModel): void {
    console.log('writeValue');
    this.value = obj;
  }

  registerOnChange(fn: (val: any) => void): void {
    console.log('registerOnChange', fn);
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('registerOnTouched', fn);
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}
