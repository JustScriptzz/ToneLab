"use client";

import { useState } from "react";
import { MUSIC_MODELS } from "@/lib/models";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState(MUSIC_MODELS[1].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setAudioUrl(null);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, modelId: selectedModel }),
      });

      if (res.ok) {
        const data = await res.json();
        setAudioUrl(data.audio_url || data.url);
      } else {
        setError("Generation failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  const selectedModelData = MUSIC_MODELS.find((m) => m.id === selectedModel);

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            🎵 ToneLab
          </h1>
          <p className="text-lg text-white/60">AI-powered music generation with multiple models</p>
        </div>

        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-xl font-semibold mb-4 text-white/90">Choose Your Model</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MUSIC_MODELS.map((model) => (
              <div
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`model-card ${selectedModel === model.id ? "model-card-selected" : "model-card-unselected"}`}
              >
                <div className="absolute top-4 right-4">
                  {model.isPaid ? (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full">💰 PAID</span>
                  ) : (
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">🆓 FREE</span>
                  )}
                </div>
                <div className="pr-20">
                  <h3 className="text-xl font-bold mb-2">{model.name}</h3>
                  <p className="text-sm text-white/60">{model.description}</p>
                </div>
                {selectedModel === model.id && (
                  <div className="absolute bottom-4 right-4">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xl font-semibold mb-4 text-white/90">Describe Your Music</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A dreamy lo-fi beat with soft piano and gentle rain sounds..."
            className="input-field min-h-[150px] resize-none"
          />
        </div>

        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className={`btn-primary w-full ${isGenerating ? "animate-pulse-glow" : ""}`}
          >
            <span className="relative z-10">
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating with {selectedModelData?.name}...
                </span>
              ) : (
                `Generate Music with ${selectedModelData?.name}`
              )}
            </span>
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl animate-slide-up">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {audioUrl && (
          <div className="glass-card p-8 animate-slide-up">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">🎶 Your Generated Track</h3>
              <p className="text-sm text-white/60">Created with {selectedModelData?.name}</p>
            </div>
            <audio controls src={audioUrl} className="w-full" />
            <div className="mt-4 flex gap-3">
              <a
                href={audioUrl}
                download="tonelab-track.mp3"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
              >
                ⬇️ Download
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
                    }
