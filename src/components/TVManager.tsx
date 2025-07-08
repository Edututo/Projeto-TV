"use client";

import React, { useState, useEffect } from "react";

type TV = {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline";
  lastSeen: string;
};

export default function TVManager() {
  const [tvs, setTvs] = useState<TV[]>([]);
  const [newTvName, setNewTvName] = useState("");
  const [newTvLocation, setNewTvLocation] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch TVs from API (to be implemented)
    // For now, simulate with dummy data
    setTvs([
      {
        id: "TV1",
        name: "TV Recepção",
        location: "Recepção Principal",
        status: "online",
        lastSeen: "2024-01-15 14:30:00",
      },
      {
        id: "TV2",
        name: "TV Sala de Espera",
        location: "Sala de Espera",
        status: "offline",
        lastSeen: "2024-01-15 12:15:00",
      },
    ]);
  }, []);

  const registerNewTV = () => {
    if (!newTvName || !newTvLocation) {
      setMessage("Por favor, preencha o nome e localização da TV.");
      return;
    }

    const newTV: TV = {
      id: `TV${tvs.length + 1}`,
      name: newTvName,
      location: newTvLocation,
      status: "offline",
      lastSeen: "Nunca conectada",
    };

    setTvs([...tvs, newTV]);
    setMessage(`TV "${newTvName}" registrada com sucesso! ID: ${newTV.id}`);
    setNewTvName("");
    setNewTvLocation("");
  };

  const removeTV = (tvId: string) => {
    setTvs(tvs.filter((tv) => tv.id !== tvId));
    setMessage(`TV ${tvId} removida com sucesso.`);
  };

  const getAccessUrl = (tvId: string) => {
    return `${window.location.origin}/tv/${tvId}`;
  };

  return (
    <div>
      {/* Register New TV */}
      <div className="mb-6 p-4 border border-gray-300 rounded">
        <h3 className="text-lg font-semibold mb-4">Registrar Nova TV</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nome da TV"
            value={newTvName}
            onChange={(e) => setNewTvName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Localização"
            value={newTvLocation}
            onChange={(e) => setNewTvLocation(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          onClick={registerNewTV}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Registrar TV
        </button>
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      </div>

      {/* TV List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">TVs Registradas</h3>
        {tvs.length === 0 ? (
          <p>Nenhuma TV registrada.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Localização</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Última Conexão</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">URL de Acesso</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {tvs.map((tv) => (
                  <tr key={tv.id}>
                    <td className="border border-gray-300 px-4 py-2">{tv.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{tv.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{tv.location}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          tv.status === "online"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tv.status === "online" ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{tv.lastSeen}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a
                        href={getAccessUrl(tv.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {getAccessUrl(tv.id)}
                      </a>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => removeTV(tv.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
