import { Component,OnInit } from '@angular/core';

import { AboutDummyService } from './about-dummy.service';

/**
 * This class represents the lazy loaded AboutComponent.
 */

class UserCredsModel {
  UserName: string = '';
  Password: string = '';
}

@Component({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})

export class AboutComponent implements OnInit {
  value: Date;
  registerUsr: UserCredsModel;

  constructor(private dummyService: AboutDummyService) {
    this.value = new Date();
  }

  ngOnInit() {
    this.value = new Date();
  }

  register() {
    alert(JSON.stringify(this.registerUsr));
    console.log('register called : ',this.dummyService.post$(this.registerUsr));
  }
 }
