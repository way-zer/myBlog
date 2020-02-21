import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {Actor, Connection, Issue} from '../types/github';

interface Resp {
  user: Actor&{
    followers: Connection<Actor>,
    repository: { url: string, issues: Connection<Issue> },
  };
}

interface Params {
  user: string;
  blogRepo: string;
  issuesAfter?: string;
}


@Injectable({
  providedIn: 'root'
})
export class QueryIssuesService extends Query<Resp, Params> {
  document = gql`
    query getIssues($user:String!,$blogRepo:String!,$issuesAfter:String)
    {
      user(login: $user){
        avatarUrl
        followers {
          totalCount
        }
        url
        login
        repository(name: $blogRepo) {
          url
          issues(first: 10, orderBy: {field: CREATED_AT, direction: DESC},after: $issuesAfter) {
            nodes {
              createdAt
              updatedAt
              labels(first: 10) {
                nodes {
                  name
                  color
                  description
                }
              }
              title
              number
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    }
  `;
}
