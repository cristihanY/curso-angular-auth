import { Component, OnInit } from '@angular/core';

import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit{
  constructor(
  private  userService: UsersService,

  ) {}

  ngOnInit(): void {
      this.userService.getProfileUser().subscribe();
  }
}
