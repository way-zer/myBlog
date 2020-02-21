import { Injectable } from '@angular/core';
import {LoadableData} from './types/loadableData';
import {QueryIssuesService} from './graghql/query-issues.service';
import {CONFIG} from '../../environments/config';
import {filter, map} from 'rxjs/operators';
import {IssueDetail0, QueryIssueService} from './graghql/query-issue.service';
import {Observable} from 'rxjs';
import {UserInfo} from './types/myType';
import {emptyConnection, Issue2} from './types/github';
import {NzMessageService} from 'ng-zorro-antd';

const initialData = {login: 'UNKNOWN', followers: emptyConnection, repository: {}}as any;
const initialIssue: Partial<IssueDetail0> = {
  title: '加载内容中', bodyHTML: '<h2>Wait</h2><h2>Wait</h2><h2>Wait</h2>', comments: emptyConnection
};
const commonVar = {user: CONFIG.github.user, blogRepo: CONFIG.github.blogRepo};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private queryIssues: QueryIssuesService,
    private queryIssue: QueryIssueService,
    private message: NzMessageService,
  ) { }
  public baseData = new LoadableData(initialData, () =>
    this.queryIssues.fetch(commonVar, {errorPolicy: 'ignore'}).pipe(
      map(v => v.data),
      filter(v => !!v),
      map(v => v.user),
    ).toPromise().catch(err => {
      console.error(err);
      this.message.error('网络错误' + err.message);
      return Promise.reject();
    })
  , false);
  public userInfo: Observable<UserInfo> = this.baseData.subject.pipe(
    map(({avatarUrl, followers, url, login, repository}) => ({
      name: login, avatarUrl, followers: followers.totalCount, homeUrl: url, blogUrl: repository.url
    }))
  );
  public issues: Observable<Issue2[]> = this.baseData.subject.pipe(
    map(({repository}) => (repository.issues.nodes)),
    // tslint:disable-next-line:variable-name
    map(list => list.map(({createdAt, updatedAt, labels, title, number}) => ({
      createdAt, updatedAt, labels: labels.nodes, title, number
    })))
  );
  public loadIssue(issueNum: number) {
    return new LoadableData(initialIssue, () =>
      this.queryIssue.fetch({...commonVar, issueNum}, {errorPolicy: 'ignore'}).pipe(
        map(v => v.data),
        filter(v => !!v),
        map(v => v.repository.issue)
      ).toPromise().catch(err => {
        console.error(err);
        this.message.error('网络错误' + err.message);
        return Promise.reject();
      })
    );
  }
  // TODO loadMore
}
