import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import SDGCard from "@/components/SDGCard";
import { Heart, Sparkles, Users, MapPin, Calendar, Send } from "lucide-react";
import { classifyDeedToSDGs, SDG_DATA } from "@/lib/sdgData";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Submit = () => {
  const [description, setDescription] = useState("");
  const [impact, setImpact] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [suggestedSDGs, setSuggestedSDGs] = useState<Array<{id: number, title: string, color: string}>>([]);
  const [selectedSDGs, setSelectedSDGs] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    if (value.length > 20) {
      const suggested = classifyDeedToSDGs(value);
      setSuggestedSDGs(suggested);
      setSelectedSDGs(suggested.map(sdg => sdg.id));
    } else {
      setSuggestedSDGs([]);
      setSelectedSDGs([]);
    }
  };

  const toggleSDG = (sdgId: number) => {
    setSelectedSDGs(prev => 
      prev.includes(sdgId) 
        ? prev.filter(id => id !== sdgId)
        : [...prev, sdgId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !impact || !location || !age || !gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Deed Recorded Successfully! 🌟",
      description: `Your noble deed impacting ${impact} ${parseInt(impact) === 1 ? 'life' : 'lives'} has been added to the global wave of goodness.`,
    });

    // Reset form
    setDescription("");
    setImpact("");
    setLocation("");
    setAge("");
    setGender("");
    setSuggestedSDGs([]);
    setSelectedSDGs([]);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-primary" />
              <Badge variant="secondary">
                <Sparkles className="w-3 h-3 mr-1" />
                Share Your Impact
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Record Your Noble Deed</h1>
            <p className="text-xl text-muted-foreground">
              Help us map the positive impact you're creating in the world. Your deed will inspire others and contribute to global SDG progress.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Deed Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Describe Your Deed</Label>
                      <Textarea
                        id="description"
                        placeholder="Tell us about the positive impact you created. What did you do and how did it help others?"
                        value={description}
                        onChange={(e) => handleDescriptionChange(e.target.value)}
                        className="min-h-32"
                        required
                      />
                      <p className="text-sm text-muted-foreground">
                        {description.length > 20 && suggestedSDGs.length > 0 && (
                          <span className="flex items-center space-x-1">
                            <Sparkles className="w-3 h-3" />
                            <span>AI has suggested relevant SDGs below</span>
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Impact */}
                    <div className="space-y-2">
                      <Label htmlFor="impact">Number of Lives Impacted</Label>
                      <Input
                        id="impact"
                        type="number"
                        placeholder="How many people were positively affected?"
                        value={impact}
                        onChange={(e) => setImpact(e.target.value)}
                        min="1"
                        required
                      />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, Country"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>

                    {/* Demographics */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age Group</Label>
                        <Select value={age} onValueChange={setAge} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select age range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-18">Under 18</SelectItem>
                            <SelectItem value="18-24">18-24</SelectItem>
                            <SelectItem value="25-34">25-34</SelectItem>
                            <SelectItem value="35-44">35-44</SelectItem>
                            <SelectItem value="45-54">45-54</SelectItem>
                            <SelectItem value="55-64">55-64</SelectItem>
                            <SelectItem value="65+">65+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={gender} onValueChange={setGender} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="non-binary">Non-binary</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      variant="success" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Sparkles className="w-5 h-5 animate-spin" />
                          Recording Your Deed...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Record Noble Deed
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* SDG Selection & Preview */}
            <div className="space-y-6">
              {/* AI Suggested SDGs */}
              {suggestedSDGs.length > 0 && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Suggested SDGs</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {suggestedSDGs.map((sdg) => (
                      <SDGCard
                        key={sdg.id}
                        sdg={sdg}
                        isSelected={selectedSDGs.includes(sdg.id)}
                        onClick={() => toggleSDG(sdg.id)}
                      />
                    ))}
                    <p className="text-xs text-muted-foreground">
                      Click to toggle SDG selection. You can select multiple goals.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Preview */}
              {description && impact && location && (
                <Card className="shadow-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-sm text-primary">Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-card-foreground">{description}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{impact} {parseInt(impact) === 1 ? 'life' : 'lives'} impacted</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{location}</span>
                    </div>
                    {selectedSDGs.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium">Mapped SDGs:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedSDGs.map(sdgId => {
                            const sdg = SDG_DATA.find(s => s.id === sdgId);
                            return sdg ? (
                              <Badge 
                                key={sdg.id} 
                                variant="secondary" 
                                className="text-xs"
                                style={{ 
                                  backgroundColor: `${sdg.color}15`,
                                  color: sdg.color 
                                }}
                              >
                                SDG {sdg.id}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Help Card */}
              <Card className="shadow-card bg-gradient-subtle border-0">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Why Share Anonymously?</h3>
                  <p className="text-sm text-muted-foreground">
                    Anonymous sharing focuses on the impact, not the individual. This creates a safe space for genuine good deeds without ego or recognition-seeking.
                  </p>
                  <Link to="/feed" className="inline-block mt-3">
                    <Button variant="ghost" size="sm">
                      See Examples →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;