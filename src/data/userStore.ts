export type UserProfile = {
  name: string;
  interests: string[];
  isOnboarded: boolean;
};

const STORAGE_KEY = 'zaceni_user';

export function getUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveUser(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function clearUser(): void {
  localStorage.removeItem(STORAGE_KEY);
}
