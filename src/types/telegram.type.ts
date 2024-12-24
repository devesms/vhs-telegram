import { DateTime, Str } from "chanfana";
import { boolean, z } from "zod";

export const TelegramResult = z.object({
  ok: z.boolean().default(false),
});

export const TelegramBotInfo = TelegramResult.extend({
  result: z.object({
    id: z.number(),
    is_bot: z.boolean(),
    first_name: z.string(),
    username: z.string(),
    can_join_groups: z.boolean(),
    can_read_all_group_messages: z.boolean(),
    supports_inline_queries: z.boolean(),
    can_connect_to_business: z.boolean(),
    has_main_web_app: z.boolean(),
  })
})
