/**
 * File-based Authentication Helper
 * Temporary solution while MongoDB is being set up
 */

import fs from 'fs';
import path from 'path';
import { hashPassword, comparePassword } from './password';

const usersFile = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(usersFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Get all users
function getUsers() {
  ensureDataDir();
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]));
    return [];
  }
  try {
    const data = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save users
function saveUsers(users: any[]) {
  ensureDataDir();
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: string;
}

// Register user
export async function registerUser(name: string, email: string, password: string): Promise<{ success: boolean; data?: AdminUser; error?: string }> {
  try {
    const users = getUsers();
    
    // Check if email already exists
    if (users.find((u: AdminUser) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already registered' };
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create new user
    const newUser: AdminUser = {
      id: `admin_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: 'admin',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    return {
      success: true,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        passwordHash: '',
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Internal server error' };
  }
}

// Login user
export async function loginUser(email: string, password: string): Promise<{ success: boolean; data?: AdminUser; error?: string }> {
  try {
    const users = getUsers();
    const user = users.find((u: AdminUser) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return { success: false, error: 'Invalid email or password' };
    }

    return {
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: '',
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Internal server error' };
  }
}

// Get user by ID
export async function getUserById(id: string): Promise<AdminUser | null> {
  try {
    const users = getUsers();
    return users.find((u: AdminUser) => u.id === id) || null;
  } catch {
    return null;
  }
}
