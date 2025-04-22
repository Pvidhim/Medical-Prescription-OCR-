
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn, LogOut, UserCircle, History } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  items: { label: string; path: string }[];
  user?: any;
  onLogout?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ items, user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-8">
        {user?.isLoggedIn && (
          <div className="flex items-center space-x-3 pb-4 pt-2">
            <Avatar className="h-10 w-10 bg-medical-blue-light/50">
              <AvatarFallback className="text-medical-blue">
                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5">
              {user.name && <p className="font-medium">{user.name}</p>}
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        )}
        
        {user?.isLoggedIn && <Separator className="my-4" />}
        
        <nav className="flex flex-col gap-1 mt-4">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center text-base py-2 px-4 rounded-md font-medium transition-colors hover:bg-muted ${
                location.pathname === item.path
                  ? "text-medical-blue bg-medical-blue-light/30"
                  : "text-foreground"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label === "History" && <History className="mr-2 h-5 w-5" />}
              {item.label}
            </Link>
          ))}
          
          <Separator className="my-4" />
          
          {user?.isLoggedIn ? (
            <Button 
              variant="ghost"
              className="flex justify-start text-destructive hover:text-destructive hover:bg-destructive/10 p-4"
              onClick={() => {
                if (onLogout) onLogout();
                setOpen(false);
              }}
            >
              <LogOut className="mr-2 h-5 w-5" />
              <span>Log out</span>
            </Button>
          ) : (
            <Button 
              asChild 
              className="mt-2 w-full bg-medical-blue hover:bg-medical-blue/90"
              onClick={() => setOpen(false)}
            >
              <Link to="/auth" className="flex items-center justify-center">
                <LogIn className="mr-2 h-5 w-5" />
                <span>Sign In</span>
              </Link>
            </Button>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
