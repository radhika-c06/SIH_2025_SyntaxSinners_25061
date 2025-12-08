/**
 * MongoDB Connection Helper
 * Handles connection pooling and caching in development to avoid multiple connections
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Type for cached connection
interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare global namespace
declare global {
  namespace NodeJS {
    interface Global {
      mongooseCache?: CachedConnection;
    }
  }
}

// Use a custom cache variable to avoid type conflicts
const getCache = (): CachedConnection => {
  let cache = (global as any).mongooseCache;
  if (!cache) {
    cache = (global as any).mongooseCache = { conn: null, promise: null };
  }
  return cache;
};

/**
 * Connect to MongoDB
 * Returns cached connection if available, otherwise establishes new connection
 */
export async function connectDB() {
  const cached = getCache();

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Extend global type to include mongoose
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}
