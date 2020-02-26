import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent implements OnInit {
  @Input() review: any;
  loggedInUserId: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const userInfo =
      JSON.parse(this.authService.loadUserInfo()) || 'No user data';
    this.loggedInUserId = userInfo.id;
  }
}
