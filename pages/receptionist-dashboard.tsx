import { ProtectedRoleDashboardPage } from '@/components/ProtectedRoleDashboardPage';

export default function ReceptionDashboardPage() {
  return <ProtectedRoleDashboardPage expectedRole="receptionist" />;
}
