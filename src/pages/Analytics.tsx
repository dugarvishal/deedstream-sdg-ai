import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { BarChart3, TrendingUp, Globe, Users, Heart, Sparkles, Target } from "lucide-react";
import { SAMPLE_DEEDS, SDG_DATA } from "@/lib/sdgData";

const Analytics = () => {
  // Calculate analytics from sample data
  const totalDeeds = SAMPLE_DEEDS.length;
  const totalImpact = SAMPLE_DEEDS.reduce((sum, deed) => sum + deed.impact, 0);
  const averageImpact = Math.round(totalImpact / totalDeeds);
  
  // SDG distribution
  const sdgCounts = SDG_DATA.map(sdg => {
    const count = SAMPLE_DEEDS.filter(deed => 
      deed.sdgs.some(deedSdg => deedSdg.id === sdg.id)
    ).length;
    return { ...sdg, count };
  }).filter(sdg => sdg.count > 0).sort((a, b) => b.count - a.count);

  // Location distribution
  const locationCounts = SAMPLE_DEEDS.reduce((acc, deed) => {
    const country = deed.location.split(',').pop()?.trim() || deed.location;
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Gender distribution
  const genderCounts = SAMPLE_DEEDS.reduce((acc, deed) => {
    acc[deed.contributor.gender] = (acc[deed.contributor.gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Age distribution
  const ageCounts = SAMPLE_DEEDS.reduce((acc, deed) => {
    acc[deed.contributor.age] = (acc[deed.contributor.age] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BarChart3 className="w-8 h-8 text-primary" />
            <Badge variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              Global Impact
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Impact Analytics</h1>
          <p className="text-xl text-muted-foreground">
            Visualizing the collective power of goodness across the globe and SDG categories.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="shadow-card bg-gradient-primary text-primary-foreground">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{totalDeeds}</div>
              <div className="text-sm opacity-90">Total Noble Deeds</div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-hero text-primary-foreground">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{totalImpact.toLocaleString()}</div>
              <div className="text-sm opacity-90">Lives Impacted</div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-success text-success-foreground">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{sdgCounts.length}</div>
              <div className="text-sm opacity-90">Active SDGs</div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-accent text-accent-foreground">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{averageImpact}</div>
              <div className="text-sm opacity-90">Avg. Impact per Deed</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* SDG Distribution */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>SDG Impact Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sdgCounts.map((sdg) => (
                  <div key={sdg.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: sdg.color }}
                        />
                        <span className="text-sm font-medium">SDG {sdg.id}: {sdg.title}</span>
                      </div>
                      <span className="text-sm font-bold">{sdg.count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all"
                        style={{ 
                          backgroundColor: sdg.color,
                          width: `${(sdg.count / Math.max(...sdgCounts.map(s => s.count))) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Geographic Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(locationCounts)
                  .sort(([,a], [,b]) => b - a)
                  .map(([location, count]) => (
                  <div key={location} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{location}</span>
                      <span className="text-sm font-bold">{count} deeds</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-hero h-2 rounded-full transition-all"
                        style={{ 
                          width: `${(count / Math.max(...Object.values(locationCounts))) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demographics - Gender */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Contributor Demographics - Gender</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(genderCounts)
                  .sort(([,a], [,b]) => b - a)
                  .map(([gender, count]) => (
                  <div key={gender} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{gender}</span>
                      <span className="text-sm font-bold">{count} contributors</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-success h-2 rounded-full transition-all"
                        style={{ 
                          width: `${(count / Math.max(...Object.values(genderCounts))) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demographics - Age */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Contributor Demographics - Age</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(ageCounts)
                  .sort(([,a], [,b]) => b - a)
                  .map(([age, count]) => (
                  <div key={age} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{age}</span>
                      <span className="text-sm font-bold">{count} contributors</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all"
                        style={{ 
                          width: `${(count / Math.max(...Object.values(ageCounts))) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Section */}
        <Card className="shadow-elegant mt-8 bg-gradient-subtle border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Key Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">Most Active SDGs</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Quality Education (SDG 4) leads with strong community focus</li>
                  <li>• Health & Well-being (SDG 3) shows significant grassroots impact</li>
                  <li>• Climate Action (SDG 13) gaining momentum globally</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">Impact Patterns</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Average of {averageImpact} lives touched per deed</li>
                  <li>• Strong engagement across all age groups</li>
                  <li>• Global participation spanning multiple continents</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;