export type TravelEntry = {
  _id: string;
  user: { _id: string; username: string };
  name: string;
  location: string;
  country: string;
  about: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
};

export type EntryProps = {
  item: TravelEntry;
  canEdit: boolean;
  onDelete: (id: string) => void;
};

export type TravelEntryFormData = {
  name: string;
  location: string;
  country: string;
  about: string;
  imageUrl: string;
};

export type ApiResponse<T> = {
  code: string;
  status: string;
  message: string;
  data?: T;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthContextType = {
  user: User | null;
  register: (username: string, email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};
