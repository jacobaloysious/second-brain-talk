import { useEffect, useState } from "react";
import { pullRequest } from "../data";

interface PullRequestModalProps {
  open: boolean;
  created: boolean;
  onClose: () => void;
  onCreate: () => void;
}

export function PullRequestModal({
  open,
  created,
  onClose,
  onCreate,
}: PullRequestModalProps) {
  const [selectedPath, setSelectedPath] = useState(pullRequest.files[0].path);

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
    pullRequest.files.find((candidate) => candidate.path === selectedPath) ??
    pullRequest.files[0];

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="pull-request-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pull-request-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-header pr-modal-header">
          <div>
            <span>Mock pull request · {pullRequest.repository}</span>
            <h2 id="pull-request-title">
              {pullRequest.title}{" "}
              <small>#{pullRequest.number}</small>
            </h2>
            <p>
              {pullRequest.branch} → {pullRequest.base}
            </p>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close pull request viewer"
          >
            ×
          </button>
        </header>

        <div className="pr-summary-bar">
          <span>{pullRequest.files.length} files changed</span>
          <strong className="diff-add">+{pullRequest.additions}</strong>
          <strong className="diff-delete">−{pullRequest.deletions}</strong>
          <span>Author: {pullRequest.author}</span>
          <span className="pr-draft-status">
            {created ? "Open · review required" : "Proposed diff"}
          </span>
        </div>

        <div className="pull-request-browser">
          <nav className="pr-file-list" aria-label="Changed files">
            {pullRequest.files.map((candidate) => (
              <button
                type="button"
                className={
                  candidate.path === file.path ? "is-active" : undefined
                }
                onClick={() => setSelectedPath(candidate.path)}
                key={candidate.path}
              >
                <span>{candidate.path}</span>
                <small>
                  <b>+{candidate.additions}</b>
                  <i>−{candidate.deletions}</i>
                </small>
              </button>
            ))}
          </nav>

          <section className="diff-viewer" aria-label={`Diff for ${file.path}`}>
            <header>
              <strong>{file.path}</strong>
              <span>
                +{file.additions} −{file.deletions}
              </span>
            </header>
            <div className="diff-code" role="table" aria-label="Code changes">
              {file.lines.map((line, index) => (
                <div
                  className={`diff-line line-${line.type}`}
                  role="row"
                  key={`${file.path}-${index}`}
                >
                  <span className="line-number" role="cell">
                    {line.oldLine ?? ""}
                  </span>
                  <span className="line-number" role="cell">
                    {line.newLine ?? ""}
                  </span>
                  <span className="line-marker" role="cell">
                    {line.type === "add"
                      ? "+"
                      : line.type === "remove"
                        ? "−"
                        : ""}
                  </span>
                  <code role="cell">{line.content || " "}</code>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="modal-footer pr-modal-footer">
          <p>
            The diff is deterministic demo data. No remote repository is
            modified.
          </p>
          {created ? (
            <button
              type="button"
              className="action-button action-secondary"
              onClick={onClose}
            >
              Close diff
            </button>
          ) : (
            <button
              type="button"
              className="action-button action-primary"
              onClick={() => {
                onCreate();
                onClose();
              }}
            >
              Create pull request
            </button>
          )}
        </footer>
      </section>
    </div>
  );
}
