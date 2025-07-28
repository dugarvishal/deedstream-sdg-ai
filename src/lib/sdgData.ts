export const SDG_DATA = [
  { id: 1, title: "No Poverty", color: "#E5243B" },
  { id: 2, title: "Zero Hunger", color: "#DDA63A" },
  { id: 3, title: "Good Health and Well-being", color: "#4C9F38" },
  { id: 4, title: "Quality Education", color: "#C5192D" },
  { id: 5, title: "Gender Equality", color: "#FF3A21" },
  { id: 6, title: "Clean Water and Sanitation", color: "#26BDE2" },
  { id: 7, title: "Affordable and Clean Energy", color: "#FCC30B" },
  { id: 8, title: "Decent Work and Economic Growth", color: "#A21942" },
  { id: 9, title: "Industry, Innovation and Infrastructure", color: "#FD6925" },
  { id: 10, title: "Reduced Inequalities", color: "#DD1367" },
  { id: 11, title: "Sustainable Cities and Communities", color: "#FD9D24" },
  { id: 12, title: "Responsible Consumption and Production", color: "#BF8B2E" },
  { id: 13, title: "Climate Action", color: "#3F7E44" },
  { id: 14, title: "Life Below Water", color: "#0A97D9" },
  { id: 15, title: "Life on Land", color: "#56C02B" },
  { id: 16, title: "Peace, Justice and Strong Institutions", color: "#00689D" },
  { id: 17, title: "Partnerships for the Goals", color: "#19486A" }
];

export const SAMPLE_DEEDS = [
  {
    id: "1",
    description: "Organized a community book drive and donated 200 books to local schools in underserved areas. Children now have access to educational materials they desperately needed.",
    impact: 150,
    location: "Mumbai, India",
    date: "2024-01-15",
    sdgs: [
      { id: 4, title: "Quality Education", color: "#C5192D" },
      { id: 10, title: "Reduced Inequalities", color: "#DD1367" }
    ],
    contributor: { age: "25-34", gender: "Female" }
  },
  {
    id: "2", 
    description: "Started a neighborhood composting program that reduced waste by 60% and created fertile soil for community gardens. Now 12 families are growing their own vegetables.",
    impact: 12,
    location: "Portland, USA",
    date: "2024-01-12",
    sdgs: [
      { id: 12, title: "Responsible Consumption", color: "#BF8B2E" },
      { id: 13, title: "Climate Action", color: "#3F7E44" }
    ],
    contributor: { age: "35-44", gender: "Male" }
  },
  {
    id: "3",
    description: "Taught digital literacy classes to 30 elderly residents at the local community center. They can now video call their grandchildren and access online services.",
    impact: 30,
    location: "Toronto, Canada", 
    date: "2024-01-10",
    sdgs: [
      { id: 4, title: "Quality Education", color: "#C5192D" },
      { id: 9, title: "Innovation and Infrastructure", color: "#FD6925" }
    ],
    contributor: { age: "18-24", gender: "Non-binary" }
  },
  {
    id: "4",
    description: "Organized free health screenings in rural villages, helping detect early signs of diabetes and hypertension in 80 people who couldn't afford regular checkups.",
    impact: 80,
    location: "Kerala, India",
    date: "2024-01-08",
    sdgs: [
      { id: 3, title: "Good Health and Well-being", color: "#4C9F38" },
      { id: 10, title: "Reduced Inequalities", color: "#DD1367" }
    ],
    contributor: { age: "25-34", gender: "Female" }
  },
  {
    id: "5",
    description: "Built a small solar charging station for mobile phones in an off-grid village. 50 families now have access to communication and emergency services.",
    impact: 50,
    location: "Nairobi, Kenya",
    date: "2024-01-05",
    sdgs: [
      { id: 7, title: "Affordable and Clean Energy", color: "#FCC30B" },
      { id: 9, title: "Innovation and Infrastructure", color: "#FD6925" }
    ],
    contributor: { age: "35-44", gender: "Male" }
  }
];

// Simulated AI function to classify deeds into SDGs
export const classifyDeedToSDGs = (description: string): Array<{id: number, title: string, color: string}> => {
  const keywords = description.toLowerCase();
  const matchedSDGs: Array<{id: number, title: string, color: string}> = [];

  // Simple keyword matching for demonstration
  if (keywords.includes('book') || keywords.includes('education') || keywords.includes('teach') || keywords.includes('school')) {
    matchedSDGs.push(SDG_DATA[3]); // Quality Education
  }
  if (keywords.includes('health') || keywords.includes('medical') || keywords.includes('doctor') || keywords.includes('screening')) {
    matchedSDGs.push(SDG_DATA[2]); // Good Health and Well-being  
  }
  if (keywords.includes('food') || keywords.includes('hunger') || keywords.includes('meal') || keywords.includes('nutrition')) {
    matchedSDGs.push(SDG_DATA[1]); // Zero Hunger
  }
  if (keywords.includes('environment') || keywords.includes('compost') || keywords.includes('recycle') || keywords.includes('climate')) {
    matchedSDGs.push(SDG_DATA[12]); // Climate Action
  }
  if (keywords.includes('energy') || keywords.includes('solar') || keywords.includes('electricity')) {
    matchedSDGs.push(SDG_DATA[6]); // Affordable and Clean Energy
  }
  if (keywords.includes('digital') || keywords.includes('technology') || keywords.includes('innovation') || keywords.includes('infrastructure')) {
    matchedSDGs.push(SDG_DATA[8]); // Innovation and Infrastructure
  }
  if (keywords.includes('poor') || keywords.includes('underserved') || keywords.includes('inequality') || keywords.includes('rural')) {
    matchedSDGs.push(SDG_DATA[9]); // Reduced Inequalities
  }

  // If no matches, default to a relevant SDG
  if (matchedSDGs.length === 0) {
    matchedSDGs.push(SDG_DATA[16]); // Partnerships for the Goals
  }

  return matchedSDGs.slice(0, 3); // Limit to 3 SDGs max
};