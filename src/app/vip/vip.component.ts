import { Component } from '@angular/core';

@Component({
  selector: 'app-vip',
  templateUrl: './vip.component.html',
  styleUrls: ['./vip.component.css']
})
export class VipComponent {
  exclusiveProducts = [
    { 
      name: 'Exclusive Watch', 
      price: 99.99, 
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEzfHxleGNsdXNpdmUlMjB3YXRjaHxlbnwwfHx8fDE2OTE1NzY1NzM&ixlib=rb-1.2.1&w=800' 
    },
    { 
      name: 'Luxury Handbag', 
      price: 149.99, 
      image: 'https://s.yimg.com/ny/api/res/1.2/9sa7il8bPi2Qa_B9SvHNww--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MA--/https://media.zenfs.com/en/wwd_409/ecd47fda05e4e4e29b7323035e879982' 
    },
    { 
      name: 'Designer Sunglasses', 
      price: 199.99, 
      image: 'https://vakayeyewear.com/wp-content/uploads/2017/03/lella-wenge-round-designer-sunglasses-featuring-jewelry.jpg' 
    }
  ];

  premiumContent = [
    { title: 'Premium Content 1', description: 'Description for premium content 1' },
    { title: 'Premium Content 2', description: 'Description for premium content 2' },
    { title: 'Premium Content 3', description: 'Description for premium content 3' }
  ];

  exclusiveEvents = [
    { name: 'Exclusive Event 1', date: new Date('2024-09-01') },
    { name: 'Exclusive Event 2', date: new Date('2024-10-15') },
    { name: 'Exclusive Event 3', date: new Date('2024-11-20') }
  ];
}
