
import { Ellipsis } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { 
DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuthStore } from "@/features/auth/store"
import { useAuth } from "@/features/auth/hooks/useAuth"

export function UserMenu() {
  const { profile, isLoading } = useAuthStore()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
            <div className="flex justify-between px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                <button className="w-full flex items-center gap-3">
                  {isLoading ? (
                    <>
                      {/* Skeleton Avatar */}
                      <Skeleton className="w-9 h-9 rounded-full shrink-0" />

                      {/* Skeleton Text */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-full bg-emerald-900 flex items-center justify-center text-xs font-medium text-white shrink-0">
                        {profile?.name?.charAt(0) ?? "?"}
                      </div>

                      {/* Profile Info */}
                      <div className="min-w-0 text-left">
                        <p className="text-sm font-medium text-slate-800 truncate">
                          {profile?.name ?? "-"}
                        </p>
                        <p className="text-xs text-slate-600 truncate">
                          {profile?.role ?? "-"}
                        </p>
                      </div>
                    </>
                  )}
                </button>
                <Ellipsis size={20} />
            </div>
          
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{profile?.email}</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}