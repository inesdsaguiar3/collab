import { PathFinderFlow } from "@/components/PathFinderFlow";

/**
 * Homepage “Your path” / Path Finder block. Set to `true` to show it again;
 * `PathFinderFlow`, `/api/path-finder`, and `lib/pathFinder.ts` stay in the repo.
 */
const SHOW_PATH_FINDER_ON_HOME = false;

export function WhyHereSection() {
  if (!SHOW_PATH_FINDER_ON_HOME) return null;
  return <PathFinderFlow />;
}
