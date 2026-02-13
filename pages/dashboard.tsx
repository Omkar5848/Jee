import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Role } from '@/components/RoleDashboard';
import { roleToPath } from '@/components/ProtectedRoleDashboardPage';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        router.replace('/login');
        return;
      }
      const data = await res.json();
      const role = (data?.user?.profession || 'technician') as Role;
      router.replace(roleToPath[role] || '/technician-dashboard');
    })();
  }, [router]);

  return <div className="container"><div className="card"><div>Loading dashboard...</div></div></div>;
}
