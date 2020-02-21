import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Subscription} from 'rxjs';
import {UserInfo} from '../../services/types/myType';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  userInfo: UserInfo = {} as any;
  autoUnsubscribe: Subscription[] = [];
  constructor(
    public dataS: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.autoUnsubscribe.push(this.dataS.userInfo.subscribe(v => {
      this.userInfo = v;
    }));
  }

  ngOnDestroy() {
    this.autoUnsubscribe.forEach(v => v.unsubscribe());
  }

  getYear() {
    return new Date().getFullYear();
  }

  navigate(path: string) {
    this.router.navigate([path]).then();
  }
}
