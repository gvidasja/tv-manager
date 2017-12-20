import React from 'react'

export const FileList = ({ files, onFileChange, moveFileUp, moveFileDown, ...props}) => (
    <div className="file-list" {...props}>
        <div className="file-input">
            <input 
                type="file"
                multiple
                onChange={e => onFileChange(e.target.files)}
            />
        </div>
        <div className="list">
        {files ? files.map((f, index) => (
            <div key={index}>
                <span>{f.name}</span>
                <button disabled={index < 1} onClick={() => moveFileUp(index)}>^</button>
                <button disabled={index >= files.length - 1} onClick={() => moveFileDown(index)}>v</button>
            </div>
        )) : <div style={{border: '2px dashed lighgrey'}}>No files</div>}
        </div>
    </div>
)