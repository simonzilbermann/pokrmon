import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[pkmn-Border-Cart]",
})
export class BorderCartDirective {
  private intialColor: string = "#f5f5f5";
  private defaultColor: string = "#009688";
  private defaultHeight: number = 180;

  constructor(private el: ElementRef) {
    this.setBorder(this.intialColor);
    this.setHeight(this.defaultHeight);
  }

  @Input("pkmnappBorderCart") borderColor: string;

  @HostListener("mouseenter") onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }
  @HostListener("mouseleave") onMouseLeave() {
    this.setBorder(this.intialColor);
  }

  setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
  }

  setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }
}
