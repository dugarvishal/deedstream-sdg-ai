import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import DeedCard from "@/components/DeedCard";
import SDGCard from "@/components/SDGCard";
import { Search, Filter, Globe, Heart, Sparkles } from "lucide-react";
import { SAMPLE_DEEDS, SDG_DATA } from "@/lib/sdgData";

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSDG, setSelectedSDG] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");

  // Filter deeds based on criteria
  const filteredDeeds = SAMPLE_DEEDS.filter(deed => {
    const matchesSearch = deed.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deed.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSDG = !selectedSDG || deed.sdgs.some(sdg => sdg.id === selectedSDG);
    const matchesLocation = !selectedLocation || deed.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesGender = !selectedGender || deed.contributor.gender.toLowerCase() === selectedGender.toLowerCase();
    const matchesAge = !selectedAge || deed.contributor.age === selectedAge;

    return matchesSearch && matchesSDG && matchesLocation && matchesGender && matchesAge;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSDG(null);
    setSelectedLocation("");
    setSelectedGender("");
    setSelectedAge("");
  };

  const locations = Array.from(new Set(SAMPLE_DEEDS.map(deed => deed.location)));
  const genders = Array.from(new Set(SAMPLE_DEEDS.map(deed => deed.contributor.gender)));
  const ages = Array.from(new Set(SAMPLE_DEEDS.map(deed => deed.contributor.age)));

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="w-8 h-8 text-primary" />
            <Badge variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              Global Inspiration
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Inspiration Feed</h1>
          <p className="text-xl text-muted-foreground">
            Discover noble deeds from around the world. Be inspired by the ripple effect of goodness.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-card sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search deeds..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* SDG Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">SDG Category</label>
                  <div className="grid gap-2 max-h-64 overflow-y-auto">
                    {SDG_DATA.map((sdg) => (
                      <SDGCard
                        key={sdg.id}
                        sdg={sdg}
                        isSelected={selectedSDG === sdg.id}
                        onClick={() => setSelectedSDG(selectedSDG === sdg.id ? null : sdg.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select value={selectedLocation} onValueChange={(value) => setSelectedLocation(value === "all-locations" ? "" : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-locations">All locations</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Gender Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <Select value={selectedGender} onValueChange={(value) => setSelectedGender(value === "all-genders" ? "" : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All genders" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-genders">All genders</SelectItem>
                      {genders.map(gender => (
                        <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Age Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age Group</label>
                  <Select value={selectedAge} onValueChange={(value) => setSelectedAge(value === "all-ages" ? "" : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All ages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-ages">All ages</SelectItem>
                      {ages.map(age => (
                        <SelectItem key={age} value={age}>{age}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Deeds Feed */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-lg font-semibold">
                  {filteredDeeds.length} Noble Deeds Found
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Total Impact: {filteredDeeds.reduce((sum, deed) => sum + deed.impact, 0)} lives
              </div>
            </div>

            {/* Deeds Grid */}
            {filteredDeeds.length > 0 ? (
              <div className="space-y-6">
                {filteredDeeds.map((deed) => (
                  <DeedCard key={deed.id} deed={deed} />
                ))}
              </div>
            ) : (
              <Card className="shadow-card text-center py-12">
                <CardContent>
                  <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No deeds match your filters</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or clearing filters to see more results.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;