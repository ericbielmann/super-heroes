import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Renderer2,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UppercaseDirective),
      multi: true,
    },
  ],
})
export class UppercaseDirective implements ControlValueAccessor {
  onChange: (_: any) => void;

  touched: () => void;

  constructor(
    @Self() private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('blur', ['$event'])
  onBlur() {
    this.touched();
  }

  @HostListener('keyup', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    const value = this.elementRef.nativeElement.value.toUpperCase();
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
    this.onChange(value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  writeValue(value: any): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }
}
