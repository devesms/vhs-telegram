import { CloudflareD1 } from "types";

// Kết nối tới cơ sở dữ liệu D1
// Thay 'my_database' bằng tên của cơ sở dữ liệu bạn đã tạo trong Cloudflare
const db = CloudflareD1.database("d1-quynh");

// Hàm để lấy dữ liệu từ bảng 'users'
async function getUserData(): Promise<any> {
  try {
    const result = await db.prepare("SELECT * FROM users").all();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Error fetching data" };
  }
}

// Hàm xử lý yêu cầu HTTP
addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request): Promise<Response> {
  const userData = await getUserData();
  return new Response(JSON.stringify(userData), {
    headers: { "Content-Type": "application/json" }
  });
}
