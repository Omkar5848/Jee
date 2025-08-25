import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type User = { name: string; email: string; profession: string };

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/me');
      if (!res.ok) { router.replace('/login'); return; }
      const data = await res.json();
      setUser(data.user);
    })();
  }, [router]);

  async function logout() {
    await fetch('/api/auth/logout', { method:'POST' });
    router.push('/');
  }

  if (!user) return <div className="container"><div className="card"><div>Loading...</div></div></div>;

  return (
    <div className="container">
      <div className="card" style={{width: 420}}>
        <h1 className="logo">Jeevak</h1>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Profession:</b> {user.profession}</p>
        <button className="button" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
