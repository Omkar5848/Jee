import { ProtectedRoleDashboardPage } from '@/components/ProtectedRoleDashboardPage';

export default function AdminDashboardPage() {
  return <ProtectedRoleDashboardPage expectedRole="admin" />;
}
