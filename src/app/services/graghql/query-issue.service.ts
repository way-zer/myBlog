import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {Comment, Connection, Issue} from '../types/github';

export interface IssueDetail0 extends Issue {
  url: string;
  bodyHTML: string;
  viewerCanReact: boolean;
  comments: Connection<Comment>;
}

interface Resp {
  repository: {
    issue: IssueDetail0
  };
}

interface Params {
  user: string;
  blogRepo: string;
  issueNum: number;
}

@Injectable({
  providedIn: 'root'
})
export class QueryIssueService extends Query<Resp, Params> {
  document = gql`
    query queryIssue($user:String!,$blogRepo:String!,$issueNum: Int!){
      repository(owner: $user,name: $blogRepo){
        issue(number: $issueNum){
          title
          createdAt
          updatedAt
          bodyHTML
          url
          viewerCanReact
          comments(first: 10){
            nodes{
              author{
                login
                url
                avatarUrl
              }
              bodyHTML
              createdAt
              updatedAt
            }
            pageInfo{
              endCursor
              hasNextPage
            }
            totalCount
          }
        }
      }
    }
  `;
}

