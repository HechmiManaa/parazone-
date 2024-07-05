import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

// Custom CORS Handling
function handleCors(req: NextRequest): NextResponse | null {
  const origin = req.headers.get("origin");
  const allowedOrigins = [
    "https://parazone.tn",
    "http://parazone.tn",
    "http://localhost:3003",
  ];

  if (allowedOrigins.includes(origin || "")) {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Origin", origin || "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type,Authorization"
    );

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      response.headers.set("Access-Control-Max-Age", "86400"); // Cache preflight request for 24 hours
      return new NextResponse(null, { status: 204 });
    }
    return response;
  }
  return null;
}

// Helper function to fetch data from the Directus API
async function fetchData(url: string) {
  try {
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from Directus API" },
      { status: 500 }
    );
  }
}

// Handler function to map paths to API URLs
function handleApiRequest(pathname: string) {
  const apiMap: { [key: string]: string } = {
    "/api/category": "https://admin.parazone.tn/items/category?limit=-1",
    "/api/product":
      "https://admin.parazone.tn/items/product?fields=brand_id.*,store_id.*,*&limit=-1",
    "/api/price":
      "https://admin.parazone.tn/items/price?fields=store_id.*,*&limit=-1",
    "/api/relation": "https://admin.parazone.tn/items/relation?limit=-1",
    "/api/brand": "https://admin.parazone.tn/items/brand?limit=-1",
    "/api/store": "https://admin.parazone.tn/items/store?limit=-1",
    "/api/blog": "https://admin.parazone.tn/items/blog?limit=-1",
    "/api/blog_product":
      "https://admin.parazone.tn/items/blog_product?fields=*,product_id.*",
    "/api/blog_category":
      "https://admin.parazone.tn/items/blog_category?fields=*,category_id.*",
    "/api/blog_brand":
      "https://admin.parazone.tn/items/blog_brand?fields=*,brand_id.*",
    "/api/blog_tag":
      "https://admin.parazone.tn/items/blog_tag?fields=*,tag_id.*",
    "/api/tag": "https://admin.parazone.tn/items/tag?limit=-1",
  };

  return apiMap[pathname] || null;
}

// Middleware function
export async function middleware(req: NextRequest) {
  // Run the custom CORS handling
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Handle API requests
  const apiUrl = handleApiRequest(req.nextUrl.pathname);
  if (apiUrl) {
    return fetchData(apiUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
