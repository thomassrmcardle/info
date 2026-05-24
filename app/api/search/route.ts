import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("url_info")
    .select("url, title, description")
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .limit(20);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ results: data });
}