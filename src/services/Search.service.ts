import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

export const getRepositoriesWithSearch = async (
  searchParam: string,
  page: number
) => {
  try {
    let options = {
      q: `${searchParam === "" ? "#" : searchParam}+in:name`,
      per_page: 10,
      page: page,
    };
    let response = await octokit.request("GET /search/repositories", options);
    return response.data;
  } catch (error) {
    alert(error);
  }
};

export const getIssuesInRepository = async (
  owner: string,
  repo: string,
  page: number
) => {
  try {
    let response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: owner,
      repo: repo,
      per_page: 10,
      page: page,
    });
    return response.data;
  } catch (error) {
    alert(error);
  }
};
