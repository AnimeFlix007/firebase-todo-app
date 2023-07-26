export type User = {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
};

export type Todo = {
  id: string;
  uid: string;
  content: string;
  complete: boolean;
};
