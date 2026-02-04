import { useNavigate, useLocation } from "react-router"
import { useAuthStore } from "@/store/auth-store"
import { ConfirmDialog } from "./confirm-dialog"

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (_open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { auth } = useAuthStore()

  const handleSignOut = () => {
    auth.reset()
    // Preserve current location for redirect after sign-in
    const currentPath = location.pathname + location.search + location.hash
    // 创建查询字符串
    const searchParams = new URLSearchParams({ redirect: currentPath }).toString();

    // 直接拼接路径和参数
    navigate(`/sign-in?${searchParams}`, { replace: true });
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Sign out'
      desc='Are you sure you want to sign out? You will need to sign in again to access your account.'
      confirmText='Sign out'
      destructive
      handleConfirm={handleSignOut}
      className='sm:max-w-sm'
    />
  )
}
