
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Stethoscope, History, UserCircle, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from "./MobileMenu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, [location.pathname]); // Re-check when route changes

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  // Add history item for logged in users
  const mobileNavItems = user?.isLoggedIn 
    ? [...navItems, { label: "History", path: "/history" }]
    : navItems;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-colors">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-medical-blue" />
          <span className="text-lg font-semibold">Prescription Text Extractor</span>
        </Link>

        {isMobile ? (
          <div className="flex items-center gap-2">
            {user?.isLoggedIn && (
              <Link to="/history">
                <Button variant="ghost" size="icon" className="text-medical-blue">
                  <History className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <MobileMenu items={mobileNavItems} user={user} onLogout={handleLogout} />
          </div>
        ) : (
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-medical-blue ${
                  location.pathname === item.path
                    ? "text-medical-blue"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {user?.isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/history"
                  className={`text-sm font-medium transition-colors hover:text-medical-blue flex items-center gap-1 ${
                    location.pathname === "/history"
                      ? "text-medical-blue"
                      : "text-muted-foreground"
                  }`}
                >
                  <History className="h-4 w-4" />
                  History
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8 bg-medical-blue-light/50">
                        <AvatarFallback className="text-medical-blue">
                          {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {user.name && (
                          <p className="font-medium">{user.name}</p>
                        )}
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/history" className="cursor-pointer">
                        <History className="mr-2 h-4 w-4" />
                        <span>Prescription History</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-500 focus:text-red-500 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button asChild className="bg-medical-blue hover:bg-medical-blue/90">
                <Link to="/auth" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
