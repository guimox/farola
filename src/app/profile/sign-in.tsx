import { auth, signIn, signOut } from '@/src/lib/auth/config';

export default async function SignIn() {
  const session = await auth();
  console.log(session);
  const user = session?.user;

  return user ? (
    <>
      <h1>Welcome {user.name}</h1>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className="rounded-md bg-black px-4 py-2 text-white" type="submit">
          Sign out
        </button>
      </form>
    </>
  ) : (
    <>
      <h1>You're not authenticated</h1>
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <button className="rounded-md bg-red-700 px-4 py-2 text-white" type="submit">
          Signin with Google
        </button>
      </form>
    </>
  );
}
