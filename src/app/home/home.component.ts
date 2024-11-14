import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showMore1: boolean = false;
  isMuted = true;
  isPlaying = true;
  
  showMore2: boolean = false;
  showMore3: boolean = false;
  showMore4: boolean = false;
  toggleReadMore1() {
    this.showMore1 = !this.showMore1;
  }

  getReadMoreText1() {
    return this.showMore1 ? 'READ_LESS' : 'READ_MORE';
  }

  constructor(private router: Router) {}

  navigateToShop() {
    window.location.href = '/shop';
  }



  toggleMute() {
    const video = document.getElementById('heroVideo') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      this.isMuted = video.muted;
    }
  }
  
  playVideo() {
    const video = document.getElementById('heroVideo') as HTMLVideoElement;
    if (video) {
      video.play();
      this.isPlaying = true;
    }
  }
  
  stopVideo() {
    const video = document.getElementById('heroVideo') as HTMLVideoElement;
    if (video) {
      video.pause();
      video.currentTime = 2;
      this.isPlaying = false;
    }
  }
  


  toggleReadMore(section: 'showMore1' | 'showMore2' | 'showMore3' | 'showMore4'): void {
    this[section] = !this[section];
  }
  

}
  
  

