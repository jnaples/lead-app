import { NextResponse } from "next/server";

export async function GET(request) {
  const apiKey = process.env.API_KEY;

  const { searchParams } = new URL(request.url);
  const businessType = searchParams.get("businessType");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  if (!businessType || !latitude || !longitude) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const url = `https://serpapi.com/search.json?engine=google_maps&q=${businessType}+near+me&ll=@${latitude},${longitude},18z&api_key=${apiKey}&type=search`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
