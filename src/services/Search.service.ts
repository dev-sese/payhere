import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

export const getRepositoriesWithSearch = async (searchParam: string) => {
  try {
    let options: any = {
      q: `${searchParam === "" ? "#" : searchParam}+in:name`,
    };
    let response = await octokit.request("GET /search/repositories", options);
    return response.data.items;
  } catch (error) {
    alert(error);
  }
};

export const getIssuesInRepository = async (owner: string, repo: string) => {
  try {
    let response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: owner,
      repo: repo,
    });
    return response;
  } catch (error) {
    alert(error);
  }
};
