import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  showMore1: boolean = false;
  showMore2: boolean = false;
  showMore3: boolean = false;
  showMore4: boolean = false;
  isMuted = true;
  isPlaying = true;

  constructor(private router: Router, private el: ElementRef, private renderer: Renderer2) {}

  // Toggle Read More for specific sections
  toggleReadMore(section: 'showMore1' | 'showMore2' | 'showMore3' | 'showMore4'): void {
    this[section] = !this[section];
  }

  // Navigate to Shop
  navigateToShop() {
    window.location.href = '/shop';
  }

  // Mute/Unmute video
  toggleMute() {
    const video = document.getElementById('heroVideo') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      this.isMuted = video.muted;
    }
  }

  // Play video
  playVideo() {
    const video = document.getElementById('heroVideo') as HTMLVideoElement;
    if (video) {
      video.play();
      this.isPlaying = true;
    }
  }

  // Stop video
  stopVideo() {
    const video = document.getElementById('heroVideo') as HTMLVideoElement;
    if (video) {
      video.pause();
      video.currentTime = 0; // Reset to the start
      this.isPlaying = false;
    }
  }

  ngAfterViewInit(): void {
    // Select all titles with the appropriate classes
    const headings = this.el.nativeElement.querySelectorAll(
      '.vision-title, .consultation-title, .intro-title, .services-title, .statistics-title'
    );
  
    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'glowing'); // Add glowing class
          } else {
            this.renderer.removeClass(entry.target, 'glowing'); // Remove glowing class
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );
  
    // Observe each title
    headings.forEach((heading: Element) => {
      observer.observe(heading);
    });
  }
}
