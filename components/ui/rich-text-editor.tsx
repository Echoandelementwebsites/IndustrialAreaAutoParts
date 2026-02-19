"use client";

import { useEffect, useRef, useState } from "react";
import type Quill from "quill";
import "quill/dist/quill.snow.css";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const onChangeRef = useRef(onChange);
  const [isFocused, setIsFocused] = useState(false);
  const [isQuillReady, setIsQuillReady] = useState(false);

  // Keep onChange ref current to avoid stale closures in Quill callback
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (containerRef.current && !quillRef.current) {
      // Create a specific div for the editor to avoid appending toolbar outside
      const editorDiv = document.createElement("div");
      containerRef.current.appendChild(editorDiv);

      import("quill").then(({ default: QuillClass }) => {
        const quill = new QuillClass(editorDiv, {
          theme: "snow",
          modules: {
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
          },
          placeholder: "Write something...",
        });

        quillRef.current = quill;
        setIsQuillReady(true);

        // Event listeners
        quill.on("text-change", () => {
          const html = quill.root.innerHTML;
          // Handle empty state which Quill renders as <p><br></p>
          onChangeRef.current(html === "<p><br></p>" ? "" : html);
        });

        quill.root.addEventListener("focus", () => setIsFocused(true));
        quill.root.addEventListener("blur", () => setIsFocused(false));
      }).catch(err => console.error("Error loading Quill:", err));
    }

    // Cleanup not strictly necessary for single usage but good practice
    return () => {
       // Cleaning up Quill instance is hard as it modifies DOM heavily.
       // Since component unmount removes the containerRef content anyway, it's mostly fine.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle external updates (e.g. reset or async load)
  useEffect(() => {
      if (quillRef.current && isQuillReady) {
          const currentContent = quillRef.current.root.innerHTML;
          // Only update if editor is empty (initial load) or explicitly cleared
          if (currentContent === "<p><br></p>" && value) {
               quillRef.current.clipboard.dangerouslyPasteHTML(value);
          } else if (value === "" && currentContent !== "<p><br></p>") {
               quillRef.current.setText("");
          }
      }
  }, [value, isQuillReady]);

  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white transition-all overflow-hidden flex flex-col",
        isFocused ? "ring-2 ring-blue-500 border-transparent" : "",
        className
      )}
    >
      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid #e5e7eb !important;
          background: #f9fafb;
        }
        .ql-container.ql-snow {
          border: none !important;
          font-family: inherit;
          font-size: 1rem;
          flex-grow: 1;
        }
        .ql-editor {
          min-height: 120px;
          padding: 1rem;
        }
        .ql-editor.ql-blank::before {
          font-style: normal;
          color: #9ca3af;
        }
      `}</style>
      <div ref={containerRef} className="flex-grow" />
    </div>
  );
}
