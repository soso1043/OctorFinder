import axios from "axios";

export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
}

export const fetchGitHubProfile = async (
  username: string
): Promise<GitHubProfile> => {
  const response = await axios.get<GitHubProfile>(
    `https://api.github.com/users/${username}`
  );
  return response.data;
};

export const fetchGitHubRepos = async (
  username: string
): Promise<GitHubRepo[]> => {
  const response = await axios.get<GitHubRepo[]>(
    `https://api.github.com/users/${username}/repos`
  );
  return response.data;
};
