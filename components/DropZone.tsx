import { X } from "lucide-react";
import { useRef, useState } from "react";


interface DropzoneProps {
    accept: string;
    icon: React.ReactNode;
    label: string;
    hint: string;
    file?: File;
    onFile: (file: File) => void;
    onClear: () => void;
    error?: string;
}

export const Dropzone = ({ accept, icon, label, hint, file, onFile, onClear, error }: DropzoneProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) onFile(dropped);
    };

    return (
        <div>
            <div
                onClick={() => !file && ref.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`upload-dropzone flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors
          ${dragging ? "border-[#663820] bg-[#663820]/5" : "border-[#c8b8a2] bg-[#faf7f4]"}
          ${!file ? "cursor-pointer hover:border-[#663820] hover:bg-[#663820]/5" : "cursor-default"}
          ${error ? "border-red-400" : ""}`}
            >
                {file ? (
                    <div className="flex w-full items-center justify-between gap-3 rounded-lg bg-white px-4 py-3 shadow-sm">
                        <span className="truncate text-sm font-medium text-[#3d2b1f]">{file.name}</span>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onClear(); }}
                            className="shrink-0 rounded-full p-1 text-[#8b6355] transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ede8e3] text-[#8b6355]">
                            {icon}
                        </div>
                        <p className="text-sm font-semibold text-[#3d2b1f]">{label}</p>
                        <p className="text-xs text-[#9e8575]">{hint}</p>
                    </>
                )}
            </div>
            <input
                ref={ref}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
            />
            {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
        </div>
    );
};