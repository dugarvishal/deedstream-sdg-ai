import { Badge } from "@/components/ui/badge";

interface SDGCardProps {
  sdg: {
    id: number;
    title: string;
    color: string;
  };
  isSelected?: boolean;
  onClick?: () => void;
}

const SDGCard = ({ sdg, isSelected = false, onClick }: SDGCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-elegant'
          : 'border-border bg-card hover:border-primary/50 hover:shadow-card'
      }`}
    >
      <div className="flex items-center space-x-2">
        <div 
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: sdg.color }}
        >
          {sdg.id}
        </div>
        <span className="text-sm font-medium text-card-foreground">{sdg.title}</span>
      </div>
    </div>
  );
};

export default SDGCard;