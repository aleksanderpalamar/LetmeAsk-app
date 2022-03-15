export interface APIUser {
  login: string;
  name: string;
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
  bio?: string;
  blog: string;
  company?: string;
  location?: string;
  email?: string;
}

export interface APIRepo {
  fork: boolean;
  name: string;
  owner: {
    login: string;
  }
  description: string;
  stargazers_count: number;
  forks: number;
  language?: string;
  html_url: string;
}