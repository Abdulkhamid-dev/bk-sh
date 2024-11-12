export type TUser = {
  email: string;
  id: number;
  key: string;
  name: string;
  secret: string;
};

export enum EActionMode {
  Add = "Add",
  Edit = "Edit",
}

export type TBook = {
  book: {
    author: string;
    cover: string;
    id: number;
    isbn: string;
    pages: number;
    published: number;
    title: string;
  };
  status: number;
};
