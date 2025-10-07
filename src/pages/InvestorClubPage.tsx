import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Eye, 
  Users, 
  Play,
  MessageCircle,
  Target,
  Star,
  Bell,
  Wallet,
  Clock,
  CheckCircle,
  PlayCircle,
  Heart,
  Lightbulb,
  Award,
  Globe,
  Share2,
  Megaphone,
  Tag,
  Shield,
  Crown,
  Percent,
  DollarSign,
  Gift,
  Zap,
  TrendingDown
} from 'lucide-react';
import { Button } from '../components/ui/Button';

// Investment types based on the new business model
const investmentTypes = [
  {
    id: 'affiliation',
    name: 'Affiliation',
    description: '20% commission on each sale',
    icon: Share2,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
    requirements: 'Simply share a unique link',
    benefits: ['No product creation needed', 'Real-time sales tracking', 'Automated payments'],
    targetUsers: 'Bloggers, influencers, content creators, marketers',
    commission: '20%',
    minInvestment: 'Free',
    difficulty: 'Beginner'
  },
  {
    id: 'sponsoring',
    name: 'Product Sponsoring',
    description: '20% commission on sponsored campaigns',
    icon: Megaphone,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/20',
    requirements: 'Finance marketing of existing products',
    benefits: ['Passive income through campaigns', 'No content production effort', 'Access to validated products'],
    targetUsers: 'Individuals, companies, investors, B2B partners',
    commission: '20%',
    minInvestment: '$100',
    difficulty: 'Intermediate'
  },
  {
    id: 'promo-codes',
    name: 'Personalized Promo Code',
    description: '10% commission + 10% buyer discount',
    icon: Tag,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/20',
    requirements: 'Free to obtain and share',
    benefits: ['Easy to share on social networks', 'Help audience save while earning', 'No upfront cost'],
    targetUsers: 'Influencers, ambassadors, coupon distributors',
    commission: '10%',
    minInvestment: 'Free',
    difficulty: 'Beginner'
  },
  {
    id: 'license-purchase',
    name: 'License Purchase',
    description: '70% direct sales, 50% through intermediaries',
    icon: Shield,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20',
    requirements: 'Own the product rights',
    benefits: ['Lifetime passive revenue', 'Full infrastructure support', 'Freedom to activate affiliates'],
    targetUsers: 'Investors, professionals, creators without time',
    commission: '70%/50%',
    minInvestment: '$500',
    difficulty: 'Advanced'
  },
  {
    id: 'premium-option',
    name: 'Premium Investment',
    description: 'Exclusive high-value opportunities',
    icon: Crown,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
    requirements: 'VIP access and qualification',
    benefits: ['Exclusive opportunities', 'Priority support', 'Advanced analytics'],
    targetUsers: 'High-net-worth individuals, institutional investors',
    commission: 'Variable',
    minInvestment: '$1,000',
    difficulty: 'Expert'
  }
];

