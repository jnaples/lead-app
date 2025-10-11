import { NextResponse } from "next/server";

const businessType = "lawyers";
const longitude = 41.2742293513112;
const latitude = -73.1334577959206;

export async function GET() {
  const apiKey = process.env.API_KEY;
  const url = `https://serpapi.com/search.json?engine=google_maps&q=${businessType}+near+me&ll=@${longitude},${latitude},18z&api_key=${apiKey}&type=search`;

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

// getJson({
//   engine: 'google_maps',
//   q: 'lawyers near me',
//   ll: '41.2742293513112, -73.1334577959206, 18z',
//   api_key: apiKey,
//   type: 'search'
// } (json) => {
//   console.log(json)
// })
