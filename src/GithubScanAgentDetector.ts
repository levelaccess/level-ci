import { ScanAgent, ScanAgentType } from "@level-ci/api";
import { Logger, ScanAgentDetector } from "@level-ci/core";
import { version } from "../package.json";

export class GithubScanAgentDetector implements ScanAgentDetector {
  constructor(private readonly logger: Logger) {}

  get(): ScanAgent {
    this.logger.debug(
      `Using ${ScanAgentType.GITHUB} scan agent version ${version}`
    );

    return {
      type: ScanAgentType.GITHUB,
      version,
    };
  }
}
