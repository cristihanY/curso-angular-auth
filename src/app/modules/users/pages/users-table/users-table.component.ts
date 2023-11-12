import { Component, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit {


  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: User | null = null;

    

  constructor(
      private userService: UsersService,  
  ) {

  }

  ngOnInit(): void {
        this.refresh();
        this.userService.user$.subscribe(
          user => {
            this.user = user;
          }
        )
  }

  refresh(){
    this.userService.getUsers()
    .subscribe(users => {
      this.dataSource.init(users)  
    })

  }
}
