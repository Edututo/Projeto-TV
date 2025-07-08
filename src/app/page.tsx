"use client";

import React, { useState } from "react";
import TemplateCreator from "@/components/TemplateCreator";
import ContentManager from "@/components/ContentManager";
import FileManager from "@/components/FileManager";
import TVManager from "@/components/TVManager";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("templates");

  const tabs = [
    { id: "templates", label: "Templates" },
    { id: "tvs", label: "Gerenciar TVs" },
    { id: "content", label: "Gerenciar Conteúdo" },
    { id: "files", label: "Gerenciar Arquivos" },
  ];

  return (
    <main className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>
      
      {/* Navigation Tabs */}
      <div className="border-b border-gray-300 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "templates" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Criar Novo Template para TVs</h2>
            <TemplateCreator />
          </section>
        )}

        {activeTab === "tvs" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Gerenciar TVs</h2>
            <TVManager />
          </section>
        )}

        {activeTab === "content" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Gerenciar Conteúdo</h2>
            <ContentManager />
          </section>
        )}

        {activeTab === "files" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Gerenciar Arquivos</h2>
            <FileManager />
          </section>
        )}
      </div>
    </main>
  );
}
