import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { CloudflareD1, TelegramBotInfo } from "types";

const db = CloudflareD1.database("d1-quynh");

async function getBotTelegram(): Promise<any> {
  try {
    const result = await db.prepare("SELECT * FROM bot_telegram").all();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Error fetching data" };
  }
}

export class TelegramList extends OpenAPIRoute {
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
            schema: TelegramBotInfo,
          },
        },
      },
    },
  };

  async handle(request: any, env: any) {
    // Get validated data
    const data = await this.getValidatedData<typeof this.schema>();
    const botTelegram = await getBotTelegram();

    // Retrieve the validated parameters
    const { page, isCompleted } = data.query;

    // Implement your own object list here

    return {
      success: true,
      botTelegram: botTelegram,
    };
  }
}
