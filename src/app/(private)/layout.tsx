import { PrivateShell } from '@/components/layout/private-shell'

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PrivateShell>{children}</PrivateShell>
}
