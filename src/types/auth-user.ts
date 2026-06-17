export interface AuthUser {
  id: string;
  full_name: string;
  role: "admin" | "doctor";
  mio_id?: string;
}
