
import React, { useState } from 'react';
import CatAddModal from './CatAddModal';
import type { CatFlatNode, CatNode } from './catTypes';

// Flat array of cats
const initialCats: CatFlatNode[] = [
  { id: '1', parentId: null, name: 'Mama Cat', image: undefined },
  { id: '2', parentId: '1', name: 'Kitten 1', image: undefined },
  { id: '3', parentId: '1', name: 'Kitten 2', image: undefined },
  { id: '4', parentId: '2', name: 'Grandkitten', image: undefined },
  { id: '5', parentId: null, name: 'Papa Cat', image: undefined },
];

// Build tree from flat array
function buildCatTree(flatCats: CatFlatNode[]): CatNode[] {
  const nodes: Record<string, CatNode> = {};
  flatCats.forEach(cat => {
    nodes[cat.id] = { ...cat, kittens: [] };
  });
  const roots: CatNode[] = [];
  Object.values(nodes).forEach(cat => {
    if (cat.parentId) {
      nodes[cat.parentId]?.kittens?.push(cat);
    } else {
      roots.push(cat);
    }
  });
  return roots;
}


const CIRCLE_SIZE = 80;

function CatTree({ cat }: { cat: CatNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <div
          style={{
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: '50%',
            background: '#ffe4e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: 18,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          {cat.name}
        </div>
        {/* Draw lines to kittens */}
        {Array.isArray(cat.kittens) && cat.kittens.length > 0 && (
          <svg
            width={CIRCLE_SIZE * 2}
            height={40}
            style={{ position: 'absolute', left: -CIRCLE_SIZE / 2, top: CIRCLE_SIZE }}
          >
            {cat.kittens.map((_, i) => {
              const x = ((i + 1) * (CIRCLE_SIZE * 2)) / ((cat.kittens?.length ?? 1) + 1);
              return (
                <line
                  key={i}
                  x1={CIRCLE_SIZE}
                  y1={0}
                  x2={x}
                  y2={40}
                  stroke="#888"
                  strokeWidth={2}
                />
              );
            })}
          </svg>
        )}
      </div>
      {/* Render kittens below */}
      {cat.kittens && cat.kittens.length > 0 && (
        <div style={{ display: 'flex', gap: 32 }}>
          {cat.kittens.map((kitten) => (
            <CatTree key={kitten.id} cat={kitten} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [cats, setCats] = useState<CatFlatNode[]>(initialCats);
  const [modalOpen, setModalOpen] = useState(false);

  const catTreeRoots = buildCatTree(cats);

  const handleAddCat = (cat: { name: string; parentId: string | null; image?: string }) => {
    setCats(prev => [
      ...prev,
      {
        id: (Math.max(0, ...prev.map(c => parseInt(c.id))) + 1).toString(),
        name: cat.name,
        parentId: cat.parentId,
        image: cat.image,
      },
    ]);
    setModalOpen(false);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Your Cat Tree Life</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <button
          style={{ background: '#ffe4e1', border: 'none', padding: '8px 20px', borderRadius: 6, fontWeight: 'bold', fontSize: 16 }}
          onClick={() => setModalOpen(true)}
        >
          Add New Cat
        </button>
      </div>
      <CatAddModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAddCat} cats={cats} />
      <div style={{ display: 'flex', gap: 48, justifyContent: 'center' }}>
        {catTreeRoots.map((cat) => (
          <CatTree key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
}

export default App;
