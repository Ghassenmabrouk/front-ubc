import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-preloadvideo',
  templateUrl: './preload-video.component.html',
  styleUrls: ['./preload-video.component.css']
})
export class PreloadVideoComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    
    for (let i = 0; i < 50; i++) {
      const ball = this.renderer.createElement('div');
      this.renderer.addClass(ball, 'floating-balls');
      this.renderer.setStyle(ball, 'top', `${Math.random() * 100}%`);
      this.renderer.setStyle(ball, 'left', `${Math.random() * 100}%`);
      this.renderer.setStyle(ball, 'animation-delay', `${Math.random() * 4}s`);
      this.renderer.appendChild(this.el.nativeElement.querySelector('.preload-wrapper'), ball);
    }

    
    setTimeout(() => {
      this.showElement('#cityImage', 4000);  
      this.hideElement('#ubcLogo', 4000);    
    }, 7000);

    setTimeout(() => {
      this.hideElement('#cityImage', 4000);  
      this.showElement('#businessImage', 4000);  
    }, 12000);

    setTimeout(() => {
      this.hideElement('#businessImage', 4000);  
      this.el.nativeElement.querySelector('.preload-wrapper').classList.add('hidden');
    }, 16000);
  }

  
  showElement(selector: string, duration: number) {
    const element = this.el.nativeElement.querySelector(selector);
    if (element) {
      this.renderer.setStyle(element, 'opacity', '0');
      this.renderer.setStyle(element, 'transition', `opacity ${duration}ms`);
      setTimeout(() => {
        this.renderer.setStyle(element, 'opacity', '1');
      }, 0);
    }
  }

  
  hideElement(selector: string, duration: number) {
    const element = this.el.nativeElement.querySelector(selector);
    if (element) {
      this.renderer.setStyle(element, 'transition', `opacity ${duration}ms`);
      this.renderer.setStyle(element, 'opacity', '0');
    }
  }
}
