import React, { useState } from 'react';
import type { CatFlatNode } from './catTypes';

interface CatAddModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (cat: { name: string; parentId: string | null; image?: string }) => void;
  cats: CatFlatNode[];
}

const CatAddModal: React.FC<CatAddModalProps> = ({ open, onClose, onAdd, cats }) => {
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState<string | null>(null);
  const [image, setImage] = useState('');

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.2)' }}>
        <h2>Add a New Cat</h2>
        <div style={{ marginBottom: 12 }}>
          <label>Cat Name:</label><br />
          <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Parent:</label><br />
          <select value={parentId ?? ''} onChange={e => setParentId(e.target.value || null)} style={{ width: '100%' }}>
            <option value="">No Parent (Root)</option>
            {cats.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))} 
          </select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Image URL:</label><br />
          <input value={image} onChange={e => setImage(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => {
              if (name.trim()) {
                onAdd({ name, parentId, image: image || undefined });
                setName('');
                setParentId(null);
                setImage('');
              }
            }}
            style={{ background: '#ffe4e1', border: 'none', padding: '6px 16px', borderRadius: 4 }}
          >
            Add Cat
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatAddModal;
