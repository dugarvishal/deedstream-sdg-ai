import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Heart, Users, Globe, BarChart3, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import rippleIcon from "@/assets/ripple-icon.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <img src={rippleIcon} alt="Ripple Effect" className="w-8 h-8" />
                <Badge variant="secondary" className="text-sm">
                  <Sparkles className="w-3 h-3 mr-1" />
                  The Ripple Effect of Goodness
                </Badge>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Neki Dariya
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                A digital platform that captures and aggregates noble deeds, mapping each act of kindness to the UN Sustainable Development Goals. Create a wave of goodness across the globe.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/submit">
                  <Button variant="impact" size="lg" className="w-full sm:w-auto">
                    <Heart className="w-5 h-5" />
                    Share Your Deed
                  </Button>
                </Link>
                <Link to="/feed">
                  <Button variant="impact" size="lg" className="w-full sm:w-auto">
                    <Globe className="w-5 h-5" />
                    Explore Impact
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Global Impact" 
                className="rounded-lg shadow-glow w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">2,847</div>
              <div className="text-muted-foreground">Noble Deeds Recorded</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">47,293</div>
              <div className="text-muted-foreground">Lives Positively Impacted</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success">17</div>
              <div className="text-muted-foreground">SDGs Being Advanced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Amplifying Good Through Technology
            </h2>
            <p className="text-xl text-muted-foreground">
              AI-powered platform connecting individual acts of kindness to global impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-elegant transition-all">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Anonymous Sharing</h3>
              <p className="text-muted-foreground">
                Record your good deeds anonymously. Focus on the impact, not the recognition.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-elegant transition-all">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">AI Classification</h3>
              <p className="text-muted-foreground">
                Smart AI automatically maps your deeds to relevant UN Sustainable Development Goals.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-elegant transition-all">
              <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-success-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Global Inspiration</h3>
              <p className="text-muted-foreground">
                Discover inspiring deeds from around the world and find new ways to make an impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Ripple Effect Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Every good deed creates ripples of positive change. Join thousands making a difference.
          </p>
          <Link to="/submit">
            <Button variant="secondary" size="lg">
              <Heart className="w-5 h-5" />
              Record Your First Deed
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
