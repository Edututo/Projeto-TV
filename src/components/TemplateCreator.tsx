"use client";

import React, { useState, useEffect, useRef } from "react";

export default function TemplateCreator() {
  const [templateName, setTemplateName] = useState("");
  const [message, setMessage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [footnote, setFootnote] = useState("");
  const [footnoteEnabled, setFootnoteEnabled] = useState(true);
  const [footnoteDuration, setFootnoteDuration] = useState(10);
  const [contentArea, setContentArea] = useState("full");
  const [showPreview, setShowPreview] = useState(false);
  const [time, setTime] = useState(new Date());
  const footnoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (footnoteRef.current && footnoteEnabled) {
      const scrollWidth = footnoteRef.current.scrollWidth;
      const clientWidth = footnoteRef.current.clientWidth;
      footnoteRef.current.style.transform = `translateX(${clientWidth}px)`;
      let start: number | null = null;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const distance = (elapsed / (footnoteDuration * 1000)) * (scrollWidth + clientWidth);
        if (footnoteRef.current) {
          footnoteRef.current.style.transform = `translateX(${clientWidth - distance}px)`;
          if (distance < scrollWidth + clientWidth) {
            requestAnimationFrame(step);
          } else {
            start = null;
            requestAnimationFrame(step);
          }
        }
      };
      requestAnimationFrame(step);
    }
  }, [footnote, footnoteEnabled, footnoteDuration]);

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBackgroundImage(url);
    }
  };

  const createTemplate = async () => {
    if (!templateName) {
      setMessage("Por favor, insira um nome para o template.");
      return;
    }
    // Here you would send the template data to the backend API
    setMessage("Template \"" + templateName + "\" criado com sucesso!");
    setTemplateName("");
    setBackgroundImage(null);
    setFootnote("");
    setFootnoteEnabled(true);
    setFootnoteDuration(10);
    setContentArea("full");
    setShowPreview(false);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nome do template"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mr-2 w-full max-w-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Imagem de Fundo:</label>
        <input type="file" accept="image/*" onChange={handleBackgroundChange} />
      </div>
      <div className="mb-4 flex items-center space-x-4">
        <div>
          <label className="block mb-1 font-semibold">Exibir Rodapé:</label>
          <input
            type="checkbox"
            checked={footnoteEnabled}
            onChange={(e) => setFootnoteEnabled(e.target.checked)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Duração do Rodapé (segundos):</label>
          <input
            type="number"
            min={1}
            max={60}
            value={footnoteDuration}
            onChange={(e) => setFootnoteDuration(parseInt(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2 w-20"
            disabled={!footnoteEnabled}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Área de Conteúdo:</label>
        <select
          value={contentArea}
          onChange={(e) => setContentArea(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
        >
          <option value="full">Tela Cheia</option>
          <option value="top">Topo</option>
          <option value="bottom">Rodapé</option>
          <option value="left">Esquerda</option>
          <option value="right">Direita</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Rodapé Deslizante:</label>
        <input
          type="text"
          placeholder="Texto do rodapé"
          value={footnote}
          onChange={(e) => setFootnote(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
          disabled={!footnoteEnabled}
        />
      </div>
      <div className="mb-4">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          {showPreview ? "Ocultar Preview" : "Mostrar Preview"}
        </button>
      </div>
      {showPreview && (
        <div
          className={`relative w-full max-w-md h-64 border border-gray-400 rounded overflow-hidden bg-black text-white ${
            contentArea === "full"
              ? ""
              : contentArea === "top"
              ? "pt-12"
              : contentArea === "bottom"
              ? "pb-12"
              : contentArea === "left"
              ? "pl-12"
              : "pr-12"
          }`}
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute top-2 right-4 text-lg font-mono">
            {time.toLocaleTimeString("pt-BR")}
          </div>
          {footnoteEnabled && footnote && (
            <div
              ref={footnoteRef}
              className="absolute bottom-2 whitespace-nowrap px-2"
              style={{ willChange: "transform" }}
            >
              {footnote}
            </div>
          )}
        </div>
      )}
      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      <button
        onClick={createTemplate}
        className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Criar Template
      </button>
    </div>
  );
}
