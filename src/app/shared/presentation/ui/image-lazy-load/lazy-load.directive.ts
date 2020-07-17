import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef, HostBinding, Inject, Input, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective implements AfterViewInit {
  @HostBinding('style.background-image') srcAttr = null;
  @Input() src: string;

  constructor(private el: ElementRef, private changeDetectorRef: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId, ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
    }
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadImage();
          obs.unobserve(this.el.nativeElement);
        }
      });
    });
    obs.observe(this.el.nativeElement);
  }

  private loadImage() {
    this.srcAttr = `url(${this.src})`;
    this.changeDetectorRef.detectChanges();
  }

}
