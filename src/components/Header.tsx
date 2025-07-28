import { Button } from "@/components/ui/button";
import { Heart, Plus, BarChart3, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Neki Dariya</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/feed" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/feed' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Globe className="inline h-4 w-4 mr-1" />
            Inspiration Feed
          </Link>
          <Link 
            to="/analytics" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/analytics' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <BarChart3 className="inline h-4 w-4 mr-1" />
            Impact Analytics
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/submit">
            <Button variant="hero" size="sm">
              <Plus className="h-4 w-4" />
              Add Deed
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;