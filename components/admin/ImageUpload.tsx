"use client";

import imageCompression from "browser-image-compression";
import { useId, useRef, useState } from "react";
import { ImagePlus, LoaderCircle, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

export function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    try {
      setUploading(true);

      const compressedFile = await imageCompression(selectedFile, {
        maxSizeMB: 4.8,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
      });

      const localPreview = URL.createObjectURL(compressedFile);
      setPreview(localPreview);

      const formData = new FormData();
      formData.append("file", compressedFile, compressedFile.name);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { secureUrl?: string; error?: string };

      if (!response.ok || !data.secureUrl) {
        throw new Error(data.error ?? "Falha no upload.");
      }

      onChange(data.secureUrl);
      setPreview(data.secureUrl);
      toast.success("Imagem enviada com sucesso.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a imagem.",
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 border border-dashed border-[rgba(201,168,76,0.3)] bg-[rgba(255,255,255,0.02)] p-4">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-[rgba(201,168,76,0.22)] bg-[rgba(255,255,255,0.04)]">
            <ImagePlus className="h-7 w-7 text-[var(--color-gold)]" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-[var(--color-cream)]">
              Envie da galeria ou do computador sem depender só de link.
            </p>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-cream-muted)]">
              JPG, PNG ou WEBP até 5MB
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <LoaderCircle size={16} className="mr-2 animate-spin" />
            ) : (
              <Upload size={16} className="mr-2" />
            )}
            {uploading ? "Enviando imagem..." : "Escolher imagem"}
          </Button>

          {preview ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setPreview("");
                onChange("");
              }}
            >
              <X size={16} className="mr-2" />
              Remover
            </Button>
          ) : null}
        </div>

        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/jpg"
          className="hidden"
          onChange={handleFileChange}
        />

        {preview ? (
          <div className="overflow-hidden border border-[rgba(201,168,76,0.2)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview da imagem selecionada"
              className="h-40 w-full object-cover sm:h-56"
            />
          </div>
        ) : null}
      </div>

      <label
        htmlFor={`${id}-url`}
        className="block text-xs uppercase tracking-[0.24em] text-[var(--color-cream-muted)]"
      >
        Ou cole uma URL manualmente
      </label>
      <input
        id={`${id}-url`}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setPreview(event.target.value);
        }}
        placeholder="https://..."
        className="w-full border border-[rgba(201,168,76,0.2)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm outline-none"
      />
    </div>
  );
}
