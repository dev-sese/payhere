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
