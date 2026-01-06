export type TravelEntry = {
  _id: string;
  name: string;
  location: string;
  country: string;
  about: string;
  imageUrl: string;
  googleMapsUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type EntryProps = {
  item: TravelEntry;
  onDelete: (id: string) => void;
  canEdit: boolean;
};

export type TravelEntryFormData = {
  name: string;
  location: string;
  country: string;
  about: string;
  imageUrl: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
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
  register: (username: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};
