import { NextRequest, NextResponse } from "next/server";
import { MUSIC_MODELS } from "@/lib/models";

export async function POST(req: NextRequest) {
  try {
    const { prompt, modelId } = await req.json();

    const model = MUSIC_MODELS.find((m) => m.id === modelId);
    if (!model) {
      return NextResponse.json({ error: "Invalid model" }, { status: 400 });
    }

    // TODO: Verify exact Pollinations BYOP audio endpoint in their docs
    const response = await fetch("https://api.pollinations.ai/v1/audio/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.POLLINATIONS_API_KEY}`,
      },
      body: JSON.stringify({ prompt, model: modelId }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
