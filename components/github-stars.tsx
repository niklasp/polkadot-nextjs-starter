import { GithubStarsClient } from "./github-stars-client";

export function GithubStars() {
  return (
    <div className="absolute top-4 right-4 z-50">
      <GithubStarsClient repo="niklasp/polkadot-nextjs-starter" />
    </div>
  );
}
