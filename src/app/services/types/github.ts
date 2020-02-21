export interface Actor {
  avatarUrl: string;
  url: string;
  login: string;
}

export interface Issue {
  title: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  labels: Connection<Label>;
}

export interface Issue2 {
  title: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  labels: Label[];
}

export interface Label {
  name: string;
  color: string;
  description: string;
}

export interface Comment {
  bodyHTML: string;
  createdAt: string;
  updatedAt: string;
  author: Actor;
}

export const emptyConnection: Connection<any> = {
  pageInfo: {hasNextPage: false},
  nodes: [],
  totalCount: 0,
};

export interface Connection<T> {
  pageInfo: PageInfo;
  nodes: T[];
  totalCount: number;
}

interface PageInfo {
  endCursor?: string;
  hasNextPage: boolean;
}
