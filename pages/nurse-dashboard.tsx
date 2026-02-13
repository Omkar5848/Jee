import { ProtectedRoleDashboardPage } from '@/components/ProtectedRoleDashboardPage';

export default function NurseDashboardPage() {
  return <ProtectedRoleDashboardPage expectedRole="nurse" />;
}
