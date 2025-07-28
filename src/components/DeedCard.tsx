import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Calendar } from "lucide-react";

interface DeedCardProps {
  deed: {
    id: string;
    description: string;
    impact: number;
    location: string;
    date: string;
    sdgs: Array<{
      id: number;
      title: string;
      color: string;
    }>;
    contributor: {
      age: string;
      gender: string;
    };
  };
}

const DeedCard = ({ deed }: DeedCardProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card hover:shadow-elegant transition-all">
      <div className="space-y-4">
        {/* Description */}
        <p className="text-card-foreground leading-relaxed">{deed.description}</p>
        
        {/* Impact */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{deed.impact} {deed.impact === 1 ? 'life' : 'lives'} impacted</span>
        </div>

        {/* SDG Tags */}
        <div className="flex flex-wrap gap-2">
          {deed.sdgs.map((sdg) => (
            <Badge 
              key={sdg.id} 
              variant="secondary" 
              className="text-xs"
              style={{ 
                backgroundColor: `${sdg.color}15`,
                color: sdg.color,
                borderColor: `${sdg.color}30`
              }}
            >
              SDG {sdg.id}: {sdg.title}
            </Badge>
          ))}
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{deed.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{deed.date}</span>
            </div>
          </div>
          <div className="text-muted-foreground">
            {deed.contributor.gender}, {deed.contributor.age}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeedCard;