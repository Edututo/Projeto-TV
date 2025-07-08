"use client";

import React, { useState, useEffect } from "react";

type MediaFile = {
  id: string;
  name: string;
  type: "image" | "video";
  path: string;
};

type ContentPlaylist = {
  id: string;
  name: string;
  files: MediaFile[];
  duration: number; // seconds per slide for images
  loop: boolean;
  assignedTVs: string[];
  isActive: boolean;
};

type TV = {
  id: string;
  name: string;
  location: string;
};

export default function ContentManager() {
  const [playlists, setPlaylists] = useState<ContentPlaylist[]>([]);
  const [availableFiles, setAvailableFiles] = useState<MediaFile[]>([]);
  const [availableTVs, setAvailableTVs] = useState<TV[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    files: [] as MediaFile[],
    duration: 5,
    loop: true,
    assignedTVs: [] as string[],
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data from API (to be implemented)
    // For now, simulate with dummy data
    setAvailableFiles([
      { id: "1", name: "slide1.jpg", type: "image", path: "/files/slide1.jpg" },
      { id: "2", name: "slide2.jpg", type: "image", path: "/files/slide2.jpg" },
      { id: "3", name: "video1.mp4", type: "video", path: "/files/video1.mp4" },
      { id: "4", name: "promo.jpg", type: "image", path: "/files/promo.jpg" },
    ]);

    setAvailableTVs([
      { id: "TV1", name: "TV Recepção", location: "Recepção Principal" },
      { id: "TV2", name: "TV Sala de Espera", location: "Sala de Espera" },
    ]);

    setPlaylists([
      {
        id: "playlist1",
        name: "Conteúdo Principal",
        files: [
          { id: "1", name: "slide1.jpg", type: "image", path: "/files/slide1.jpg" },
          { id: "3", name: "video1.mp4", type: "video", path: "/files/video1.mp4" },
        ],
        duration: 5,
        loop: true,
        assignedTVs: ["TV1"],
        isActive: true,
      },
    ]);
  }, []);

  const toggleFileSelection = (file: MediaFile) => {
    const isSelected = newPlaylist.files.some((f) => f.id === file.id);
    if (isSelected) {
      setNewPlaylist({
        ...newPlaylist,
        files: newPlaylist.files.filter((f) => f.id !== file.id),
      });
    } else {
      setNewPlaylist({
        ...newPlaylist,
        files: [...newPlaylist.files, file],
      });
    }
  };

  const toggleTVSelection = (tvId: string) => {
    const isSelected = newPlaylist.assignedTVs.includes(tvId);
    if (isSelected) {
      setNewPlaylist({
        ...newPlaylist,
        assignedTVs: newPlaylist.assignedTVs.filter((id) => id !== tvId),
      });
    } else {
      setNewPlaylist({
        ...newPlaylist,
        assignedTVs: [...newPlaylist.assignedTVs, tvId],
      });
    }
  };

  const createPlaylist = () => {
    if (!newPlaylist.name || newPlaylist.files.length === 0) {
      setMessage("Por favor, insira um nome e selecione pelo menos um arquivo.");
      return;
    }

    const playlist: ContentPlaylist = {
      id: `playlist${playlists.length + 1}`,
      ...newPlaylist,
      isActive: false,
    };

    setPlaylists([...playlists, playlist]);
    setMessage(`Playlist "${newPlaylist.name}" criada com sucesso!`);
    setNewPlaylist({
      name: "",
      files: [],
      duration: 5,
      loop: true,
      assignedTVs: [],
    });
    setShowCreateForm(false);
  };

  const activatePlaylist = (playlistId: string) => {
    setPlaylists(
      playlists.map((p) => ({
        ...p,
        isActive: p.id === playlistId,
      }))
    );
    setMessage("Playlist ativada com sucesso!");
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists(playlists.filter((p) => p.id !== playlistId));
    setMessage("Playlist removida com sucesso!");
  };

  return (
    <div>
      {/* Create New Playlist Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {showCreateForm ? "Cancelar" : "Criar Nova Playlist"}
        </button>
      </div>

      {/* Create Playlist Form */}
      {showCreateForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded">
          <h3 className="text-lg font-semibold mb-4">Criar Nova Playlist</h3>
          
          {/* Playlist Name */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Nome da Playlist:</label>
            <input
              type="text"
              value={newPlaylist.name}
              onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
              placeholder="Nome da playlist"
            />
          </div>

          {/* File Selection */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Selecionar Arquivos:</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto border border-gray-200 p-2 rounded">
              {availableFiles.map((file) => (
                <div
                  key={file.id}
                  className={`p-2 border rounded cursor-pointer ${
                    newPlaylist.files.some((f) => f.id === file.id)
                      ? "border-black bg-gray-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => toggleFileSelection(file)}
                >
                  <div className="text-xs">
                    {file.type === "image" ? "🖼️" : "🎥"} {file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-semibold">Duração por Imagem (segundos):</label>
              <input
                type="number"
                min="1"
                max="60"
                value={newPlaylist.duration}
                onChange={(e) => setNewPlaylist({ ...newPlaylist, duration: parseInt(e.target.value) })}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="loop"
                checked={newPlaylist.loop}
                onChange={(e) => setNewPlaylist({ ...newPlaylist, loop: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="loop" className="font-semibold">Repetir em Loop</label>
            </div>
          </div>

          {/* TV Selection */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Atribuir às TVs:</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {availableTVs.map((tv) => (
                <div
                  key={tv.id}
                  className={`p-2 border rounded cursor-pointer ${
                    newPlaylist.assignedTVs.includes(tv.id)
                      ? "border-black bg-gray-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => toggleTVSelection(tv.id)}
                >
                  <div className="font-medium">{tv.name}</div>
                  <div className="text-sm text-gray-600">{tv.location}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={createPlaylist}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Criar Playlist
          </button>
        </div>
      )}

      {/* Message */}
      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      {/* Existing Playlists */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Playlists Existentes</h3>
        {playlists.length === 0 ? (
          <p>Nenhuma playlist criada.</p>
        ) : (
          <div className="space-y-4">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className={`p-4 border rounded ${
                  playlist.isActive ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">{playlist.name}</h4>
                  <div className="flex space-x-2">
                    {!playlist.isActive && (
                      <button
                        onClick={() => activatePlaylist(playlist.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Ativar
                      </button>
                    )}
                    <button
                      onClick={() => deletePlaylist(playlist.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Remover
                    </button>
                  </div>
                </div>
                
                {playlist.isActive && (
                  <div className="mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      ATIVA
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Arquivos ({playlist.files.length}):</strong>
                    <ul className="list-disc list-inside ml-2">
                      {playlist.files.map((file) => (
                        <li key={file.id}>
                          {file.type === "image" ? "🖼️" : "🎥"} {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div><strong>Duração por Imagem:</strong> {playlist.duration}s</div>
                    <div><strong>Loop:</strong> {playlist.loop ? "Sim" : "Não"}</div>
                    <div>
                      <strong>TVs Atribuídas:</strong>{" "}
                      {playlist.assignedTVs.length > 0
                        ? playlist.assignedTVs.join(", ")
                        : "Nenhuma"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
