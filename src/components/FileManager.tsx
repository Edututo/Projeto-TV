"use client";

import React, { useState, useEffect, useRef } from "react";

type FileItem = {
  name: string;
  isDirectory: boolean;
};

export default function FileManager() {
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch files for currentPath from API (to be implemented)
    // For now, simulate with dummy data
    if (currentPath === "/") {
      setFiles([
        { name: "folder1", isDirectory: true },
        { name: "folder2", isDirectory: true },
        { name: "file1.jpg", isDirectory: false },
      ]);
    } else if (currentPath === "/folder1") {
      setFiles([
        { name: "subfolder1", isDirectory: true },
        { name: "file2.mp4", isDirectory: false },
      ]);
    } else {
      setFiles([]);
    }
  }, [currentPath]);

  const enterFolder = (folderName: string) => {
    setCurrentPath((prev) =>
      prev === "/" ? "/" + folderName : prev + "/" + folderName
    );
  };

  const goBack = () => {
    if (currentPath === "/") return;
    const parts = currentPath.split("/");
    parts.pop();
    const newPath = parts.length === 1 ? "/" : parts.join("/");
    setCurrentPath(newPath);
  };

  const createFolder = () => {
    if (!newFolderName) {
      setMessage("Por favor, insira um nome para a nova pasta.");
      return;
    }
    // Call API to create folder (to be implemented)
    // For now, simulate success
    setMessage("Pasta \"" + newFolderName + "\" criada em " + currentPath + ".");
    setNewFolderName("");
    // Refresh file list (simulate)
    setFiles((prev) => [
      ...prev,
      { name: newFolderName, isDirectory: true },
    ]);
  };

  const handleFileUpload = () => {
    const filesToUpload = fileInputRef.current?.files;
    if (!filesToUpload || filesToUpload.length === 0) {
      setMessage("Nenhum arquivo selecionado para upload.");
      return;
    }
    // Simulate upload success
    const uploadedFiles: FileItem[] = [];
    for (let i = 0; i < filesToUpload.length; i++) {
      uploadedFiles.push({ name: filesToUpload[i].name, isDirectory: false });
    }
    setFiles((prev) => [...prev, ...uploadedFiles]);
    setMessage(`${filesToUpload.length} arquivo(s) enviado(s) com sucesso.`);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const deleteFileOrFolder = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
    setMessage(`"${name}" removido com sucesso.`);
  };

  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        <button
          onClick={goBack}
          disabled={currentPath === "/"}
          className="bg-black text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Voltar
        </button>
        <span className="font-semibold">Caminho atual: {currentPath}</span>
      </div>
      <ul className="border border-gray-300 rounded p-2 max-h-64 overflow-auto">
        {files.length === 0 && <li>Nenhum arquivo ou pasta.</li>}
        {files.map(({ name, isDirectory }) => (
          <li
            key={name}
            className={
              "flex justify-between items-center py-1 px-2 rounded hover:bg-gray-100 " +
              (isDirectory ? "font-bold" : "")
            }
            onClick={() => isDirectory && enterFolder(name)}
          >
            <span>
              {isDirectory ? "📁 " : "📄 "}
              {name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteFileOrFolder(name);
              }}
              className="text-red-600 hover:text-red-800 text-sm"
              aria-label={`Remover ${name}`}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          placeholder="Nome da nova pasta"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-grow"
        />
        <button
          onClick={createFolder}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Criar Pasta
        </button>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="border border-gray-300 rounded px-3 py-2 flex-grow"
        />
        <button
          onClick={handleFileUpload}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Enviar Arquivos
        </button>
      </div>
      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
    </div>
  );
}
