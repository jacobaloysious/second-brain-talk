import { useEffect, useState } from "react";
import { packetFiles } from "../data";

interface PacketModalProps {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export function PacketModal({
  open,
  onClose,
  onDownload,
}: PacketModalProps) {
  const [selectedFile, setSelectedFile] = useState(packetFiles[0].name);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;
  const file =
    packetFiles.find((candidate) => candidate.name === selectedFile) ??
    packetFiles[0];

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="packet-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="packet-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <div>
            <span>Reviewed handoff bundle</span>
            <h2 id="packet-modal-title">Sanitized packet contents</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close packet viewer"
          >
            ×
          </button>
        </header>

        <div className="packet-browser">
          <nav className="file-list" aria-label="Packet files">
            {packetFiles.map((candidate) => (
              <button
                type="button"
                className={candidate.name === file.name ? "is-active" : ""}
                onClick={() => setSelectedFile(candidate.name)}
                key={candidate.name}
              >
                <span className="file-icon" aria-hidden="true" />
                <span>
                  <strong>{candidate.name}</strong>
                  <small>{candidate.description}</small>
                </span>
              </button>
            ))}
          </nav>
          <div className="file-preview">
            <div className="preview-heading">
              <strong>{file.name}</strong>
              <span>Sanitized · reviewed</span>
            </div>
            <pre>{file.content}</pre>
          </div>
        </div>

        <footer className="modal-footer">
          <p>
            Raw fab evidence is intentionally absent. This ZIP contains only
            reviewed transfer artifacts.
          </p>
          <button type="button" className="action-button action-primary" onClick={onDownload}>
            Download .zip
          </button>
        </footer>
      </section>
    </div>
  );
}