// Mock opportunities for each investment type
const investmentOpportunities = [
  // Affiliation opportunities
  {
    id: 1,
    title: "Digital Marketing Mastery Course",
    creator: "Sarah Johnson",
    type: "affiliation",
    category: "Marketing",
    description: "Comprehensive digital marketing course with proven strategies and case studies.",
    commission: 20,
    commissionType: "per_sale",
    totalSales: 2834,
    avgSalePrice: 197,
         estimatedMonthlyEarning: "$500-$2,000",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    affiliates: 156,
    conversionRate: "8.5%",
    badge: "Top Performer"
  },
  {
    id: 2,
    title: "AI Business Integration Guide",
    creator: "David Chen",
    type: "affiliation",
    category: "Technology",
    description: "Complete guide on integrating AI tools into business operations.",
    commission: 20,
    commissionType: "per_sale",
    totalSales: 1456,
    avgSalePrice: 127,
         estimatedMonthlyEarning: "$300-$1,200",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    affiliates: 89,
    conversionRate: "12.3%",
    badge: "High Converting"
  },
  // Sponsoring opportunities
  {
    id: 3,
    title: "E-commerce Success Blueprint",
    creator: "Maria Rodriguez",
    type: "sponsoring",
    category: "E-commerce",
    description: "Proven strategies for building profitable e-commerce businesses.",
    commission: 20,
    commissionType: "campaign_sales",
    campaignBudget: 5000,
    expectedROI: "150-300%",
         estimatedMonthlyEarning: "$1,000-$3,000",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    sponsors: 24,
    campaignReach: "50k+",
    badge: "Sponsored Campaign"
  },
  {
    id: 4,
    title: "Cryptocurrency Investment Masterclass",
    creator: "Alex Turner",
    type: "sponsoring",
    category: "Finance",
    description: "Advanced cryptocurrency investment strategies for serious investors.",
    commission: 20,
    commissionType: "campaign_sales",
    campaignBudget: 8000,
    expectedROI: "200-400%",
         estimatedMonthlyEarning: "$1,500-$4,000",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    sponsors: 18,
    campaignReach: "75k+",
    badge: "High ROI"
  },
  // Promo code opportunities
  {
    id: 5,
    title: "Social Media Growth Toolkit",
    creator: "Emma Wilson",
    type: "promo-codes",
    category: "Social Media",
    description: "Complete toolkit for growing your social media presence and engagement.",
    commission: 10,
    commissionType: "per_sale",
    buyerDiscount: 10,
    totalSales: 3245,
    avgSalePrice: 87,
         estimatedMonthlyEarning: "$200-$800",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    promoUsers: 234,
    conversionRate: "15.2%",
    badge: "High Conversion"
  },
  {
    id: 6,
    title: "Photography Business Starter Pack",
    creator: "James Miller",
    type: "promo-codes",
    category: "Photography",
    description: "Everything you need to start and grow a profitable photography business.",
    commission: 10,
    commissionType: "per_sale",
    buyerDiscount: 10,
    totalSales: 1876,
    avgSalePrice: 147,
         estimatedMonthlyEarning: "$150-$600",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    promoUsers: 167,
    conversionRate: "11.8%",
    badge: "Popular Choice"
  },
  // License purchase opportunities
  {
    id: 7,
    title: "Complete Web Development Course",
    creator: "Sophie Laurent",
    type: "license-purchase",
    category: "Programming",
    description: "Full-stack web development course with lifetime updates and support.",
    directCommission: 70,
    intermediaryCommission: 50,
    licensePrice: 2500,
         estimatedMonthlyEarning: "$2,000-$8,000",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    totalSales: 456,
    avgSalePrice: 297,
    badge: "License Available"
  },
  {
    id: 8,
    title: "Digital Product Empire Builder",
    creator: "Antoine Dubois",
    type: "license-purchase",
    category: "Business",
    description: "Complete system for building and scaling digital product businesses.",
    directCommission: 70,
    intermediaryCommission: 50,
    licensePrice: 4000,
         estimatedMonthlyEarning: "$3,000-$12,000",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    totalSales: 234,
    avgSalePrice: 497,
    badge: "High Value"
  },
  // Premium opportunities
  {
    id: 9,
    title: "Exclusive AI Startup Accelerator",
    creator: "Premium Partners",
    type: "premium-option",
    category: "Startup",
    description: "VIP access to exclusive AI startup opportunities and mentorship programs.",
    commission: "Variable",
    minInvestment: 10000,
    expectedROI: "300-500%",
         estimatedMonthlyEarning: "$5,000-$20,000",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    investors: 12,
    exclusivity: "VIP Only",
    badge: "Exclusive"
  }
];

// Platform metrics
const platformMetrics = {
  totalRevenue: "$2.3M",
  activeInvestors: "1,247",
  successRate: "89%",
  avgMonthlyReturn: "$1,850",
  topPerformers: [
    { name: "Digital Marketing Course", revenue: "$156k", commission: "$31.2k" },
    { name: "E-commerce Blueprint", revenue: "$98k", commission: "$19.6k" },
    { name: "AI Business Guide", revenue: "$87k", commission: "$17.4k" },
    { name: "Crypto Masterclass", revenue: "$76k", commission: "$15.2k" },
    { name: "Social Media Toolkit", revenue: "$65k", commission: "$6.5k" }
  ]
};

const InvestorClubPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('opportunities');
  const [selectedInvestmentType, setSelectedInvestmentType] = useState('all');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showOpportunityModal, setShowOpportunityModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const getFilteredOpportunities = () => {
    if (selectedInvestmentType === 'all') return investmentOpportunities;
    return investmentOpportunities.filter(opp => opp.type === selectedInvestmentType);
  };

  const OpportunityCard = ({ opportunity }: { opportunity: any }) => {
    const investmentType = investmentTypes.find(type => type.id === opportunity.type);
    const IconComponent = investmentType?.icon || Target; // Fallback to Target icon

    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 group hover:border-primary/30 transition-all duration-300"
      >
        <div className="relative">
          <img 
            src={opportunity.image} 
            alt={opportunity.title}
            loading="eager"
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ 
              minHeight: '192px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}
          />
          
          {/* Investment Type Badge */}
          <div className="absolute top-3 left-3">
            <span className={`${investmentType?.bgColor || 'bg-white/10'} ${investmentType?.color || 'text-white'} border ${investmentType?.borderColor || 'border-white/20'} px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm`}>
              {investmentType?.name || 'Investment'}
            </span>
          </div>

          {/* Performance Badge */}
          <div className="absolute top-3 right-3 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {opportunity.badge}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 ${investmentType?.bgColor || 'bg-white/10'} rounded-lg flex items-center justify-center`}>
              <IconComponent className={`w-4 h-4 ${investmentType?.color || 'text-white'}`} />
            </div>
            <div>
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
              {opportunity.category}
            </span>
            </div>
          </div>

          <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {opportunity.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white/60">{opportunity.creator}</span>
            <div className="flex items-center gap-1 ml-auto">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-white/60">{opportunity.rating}</span>
            </div>
          </div>

          <p className="text-sm text-white/70 mb-4 line-clamp-2">{opportunity.description}</p>

          {/* Commission Structure */}
          <div className="bg-white/5 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/60">Commission Rate</span>
              <span className="text-sm font-semibold text-green-400">
                {opportunity.type === 'license-purchase' 
                  ? `${opportunity.directCommission}%/${opportunity.intermediaryCommission}%`
                  : `${opportunity.commission}%`}
              </span>
            </div>
            {opportunity.type === 'promo-codes' && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Buyer Discount</span>
                <span className="text-sm font-semibold text-blue-400">
                  {opportunity.buyerDiscount}%
                </span>
            </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-white/60">Est. Monthly Earning</span>
              <span className="text-sm font-semibold text-white">
                {opportunity.estimatedMonthlyEarning}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-xs text-white/60 mb-4">
            <div>
              <span className="block">Performance</span>
              <span className="text-white font-medium">
                {opportunity.conversionRate || opportunity.campaignReach || 'High ROI'}
              </span>
            </div>
            <div>
              <span className="block">Active Users</span>
              <span className="text-white font-medium">
                {opportunity.affiliates || opportunity.sponsors || opportunity.promoUsers || opportunity.investors}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="flex-1 text-white hover:bg-white/10"
              onClick={() => {
                setSelectedOpportunity(opportunity);
                setShowOpportunityModal(true);
              }}
            >
              <Eye className="w-4 h-4 mr-1" />
              Details
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={() => {
                setSelectedOpportunity(opportunity);
                setShowJoinModal(true);
              }}
            >
              <Target className="w-4 h-4 mr-1" />
              Start Earning
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };

  const PlatformMetricsChart = () => {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">Platform Performance</h3>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">{platformMetrics.totalRevenue}</div>
            <div className="text-sm text-white/60">Total Revenue Generated</div>
              </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">{platformMetrics.activeInvestors}</div>
            <div className="text-sm text-white/60">Active Investors</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">{platformMetrics.successRate}</div>
            <div className="text-sm text-white/60">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{platformMetrics.avgMonthlyReturn}</div>
            <div className="text-sm text-white/60">Avg. Monthly Return</div>
          </div>
        </div>
      </div>
    );
  };

  // Modal Components
  const InfoModal = () => (
    showInfoModal && (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-secondary rounded-2xl p-6 max-w-4xl w-full border border-white/10 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Investment Options Overview</h3>
            <button
              onClick={() => setShowInfoModal(false)}
              className="text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentTypes.map((type) => (
              <div key={type.id} className={`${type.bgColor} border ${type.borderColor} rounded-xl p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${type.bgColor} rounded-xl flex items-center justify-center border ${type.borderColor}`}>
                    <type.icon className={`w-6 h-6 ${type.color}`} />
                  </div>
              <div>
                    <h4 className="font-semibold text-white">{type.name}</h4>
                    <span className="text-xs text-white/60">{type.difficulty}</span>
              </div>
            </div>
                <p className="text-sm text-white/80 mb-3">{type.description}</p>
                <div className="space-y-2 text-xs text-white/70">
                  <div className="flex justify-between">
                    <span>Commission:</span>
                    <span className={type.color}>{type.commission}</span>
              </div>
                  <div className="flex justify-between">
                    <span>Min. Investment:</span>
                    <span className="text-white">{type.minInvestment}</span>
            </div>
              </div>
                <div className="mt-4">
                  <p className="text-xs text-white/60 mb-2">Benefits:</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    {type.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
            </div>
              </div>
            ))}
          </div>
                     <div className="mt-6 flex gap-4">
             <Button 
               className="flex-1 bg-primary hover:bg-primary/90" 
               onClick={() => navigate('/signup')}
             >
              Start Investing Now
             </Button>
            <Button variant="ghost" className="flex-1 border-white/20" onClick={() => setShowInfoModal(false)}>
              Continue Exploring
            </Button>
          </div>
        </div>
      </div>
    )
  );

  const OpportunityModal = () => (
    showOpportunityModal && selectedOpportunity && (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-secondary rounded-2xl p-6 max-w-4xl w-full border border-white/10 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">{selectedOpportunity.title}</h3>
            <button
              onClick={() => setShowOpportunityModal(false)}
              className="text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <img 
                src={selectedOpportunity.image} 
                alt={selectedOpportunity.title}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">About this opportunity</h4>
                  <p className="text-white/80">{selectedOpportunity.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Creator</h4>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white/60" />
                    <span className="text-white/80">{selectedOpportunity.creator}</span>
                    <div className="flex items-center gap-1 ml-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white/60">{selectedOpportunity.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-3">Investment Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Investment Type</span>
                    <span className="text-white">{investmentTypes.find(t => t.id === selectedOpportunity.type)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Commission Rate</span>
                    <span className="text-green-400">
                      {selectedOpportunity.type === 'license-purchase' 
                        ? `${selectedOpportunity.directCommission}%/${selectedOpportunity.intermediaryCommission}%`
                        : `${selectedOpportunity.commission}%`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Est. Monthly Earning</span>
                    <span className="text-primary">{selectedOpportunity.estimatedMonthlyEarning}</span>
                  </div>
                  {selectedOpportunity.type === 'license-purchase' && (
                  <div className="flex justify-between">
                      <span className="text-white/60">License Price</span>
                      <span className="text-white">${selectedOpportunity.licensePrice}</span>
                  </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button className="bg-green-500 hover:bg-green-600" onClick={() => setShowJoinModal(true)}>
                  <Target className="w-4 h-4 mr-2" />
                  Start This Investment
                </Button>
                <Button variant="ghost" className="border-white/20">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Creator
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const JoinModal = () => (
    showJoinModal && (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-secondary rounded-2xl p-6 max-w-md w-full border border-white/10">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Join AyanBridge Investment Club</h3>
            <p className="text-white/70 mb-6">
              Create your account to access all investment opportunities and start earning.
            </p>
                         <div className="space-y-3">
               <Button 
                 className="w-full bg-primary hover:bg-primary/90"
                 onClick={() => navigate('/login')}
               >
                Sign In
               </Button>
               <Button 
                 variant="ghost" 
                 className="w-full border-white/20"
                 onClick={() => navigate('/signup')}
               >
                Create Account
               </Button>
              <Button 
                variant="ghost" 
                className="w-full text-white/60 hover:text-white"
                onClick={() => setShowJoinModal(false)}
              >
                Continue Browsing
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const NotificationToast = () => (
    showNotification && (
      <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4" />
          <span>Notifications enabled! You'll be alerted about new opportunities.</span>
        </div>
      </div>
    )
  );

  const handleNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="w-full bg-secondary text-white">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="w-full py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-400/10"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-green-400 font-medium">AyanBridge Investment Club</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                5 Ways to
                <span className="text-green-400"> Earn</span>
                <br />
                with Digital Products
              </h1>
              
              <p className="text-lg sm:text-xl text-white/80 mb-8">
                From simple affiliate links to full product licensing - choose your investment level 
                and start earning commissions from proven digital products.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{platformMetrics.successRate}</div>
                  <div className="text-xs text-white/60">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{platformMetrics.activeInvestors}</div>
                  <div className="text-xs text-white/60">Active Investors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{platformMetrics.totalRevenue}</div>
                  <div className="text-xs text-white/60">Revenue Generated</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4"
                  onClick={() => navigate('/signup')}
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Start Earning Today
                </Button>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4"
                  onClick={() => setShowInfoModal(true)}
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Explore Investment Types
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <PlatformMetricsChart />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500/20 rounded-full blur-lg"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Investment Types Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">5 Investment Options</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Choose the investment approach that matches your goals, budget, and expertise level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {investmentTypes.map((type) => (
            <motion.div 
                key={type.id}
              whileHover={{ y: -5 }}
                className={`text-center p-6 ${type.bgColor} rounded-xl border ${type.borderColor} cursor-pointer transition-all duration-300 hover:scale-105`}
                onClick={() => setSelectedInvestmentType(type.id)}
              >
                <div className={`w-16 h-16 ${type.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 border ${type.borderColor}`}>
                  <type.icon className={`w-8 h-8 ${type.color}`} />
                </div>
                <h3 className="font-semibold text-white mb-2">{type.name}</h3>
                <p className="text-xs text-white/60 mb-3">{type.description}</p>
                <div className="space-y-1">
                  <div className={`text-lg font-bold ${type.color}`}>{type.commission}</div>
                  <div className="text-xs text-white/50">{type.difficulty}</div>
                </div>
            </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="w-full px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-2">
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'opportunities', label: 'Investment Opportunities', icon: Target },
                { id: 'live-pitch', label: 'Creator Presentations', icon: PlayCircle },
                { id: 'community', label: 'Success Stories', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    selectedTab === tab.id 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Type Filter */}
      {selectedTab === 'opportunities' && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedInvestmentType('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedInvestmentType === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                All Opportunities
              </button>
              {investmentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedInvestmentType(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedInvestmentType === type.id
                      ? `${type.bgColor} ${type.color} border ${type.borderColor}`
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {selectedTab === 'opportunities' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedInvestmentType === 'all' 
                    ? 'All Investment Opportunities' 
                    : `${investmentTypes.find(t => t.id === selectedInvestmentType)?.name} Opportunities`}
                </h2>
                <p className="text-white/70">
                  {selectedInvestmentType === 'all'
                    ? 'Explore all available ways to earn with digital products'
                    : investmentTypes.find(t => t.id === selectedInvestmentType)?.description}
                </p>
              </div>

              {/* Opportunities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredOpportunities().map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'live-pitch' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <div className="aspect-video bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="w-16 h-16 text-white/60 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Creator Presentations</h3>
                    <p className="text-white/60 mb-4">Watch creators present their products and investment opportunities</p>
                    <Button 
                      className="bg-red-500 hover:bg-red-600"
                      onClick={handleNotification}
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Get Notified of Live Sessions
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold text-white mb-4">Upcoming Presentations</h3>
                      <div className="space-y-4">
                        {getFilteredOpportunities().slice(0, 3).map((opportunity) => (
                          <div key={opportunity.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                            <img src={opportunity.image} alt={opportunity.title} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1">
                              <h4 className="font-medium text-white">{opportunity.title}</h4>
                              <p className="text-sm text-white/60">{opportunity.creator}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary">Live presentation available</span>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => {
                                setSelectedOpportunity(opportunity);
                                setShowOpportunityModal(true);
                              }}
                            >
                              Watch
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Investment Types Featured</h3>
                      <div className="space-y-3">
                        {investmentTypes.slice(0, 4).map((type) => (
                          <div key={type.id} className={`${type.bgColor} border ${type.borderColor} rounded-lg p-3`}>
                            <div className="flex items-center gap-2 mb-2">
                              <type.icon className={`w-4 h-4 ${type.color}`} />
                              <span className="text-sm font-medium text-white">{type.name}</span>
                        </div>
                            <p className="text-xs text-white/70">{type.description}</p>
                      </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'community' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">€2.3M</div>
                      <div className="text-sm text-white/60">Total Commissions Paid</div>
                    </div>
                  </div>
                  <div className="text-xs text-green-400">Across all investment types</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">89%</div>
                      <div className="text-sm text-white/60">Success Rate</div>
                    </div>
                  </div>
                  <div className="text-xs text-blue-400">Profitable investments</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">1,247</div>
                      <div className="text-sm text-white/60">Active Investors</div>
                    </div>
                  </div>
                  <div className="text-xs text-primary">Growing community</div>
                </div>
              </div>

              {/* Top Performers */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white">Top Performing Investments</h3>
                </div>
                <div className="divide-y divide-white/10">
                  {platformMetrics.topPerformers.map((performer, index) => (
                    <div key={index} className="p-6 hover:bg-white/5 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                            <span className="text-primary font-bold">#{index + 1}</span>
                          </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-white mb-1">{performer.name}</h4>
                          <div className="text-sm text-white/60">
                              Total Revenue: <span className="text-green-400">{performer.revenue}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-400">
                            {performer.commission}
                          </div>
                          <div className="text-sm text-white/60">Commissions Paid</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setShowJoinModal(true)}
                >
                  Join 1,247+ Successful Investors
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

             <InfoModal />
       <OpportunityModal />
       <JoinModal />
       <NotificationToast />
    </div>
  );
};

export default InvestorClubPage; 