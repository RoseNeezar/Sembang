import { User } from "./entities/User";
import { __prod__ } from "./constant";
import { Post } from "./entities/post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[t/j]s$/,
  },
  entities: [Post, User],
  dbName: "redditClone",
  user: "postgres",
  password: "postgres",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
