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
}

export type TravelEntryFormData = {
  name: string;
  location: string;
  country: string;
  about: string;
  imageUrl: string;
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

