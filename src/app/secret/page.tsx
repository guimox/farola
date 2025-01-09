import { auth } from '@/src/lib/auth/config';
import React from 'react';

export default async function page() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  return <h1>Welcome to the secret page</h1>;
}
