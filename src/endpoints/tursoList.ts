import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Client as LibsqlClient, createClient } from "@libsql/client/web";
import { Task } from "../types";

function buildLibsqlClient(env: any): LibsqlClient {
  const url = env.TURSO_URL?.trim();
  console.log("🚀 QuyNH: env.TURSO_URL", env.TURSO_URL)
  if (url === undefined) {
    throw new Error("TURSO_URL env var is not defined");
  }

  const authToken = env.TURSO_AUTH_TOKEN?.trim();
  console.log("🚀 QuyNH: env.TURSO_AUTH_TOKEN", env.TURSO_AUTH_TOKEN)
  if (authToken == undefined) {
    throw new Error("TURSO_AUTH_TOKEN env var is not defined");
  }

  return createClient({ url, authToken });
}

export class TursoList extends OpenAPIRoute {
  schema = {
    tags: ["Tasks"],
    summary: "List Tasks",
    request: {
      query: z.object({
        page: Num({
          description: "Page number",
          default: 0,
        }),
        isCompleted: Bool({
          description: "Filter by completed flag",
          required: false,
        }),
      }),
    },
    responses: {
      "200": {
        description: "Returns a list of tasks",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                result: z.object({
                  tasks: Task.array(),
                }),
              }),
            }),
          },
        },
      },
    },
  };

  async handle(request: any, env: any, ctx: any) {
    // Get validated data
    const data = await this.getValidatedData<typeof this.schema>();

    // Retrieve the validated parameters
    const { page, isCompleted } = data.query;

    // Implement your own object list here
    const client = buildLibsqlClient(env);
    const { rows } = await client.execute(`
      SELECT count(*) AS num_tables FROM sqlite_master
      WHERE type ='table'
        AND name NOT IN ('libsql_wasm_func_table','_litestream_seq','_litestream_lock')
    `);

    return {
      success: true,
      turso: {
        numTables: rows[0].num_tables,
      },
      tasks: [
        {
          name: "Clean my room",
          slug: "clean-room",
          description: null,
          completed: false,
          due_date: "2025-01-05",
        },
        {
          name: "Build something awesome with Cloudflare Workers",
          slug: "cloudflare-workers",
          description: "Lorem Ipsum",
          completed: true,
          due_date: "2022-12-24",
        },
      ],
    };
  }
}
