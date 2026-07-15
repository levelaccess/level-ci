import * as github from "@actions/github";
import * as levelCi from "@level-ci/core";
import { execSync } from "child_process";

export class GithubAutodetectedConfig
  extends levelCi.GitAutodetectedConfig
  implements levelCi.AutodetectedConfig
{
  public get commitHash(): string {
    if (github.context.payload.pull_request) {
      return github.context.payload.pull_request.head.sha!;
    }

    return github.context.sha || super.commitHash;
  }

  public get targetBranch(): string | undefined {
    if (github.context.payload.pull_request) {
      return github.context.payload.pull_request.base.ref;
    }
  }

  public get pullRequest(): number | undefined {
    if (github.context.payload.pull_request) {
      return github.context.payload.pull_request.number;
    }
  }

  public get branch(): string {
    if (github.context.payload.pull_request) {
      return github.context.payload.pull_request.head.ref;
    }

    if (github.context.ref.startsWith("refs/heads/")) {
      return github.context.ref.slice("refs/heads/".length);
    }

    const branch = execSync(
      `git branch -r --contains "${github.context.ref}" --format="%(refname:lstrip=3)"`,
      { encoding: "utf8" },
    )
      .split("\n")
      .map((line) => line.trim())
      .find((name) => name.length > 0 && name !== "HEAD");

    return branch ?? super.branch;
  }
}
