import { Upvote } from "./../entities/Upvote";

import DataLoader from "dataloader";

// [{postId: 5, userId: 10}]
// [{postId: 5, userId: 10, value: 1}]
export const createUpvoteLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Upvote | null>(
    async (keys) => {
      const updoots = await Upvote.findByIds(keys as any);
      const updootIdsToUpdoot: Record<string, Upvote> = {};
      updoots.forEach((updoot) => {
        updootIdsToUpdoot[`${updoot.userId}|${updoot.postId}`] = updoot;
      });

      return keys.map(
        (key) => updootIdsToUpdoot[`${key.userId}|${key.postId}`]
      );
    }
  );
