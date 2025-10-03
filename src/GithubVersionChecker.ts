import * as levelCi from "@level-ci/core";
import * as packagejson from "../package.json";

export class GithubVersionChecker
  extends levelCi.CoreVersionChecker
  implements levelCi.VersionChecker
{
  public readonly name = packagejson.name as levelCi.VersionChecker["name"];
  public readonly version = packagejson.version;
  public message = `
        The current version of ${this.name} is outdated.
        Please consider updating to the latest version.`;
}
