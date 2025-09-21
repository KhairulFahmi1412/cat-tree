export type CatFlatNode = {
  id: string;
  parentId: string | null;
  name: string;
  image?: string;
};

export type CatNode = CatFlatNode & { kittens?: CatNode[] };
