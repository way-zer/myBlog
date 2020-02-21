import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadableData} from '../../services/types/loadableData';
import {IssueDetail0} from '../../services/graghql/query-issue.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  public data: LoadableData<IssueDetail0>;

  constructor(
    private dataS: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    if (!id) {
      return this.back();
    }
    this.data = this.dataS.loadIssue(id);
  }

  back() {
    this.router.navigate(['..']).then();
  }
}
