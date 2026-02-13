import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RoleDashboard, Role, User } from '@/components/RoleDashboard';
import styles from '@/styles/temp.module.css';

export const roleToPath: Record<Role, string> = {
  doctor: '/doctor-dashboard',
  patient: '/patient-dashboard',
  technician: '/technician-dashboard',
  nurse: '/nurse-dashboard',
  admin: '/admin-dashboard',
  receptionist: '/receptionist-dashboard'
};

export function ProtectedRoleDashboardPage({ expectedRole }: { expectedRole: Role }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        router.replace('/login');
        return;
      }
      const data = await res.json();
      const currentUser = data.user as User;
      if (currentUser.profession !== expectedRole) {
        router.replace(roleToPath[currentUser.profession]);
        return;
      }
      setUser(currentUser);
    })();
  }, [expectedRole, router]);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  }

  if (!user) return <div className={styles.container}><div className={styles.card}><div className={styles.loadingText}>Loading...</div></div></div>;

  return <RoleDashboard user={user} onLogout={logout} />;
}
