function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

// Server-only env vars — validated on first access
export const env = {
  get MONGODB_URI() {
    return required("MONGODB_URI");
  },
  get GOOGLE_CLIENT_ID() {
    return required("GOOGLE_CLIENT_ID");
  },
  get GOOGLE_CLIENT_SECRET() {
    return required("GOOGLE_CLIENT_SECRET");
  },
  get CARDCOM_TERMINAL_NUMBER() {
    return required("CARDCOM_TERMINAL_NUMBER");
  },
  get CARDCOM_API_NAME() {
    return required("CARDCOM_API_NAME");
  },
  get CARDCOM_API_PASSWORD() {
    return required("CARDCOM_API_PASSWORD");
  },
  get CLOUDINARY_CLOUD_NAME() {
    return required("CLOUDINARY_CLOUD_NAME");
  },
  get CLOUDINARY_API_KEY() {
    return required("CLOUDINARY_API_KEY");
  },
  get CLOUDINARY_API_SECRET() {
    return required("CLOUDINARY_API_SECRET");
  },
  get BASE_URL() {
    return required("NEXT_PUBLIC_BASE_URL");
  },
};
