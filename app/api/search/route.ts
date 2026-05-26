import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const type = searchParams.get("type") ?? "all";

  if (!query) {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  
  if (type === "all") {
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
  else if (type === "images") {
    const { data, error } = await supabase
      .from("url_images")
      .select("image_url, site_url, alt_text")
      .or(`site_url.ilike.%${query}%,alt_text.ilike.%${query}%`)
      .limit(20);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ results: data });
  }
  else {
    return Response.json({ error: "Invalid type" }, { status: 400 });
  }

}