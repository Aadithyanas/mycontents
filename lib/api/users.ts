import { User, Role } from '@/types';
import { mockUsers } from '@/lib/mock/users';

let usersState: User[] = [...mockUsers];

export const usersApi = {
  async getUsers(): Promise<User[]> {
    await new Promise((r) => setTimeout(r, 40));
    return [...usersState];
  },

  async getUserById(id: string): Promise<User | null> {
    await new Promise((r) => setTimeout(r, 40));
    return usersState.find((u) => u.id === id) || null;
  },

  async updateUserRole(id: string, role: Role): Promise<User> {
    await new Promise((r) => setTimeout(r, 80));
    const idx = usersState.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error('User not found');
    usersState[idx] = { ...usersState[idx], role };
    return usersState[idx];
  },
};
