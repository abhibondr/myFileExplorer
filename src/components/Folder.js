import { useState } from "react";

function Folder({ explorer, handleInsertNode }) {
  console.log(explorer);

  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();

    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ margin: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁 {explorer.name}</span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder ➕</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File ➕ </button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📃"}</span>
              <input
                className="inputField"
                type="text"
                onKeyDown={onAddFolder}
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
        </div>

        <div>
          {explorer.items.map((exp, i) => {
            return (
              <span
                key={i}
                style={{ display: expand ? "block" : "none", paddingLeft: 25 }}
              >
                <Folder
                  handleInsertNode={handleInsertNode}
                  explorer={exp}
                  key={exp.id}
                />
              </span>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="files">📃 {explorer.name}</span>;
  }
}

export default Folder;
