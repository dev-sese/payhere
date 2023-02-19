import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

export const getRepositoriesWithSearch = async () => {
  let options: any = { q: "test" };
  let response = await octokit.request("GET /search/repositories", options);
  return response;
};
