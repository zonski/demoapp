import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@repo/web-kit/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/web-kit/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {

  const location = useLocation();
  const { user, logout} = useAuth0();

  const isActive = (path: string, exact: boolean = false) => {
    return exact ? location.pathname === path : location.pathname.startsWith(path);
  };

  const onLogout = () => {
    logout();
  }
  
  return (
    <div className="fixed top-0 w-full border-b bg-white">
      <div className="flex h-16 items-center px-8 justify-between">
        <div className="flex items-center gap-6">
          <div className="w-8 h-8 bg-slate-200 rounded-full" />
          <span className="text-xl font-semibold">SFM eManifests</span>

          {/* Navigation Items */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink active={isActive('/', true)} className={navigationMenuTriggerStyle()} asChild>
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink active={isActive('/upload')} className={navigationMenuTriggerStyle()} asChild>
                  <Link to="/test">Test</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <span>{user.name}</span>
              <Settings className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onLogout}>
                Logout
              </DropdownMenuItem>
              <DropdownMenuItem>
                Option 2
              </DropdownMenuItem>
              <DropdownMenuItem>
                Option 3
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
