import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Target, 
  Clock, 
  Users, 
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Heart,
  Shield,
  Award,
  Calendar,
  Wallet,
  Plus,
  Filter,
  Search,
  Info,
  BookOpen,
  Radio,
  Share2,
  Megaphone,
  Tag,
  Crown,
  Percent,
  Gift,
  Zap
} from 'lucide-react';

// Investment types matching the new business model
const investmentTypes = [
  {
    id: 'affiliation',
    name: 'Affiliation',
    description: '20% commission on each sale',
    icon: Share2,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
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
    commission: 'Variable',
    minInvestment: '$1,000',
    difficulty: 'Expert'
  }
];

interface InvestmentOpportunity {
  id: string;
  title: string;
  type: 'affiliation' | 'sponsoring' | 'promo-codes' | 'license-purchase' | 'premium-option';
  creator: string;
  description: string;
  category: string;
  commission: number | string;
  commissionType: string;
  minInvestment: number;
  expectedROI: string;
  timeframe: string;
  risk: 'Low' | 'Medium' | 'High';
  participants: number;
  fundingDeadline: string;
  projectedRevenue: number;
  estimatedMonthlyEarning: string;
  status: 'active' | 'funded' | 'closed';
  featured: boolean;
  image?: string;
  rating: number;
  totalSales?: number;
  avgSalePrice?: number;
  conversionRate?: string;
  campaignBudget?: number;
  campaignReach?: string;
  buyerDiscount?: number;
  licensePrice?: number;
  directCommission?: number;
  intermediaryCommission?: number;
}

interface Portfolio {
  id: string;
  productTitle: string;
  type: string;
  investmentType: string;
  investedAmount: number;
  currentValue: number;
  returns: number;
  returnsPercentage: number;
  investmentDate: string;
  status: 'active' | 'completed' | 'pending';
  nextPayout: string;
  commissionStructure: string;
}

interface Transaction {
  id: string;
  type: 'investment' | 'return' | 'withdrawal' | 'commission';
  productTitle: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  investmentType: string;
}

const ClubInvest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'portfolio' | 'analytics' | 'transactions'>('opportunities');
  const [selectedInvestmentType, setSelectedInvestmentType] = useState<string>('all');
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<InvestmentOpportunity | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [investmentData, setInvestmentData] = useState<any>({});

  const investmentOpportunities: InvestmentOpportunity[] = [
    // Affiliation opportunities
    {
      id: '1',
      title: 'Digital Marketing Mastery Course',
      type: 'affiliation',
      creator: 'Sarah Johnson',
      description: 'Comprehensive digital marketing course with proven strategies and case studies.',
      category: 'Marketing',
      commission: 20,
      commissionType: 'per_sale',
      minInvestment: 0,
      expectedROI: '15-25%',
      timeframe: '6 months',
      risk: 'Low',
      participants: 156,
      fundingDeadline: '2024-03-15',
      projectedRevenue: 78000,
      estimatedMonthlyEarning: '$500-$2,000',
      status: 'active',
      featured: true,
      rating: 4.8,
      totalSales: 2834,
      avgSalePrice: 197,
      conversionRate: '8.5%'
    },
    {
      id: '2',
      title: 'AI Business Integration Guide',
      type: 'affiliation',
      creator: 'David Chen',
      description: 'Complete guide on integrating AI tools into business operations.',
      category: 'Technology',
      commission: 20,
      commissionType: 'per_sale',
      minInvestment: 0,
      expectedROI: '20-30%',
      timeframe: '4 months',
      risk: 'Low',
      participants: 89,
      fundingDeadline: '2024-02-28',
      projectedRevenue: 45000,
      estimatedMonthlyEarning: '$300-$1,200',
      status: 'active',
      featured: false,
      rating: 4.9,
      totalSales: 1456,
      avgSalePrice: 127,
      conversionRate: '12.3%'
    },
    // Sponsoring opportunities
    {
      id: '3',
      title: 'E-commerce Success Blueprint',
      type: 'sponsoring',
      creator: 'Maria Rodriguez',
      description: 'Proven strategies for building profitable e-commerce businesses.',
      category: 'E-commerce',
      commission: 20,
      commissionType: 'campaign_sales',
      minInvestment: 500,
      expectedROI: '25-40%',
      timeframe: '8 months',
      risk: 'Medium',
      participants: 24,
      fundingDeadline: '2024-04-01',
      projectedRevenue: 125000,
      estimatedMonthlyEarning: '$1,000-$3,000',
      status: 'active',
      featured: true,
      rating: 4.7,
      campaignBudget: 5000,
      campaignReach: '50k+'
    },
    {
      id: '4',
      title: 'Cryptocurrency Investment Masterclass',
      type: 'sponsoring',
      creator: 'Alex Turner',
      description: 'Advanced cryptocurrency investment strategies for serious investors.',
      category: 'Finance',
      commission: 20,
      commissionType: 'campaign_sales',
      minInvestment: 1000,
      expectedROI: '30-50%',
      timeframe: '10 months',
      risk: 'High',
      participants: 18,
      fundingDeadline: '2024-03-20',
      projectedRevenue: 200000,
      estimatedMonthlyEarning: '$1,500-$4,000',
      status: 'active',
      featured: false,
      rating: 4.6,
      campaignBudget: 8000,
      campaignReach: '75k+'
    },
    // Promo code opportunities
    {
      id: '5',
      title: 'Social Media Growth Toolkit',
      type: 'promo-codes',
      creator: 'Emma Wilson',
      description: 'Complete toolkit for growing your social media presence and engagement.',
      category: 'Social Media',
      commission: 10,
      commissionType: 'per_sale',
      minInvestment: 0,
      expectedROI: '10-20%',
      timeframe: '3 months',
      risk: 'Low',
      participants: 234,
      fundingDeadline: '2024-02-15',
      projectedRevenue: 28000,
      estimatedMonthlyEarning: '$200-$800',
      status: 'active',
      featured: false,
      rating: 4.5,
      totalSales: 3245,
      avgSalePrice: 87,
      buyerDiscount: 10,
      conversionRate: '15.2%'
    },
    {
      id: '6',
      title: 'Photography Business Starter Pack',
      type: 'promo-codes',
      creator: 'James Miller',
      description: 'Everything you need to start and grow a profitable photography business.',
      category: 'Photography',
      commission: 10,
      commissionType: 'per_sale',
      minInvestment: 0,
      expectedROI: '12-18%',
      timeframe: '4 months',
      risk: 'Low',
      participants: 167,
      fundingDeadline: '2024-03-01',
      projectedRevenue: 25000,
      estimatedMonthlyEarning: '$150-$600',
      status: 'active',
      featured: false,
      rating: 4.8,
      totalSales: 1876,
      avgSalePrice: 147,
      buyerDiscount: 10,
      conversionRate: '11.8%'
    },
    // License purchase opportunities
    {
      id: '7',
      title: 'Complete Web Development Course',
      type: 'license-purchase',
      creator: 'Sophie Laurent',
      description: 'Full-stack web development course with lifetime updates and support.',
      category: 'Programming',
      commission: '70/50',
      commissionType: 'license',
      minInvestment: 2500,
      expectedROI: '40-70%',
      timeframe: '12 months',
      risk: 'Medium',
      participants: 12,
      fundingDeadline: '2024-05-01',
      projectedRevenue: 150000,
      estimatedMonthlyEarning: '$2,000-$8,000',
      status: 'active',
      featured: true,
      rating: 4.9,
      totalSales: 456,
      avgSalePrice: 297,
      licensePrice: 2500,
      directCommission: 70,
      intermediaryCommission: 50
    },
    {
      id: '8',
      title: 'Digital Product Empire Builder',
      type: 'license-purchase',
      creator: 'Antoine Dubois',
      description: 'Complete system for building and scaling digital product businesses.',
      category: 'Business',
      commission: '70/50',
      commissionType: 'license',
      minInvestment: 4000,
      expectedROI: '50-80%',
      timeframe: '18 months',
      risk: 'Medium',
      participants: 8,
      fundingDeadline: '2024-06-01',
      projectedRevenue: 300000,
      estimatedMonthlyEarning: '$3,000-$12,000',
      status: 'active',
      featured: false,
      rating: 4.7,
      totalSales: 234,
      avgSalePrice: 497,
      licensePrice: 4000,
      directCommission: 70,
      intermediaryCommission: 50
    },
    // Premium opportunities
    {
      id: '9',
      title: 'Exclusive AI Startup Accelerator',
      type: 'premium-option',
      creator: 'Premium Partners',
      description: 'VIP access to exclusive AI startup opportunities and mentorship programs.',
      category: 'Startup',
      commission: 'Variable',
      commissionType: 'equity_revenue',
      minInvestment: 10000,
      expectedROI: '100-300%',
      timeframe: '24 months',
      risk: 'High',
      participants: 5,
      fundingDeadline: '2024-07-01',
      projectedRevenue: 1000000,
      estimatedMonthlyEarning: '$5,000-$20,000',
      status: 'active',
      featured: true,
      rating: 4.9
    }
  ];

  const portfolio: Portfolio[] = [
    {
      id: '1',
      productTitle: 'Digital Marketing Fundamentals',
      type: 'Affiliation',
      investmentType: 'affiliation',
      investedAmount: 0,
      currentValue: 650,
      returns: 650,
      returnsPercentage: 100,
      investmentDate: '2023-10-15',
      status: 'active',
      nextPayout: '2024-01-15',
      commissionStructure: '20% per sale'
    },
    {
      id: '2',
      productTitle: 'E-commerce Blueprint Campaign',
      type: 'Sponsoring',
      investmentType: 'sponsoring',
      investedAmount: 500,
      currentValue: 750,
      returns: 250,
      returnsPercentage: 50,
      investmentDate: '2023-11-20',
      status: 'active',
      nextPayout: '2024-01-20',
      commissionStructure: '20% campaign revenue'
    },
    {
      id: '3',
      productTitle: 'Social Media Toolkit Promo',
      type: 'Promo Code',
      investmentType: 'promo-codes',
      investedAmount: 0,
      currentValue: 120,
      returns: 120,
      returnsPercentage: 100,
      investmentDate: '2023-12-01',
      status: 'active',
      nextPayout: '2024-01-25',
      commissionStructure: '10% + 10% discount'
    },
    {
      id: '4',
      productTitle: 'Web Development Course License',
      type: 'License',
      investmentType: 'license-purchase',
      investedAmount: 2500,
      currentValue: 3200,
      returns: 700,
      returnsPercentage: 28,
      investmentDate: '2023-09-10',
      status: 'active',
      nextPayout: 'Monthly',
      commissionStructure: '70% direct, 50% indirect'
    }
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'commission',
      productTitle: 'Digital Marketing Course',
      amount: 150,
      date: '2024-01-10',
      status: 'completed',
      investmentType: 'affiliation'
    },
    {
      id: '2',
      type: 'return',
      productTitle: 'E-commerce Campaign',
      amount: 100,
      date: '2024-01-08',
      status: 'completed',
      investmentType: 'sponsoring'
    },
    {
      id: '3',
      type: 'investment',
      productTitle: 'Web Dev License',
      amount: 2500,
      date: '2024-01-05',
      status: 'completed',
      investmentType: 'license-purchase'
    },
    {
      id: '4',
      type: 'commission',
      productTitle: 'Social Media Toolkit',
      amount: 45,
      date: '2024-01-03',
      status: 'completed',
      investmentType: 'promo-codes'
    }
  ];

  const getTypeIcon = (type: string) => {
    const investmentType = investmentTypes.find(t => t.id === type);
    return investmentType ? investmentType.icon : BookOpen;
  };

  const getTypeColor = (type: string) => {
    const investmentType = investmentTypes.find(t => t.id === type);
    return investmentType ? investmentType.color : 'text-white';
  };

  const getTypeBgColor = (type: string) => {
    const investmentType = investmentTypes.find(t => t.id === type);
    return investmentType ? investmentType.bgColor : 'bg-white/10';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-green-400 bg-green-400/20';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'High':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-white/60 bg-white/10';
    }
  };

  const getFilteredOpportunities = () => {
    if (selectedInvestmentType === 'all') return investmentOpportunities;
    return investmentOpportunities.filter(opp => opp.type === selectedInvestmentType);
  };

  const handleStartInvestment = (opportunity: InvestmentOpportunity) => {
    setSelectedOpportunity(opportunity);
    setCurrentStep(1);
    setInvestmentData({});
    setShowInvestmentModal(true);
  };

  const getInvestmentSteps = (type: string) => {
    switch (type) {
      case 'affiliation':
        return [
          { title: 'Review Opportunity', description: 'Understand the product and commission structure' },
          { title: 'Choose Channels', description: 'Select your promotion channels and strategy' },
          { title: 'Generate Link', description: 'Get your unique affiliate tracking link' },
          { title: 'Start Promoting', description: 'Begin earning commissions from sales' }
        ];
      case 'sponsoring':
        return [
          { title: 'Campaign Details', description: 'Review the marketing campaign opportunity' },
          { title: 'Set Budget', description: 'Choose your sponsorship investment amount' },
          { title: 'Target Audience', description: 'Define your target market and reach' },
          { title: 'Launch Campaign', description: 'Payment and campaign activation' }
        ];
      case 'promo-codes':
        return [
          { title: 'Product Review', description: 'Understand the product and discount structure' },
          { title: 'Customize Code', description: 'Create your personalized promo code' },
          { title: 'Share Strategy', description: 'Plan your promotional approach' },
          { title: 'Activate Code', description: 'Generate and start sharing your code' }
        ];
      case 'license-purchase':
        return [
          { title: 'License Terms', description: 'Review license agreement and benefits' },
          { title: 'Package Selection', description: 'Choose your license tier and features' },
          { title: 'Payment Process', description: 'Complete the license purchase' },
          { title: 'License Activation', description: 'Access your licensed content and tools' }
        ];
      case 'premium-option':
        return [
          { title: 'Qualification', description: 'Verify eligibility for premium investments' },
          { title: 'Investment Amount', description: 'Select your investment level' },
          { title: 'Documentation', description: 'Complete legal and compliance forms' },
          { title: 'Final Approval', description: 'Review and finalize your premium investment' }
        ];
      default:
        return [];
    }
  };

  const renderStepContent = (step: number, type: string) => {
    const steps = getInvestmentSteps(type);
    const currentStepData = steps[step - 1];

    if (!currentStepData || !selectedOpportunity) return null;

    switch (type) {
      case 'affiliation':
        return renderAffiliationStep(step);
      case 'sponsoring':
        return renderSponsoringStep(step);
      case 'promo-codes':
        return renderPromoCodeStep(step);
      case 'license-purchase':
        return renderLicenseStep(step);
      case 'premium-option':
        return renderPremiumStep(step);
      default:
        return null;
    }
  };

  const renderAffiliationStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Commission Structure</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Commission Rate:</span>
                  <span className="text-green-400 font-medium ml-2">20% per sale</span>
                </div>
                <div>
                  <span className="text-white/60">Average Sale:</span>
                  <span className="text-white font-medium ml-2">${selectedOpportunity?.avgSalePrice}</span>
                </div>
                <div>
                  <span className="text-white/60">Estimated Monthly:</span>
                  <span className="text-primary font-medium ml-2">{selectedOpportunity?.estimatedMonthlyEarning}</span>
                </div>
                <div>
                  <span className="text-white/60">Conversion Rate:</span>
                  <span className="text-white font-medium ml-2">{selectedOpportunity?.conversionRate}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">What You'll Promote</h4>
              <p className="text-white/70 text-sm">{selectedOpportunity?.description}</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Choose Your Promotion Channels</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Social Media', icon: '📱', desc: 'Facebook, Instagram, Twitter' },
                { name: 'Blog/Website', icon: '🌐', desc: 'Your personal or business site' },
                { name: 'Email Marketing', icon: '📧', desc: 'Newsletter and email campaigns' },
                { name: 'YouTube/Video', icon: '🎥', desc: 'Video content and reviews' }
              ].map((channel) => (
                <label key={channel.name} className="flex items-center p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    className="mr-3"
                    onChange={(e) => {
                      const channels = investmentData.channels || [];
                      if (e.target.checked) {
                        setInvestmentData({...investmentData, channels: [...channels, channel.name]});
                      } else {
                        setInvestmentData({...investmentData, channels: channels.filter((c: string) => c !== channel.name)});
                      }
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span>{channel.icon}</span>
                      <span className="text-white font-medium">{channel.name}</span>
                    </div>
                    <p className="text-xs text-white/60">{channel.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Your Affiliate Link</h4>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60">Unique Tracking URL:</span>
                <button className="text-primary hover:text-primary/80 text-sm">Copy Link</button>
              </div>
              <div className="bg-black/30 rounded p-2 font-mono text-sm text-green-400">
                https://ayanbridge.com/ref/{selectedOpportunity?.id}?affiliate=user123
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-lg font-bold text-white">$39.40</div>
                <div className="text-xs text-white/60">Commission per sale</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-lg font-bold text-primary">Real-time</div>
                <div className="text-xs text-white/60">Tracking & analytics</div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="font-semibold text-white text-xl">You're All Set!</h4>
            <p className="text-white/70">Your affiliate account is active. Start sharing your link to earn commissions.</p>
            <div className="bg-white/5 rounded-lg p-4">
              <h5 className="font-medium text-white mb-2">Next Steps:</h5>
              <ul className="text-sm text-white/70 space-y-1 text-left">
                <li>• Share your affiliate link on selected channels</li>
                <li>• Track your performance in the dashboard</li>
                <li>• Payments processed monthly</li>
                <li>• Access marketing materials and support</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderSponsoringStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Campaign Overview</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Campaign Budget:</span>
                  <span className="text-white font-medium ml-2">${selectedOpportunity?.campaignBudget}</span>
                </div>
                <div>
                  <span className="text-white/60">Expected Reach:</span>
                  <span className="text-white font-medium ml-2">{selectedOpportunity?.campaignReach}</span>
                </div>
                <div>
                  <span className="text-white/60">Commission:</span>
                  <span className="text-green-400 font-medium ml-2">20% of campaign sales</span>
                </div>
                <div>
                  <span className="text-white/60">Duration:</span>
                  <span className="text-white font-medium ml-2">{selectedOpportunity?.timeframe}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Campaign Details</h4>
              <p className="text-white/70 text-sm">{selectedOpportunity?.description}</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Set Your Sponsorship Investment</h4>
            <div className="space-y-3">
              {[
                { amount: 500, title: 'Basic Sponsor', benefits: ['5% of campaign', 'Basic analytics', 'Email support'] },
                { amount: 1000, title: 'Premium Sponsor', benefits: ['10% of campaign', 'Advanced analytics', 'Priority support'] },
                { amount: 2500, title: 'Lead Sponsor', benefits: ['15% of campaign', 'Full analytics', 'Dedicated manager'] }
              ].map((tier) => (
                <label key={tier.amount} className="block">
                  <input
                    type="radio"
                    name="sponsorship"
                    value={tier.amount}
                    className="sr-only"
                    onChange={() => setInvestmentData({...investmentData, sponsorshipAmount: tier.amount})}
                  />
                  <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    investmentData.sponsorshipAmount === tier.amount 
                      ? 'border-primary bg-primary/10' 
                      : 'border-white/20 bg-white/5 hover:border-white/30'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-white">{tier.title}</div>
                        <div className="text-2xl font-bold text-primary">${tier.amount}</div>
                      </div>
                    </div>
                    <ul className="text-sm text-white/70 space-y-1">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Define Target Audience</h4>
            <div className="grid grid-cols-2 gap-4">
                             <div>
                 <label className="block text-sm font-medium text-white mb-2">Age Range</label>
                 <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white" aria-label="Select age range">
                   <option>18-25</option>
                   <option>26-35</option>
                   <option>36-45</option>
                   <option>46+</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-white mb-2">Interests</label>
                 <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white" aria-label="Select interests">
                   <option>Technology</option>
                   <option>Business</option>
                   <option>Marketing</option>
                   <option>Finance</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-white mb-2">Geographic Focus</label>
                 <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white" aria-label="Select geographic focus">
                   <option>Global</option>
                   <option>North America</option>
                   <option>Europe</option>
                   <option>Other</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-white mb-2">Campaign Duration</label>
                 <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white" aria-label="Select campaign duration">
                   <option>1 month</option>
                   <option>3 months</option>
                   <option>6 months</option>
                   <option>12 months</option>
                 </select>
               </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="font-semibold text-white text-xl">Campaign Ready to Launch!</h4>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Investment:</span>
                  <span className="text-white font-medium ml-2">${investmentData.sponsorshipAmount}</span>
                </div>
                <div>
                  <span className="text-white/60">Expected ROI:</span>
                  <span className="text-green-400 font-medium ml-2">{selectedOpportunity?.expectedROI}</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium">
              Complete Payment & Launch
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderPromoCodeStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Promo Code Benefits</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Your Commission:</span>
                  <span className="text-green-400 font-medium ml-2">10% per sale</span>
                </div>
                <div>
                  <span className="text-white/60">Customer Discount:</span>
                  <span className="text-blue-400 font-medium ml-2">10% off purchase</span>
                </div>
                <div>
                  <span className="text-white/60">Product Price:</span>
                  <span className="text-white font-medium ml-2">${selectedOpportunity?.avgSalePrice}</span>
                </div>
                <div>
                  <span className="text-white/60">Commission per Sale:</span>
                  <span className="text-primary font-medium ml-2">${(selectedOpportunity?.avgSalePrice || 0) * 0.1}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Product Overview</h4>
              <p className="text-white/70 text-sm">{selectedOpportunity?.description}</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Create Your Promo Code</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Promo Code Name</label>
                <input
                  type="text"
                  placeholder="e.g., SAVE10USER"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50"
                  value={investmentData.promoCode || ''}
                  onChange={(e) => setInvestmentData({...investmentData, promoCode: e.target.value})}
                />
                <p className="text-xs text-white/60 mt-1">Must be unique and 6-12 characters</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h5 className="font-medium text-white mb-2">Code Preview</h5>
                <div className="bg-primary/20 border border-primary/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-primary">{investmentData.promoCode || 'YOUR-CODE'}</div>
                  <div className="text-sm text-white/70">10% off {selectedOpportunity?.title}</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Choose Sharing Strategy</h4>
            <div className="grid grid-cols-1 gap-3">
              {[
                { platform: 'Social Media Posts', desc: 'Share on Facebook, Instagram, Twitter', icon: '📱' },
                { platform: 'Stories & Reels', desc: 'Instagram stories and TikTok videos', icon: '📸' },
                { platform: 'Email Signature', desc: 'Add to your email communications', icon: '📧' },
                { platform: 'Blog/Website', desc: 'Feature on your website or blog', icon: '🌐' }
              ].map((strategy) => (
                <label key={strategy.platform} className="flex items-center p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    className="mr-3"
                    onChange={(e) => {
                      const strategies = investmentData.strategies || [];
                      if (e.target.checked) {
                        setInvestmentData({...investmentData, strategies: [...strategies, strategy.platform]});
                      } else {
                        setInvestmentData({...investmentData, strategies: strategies.filter((s: string) => s !== strategy.platform)});
                      }
                    }}
                  />
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{strategy.icon}</span>
                    <div>
                      <div className="font-medium text-white">{strategy.platform}</div>
                      <div className="text-sm text-white/60">{strategy.desc}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="font-semibold text-white text-xl">Promo Code Activated!</h4>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="bg-primary/20 border border-primary/30 rounded-lg p-4 mb-4">
                <div className="text-2xl font-bold text-primary">{investmentData.promoCode}</div>
                <div className="text-sm text-white/70">10% off + 10% commission for you</div>
              </div>
              <div className="text-sm text-white/70 text-left">
                <h5 className="font-medium text-white mb-2">How to use:</h5>
                <ul className="space-y-1">
                  <li>• Share your code: {investmentData.promoCode}</li>
                  <li>• Track usage in your dashboard</li>
                  <li>• Earn commission on each sale</li>
                  <li>• Get marketing materials and support</li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderLicenseStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">License Agreement</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Direct Sales Commission:</span>
                  <span className="text-green-400 font-medium ml-2">70%</span>
                </div>
                <div>
                  <span className="text-white/60">Indirect Sales Commission:</span>
                  <span className="text-green-400 font-medium ml-2">50%</span>
                </div>
                <div>
                  <span className="text-white/60">License Duration:</span>
                  <span className="text-white font-medium ml-2">Lifetime</span>
                </div>
                <div>
                  <span className="text-white/60">Updates Included:</span>
                  <span className="text-white font-medium ml-2">All future versions</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">What's Included</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Full resale rights to the product</li>
                <li>• Marketing materials and assets</li>
                <li>• Customer support infrastructure</li>
                <li>• Payment processing system</li>
                <li>• Analytics and reporting tools</li>
                <li>• Affiliate network access</li>
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Choose License Package</h4>
            <div className="space-y-3">
              {[
                { 
                  type: 'Basic License', 
                  price: 2500, 
                  features: ['Resale rights', 'Basic support', 'Standard materials'] 
                },
                { 
                  type: 'Premium License', 
                  price: 5000, 
                  features: ['Resale rights', 'Priority support', 'Premium materials', 'Custom branding'] 
                },
                { 
                  type: 'Master License', 
                  price: 10000, 
                  features: ['Resale rights', 'Dedicated support', 'All materials', 'Custom branding', 'Sublicensing rights'] 
                }
              ].map((license) => (
                <label key={license.type} className="block">
                  <input
                    type="radio"
                    name="license"
                    value={license.price}
                    className="sr-only"
                    onChange={() => setInvestmentData({...investmentData, licenseType: license.type, licensePrice: license.price})}
                  />
                  <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    investmentData.licensePrice === license.price 
                      ? 'border-primary bg-primary/10' 
                      : 'border-white/20 bg-white/5 hover:border-white/30'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-white">{license.type}</div>
                        <div className="text-2xl font-bold text-primary">${license.price}</div>
                      </div>
                    </div>
                    <ul className="text-sm text-white/70 space-y-1">
                      {license.features.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Payment Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Billing Zip</label>
                <input
                  type="text"
                  placeholder="12345"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50"
                />
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-white/60">Total Amount:</span>
                <span className="text-2xl font-bold text-primary">${investmentData.licensePrice}</span>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="font-semibold text-white text-xl">License Activated!</h4>
            <div className="bg-white/5 rounded-lg p-4">
              <h5 className="font-medium text-white mb-2">Your License Details:</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>License Type: {investmentData.licenseType}</div>
                <div>Investment: ${investmentData.licensePrice}</div>
                <div>Direct Commission: 70%</div>
                <div>Indirect Commission: 50%</div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-left">
              <h5 className="font-medium text-white mb-2">Next Steps:</h5>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Access your license dashboard</li>
                <li>• Download marketing materials</li>
                <li>• Set up your sales funnel</li>
                <li>• Start earning 70% commissions</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderPremiumStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary/20 to-yellow-400/20 rounded-lg p-4 border border-primary/30">
              <h4 className="font-semibold text-white mb-2">Premium Investment Opportunity</h4>
              <p className="text-white/80 text-sm">Exclusive access to high-value investments with variable returns and VIP benefits.</p>
            </div>
            <div className="space-y-3">
              <h5 className="font-medium text-white">Qualification Requirements:</h5>
              {[
                { requirement: 'Minimum investment capacity of $10,000', met: true },
                { requirement: 'Previous investment experience', met: true },
                { requirement: 'Identity verification completed', met: false },
                { requirement: 'Risk assessment completed', met: false }
              ].map((req, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${req.met ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {req.met ? '✓' : '!'}
                  </div>
                  <span className="text-white/80 text-sm">{req.requirement}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Select Investment Level</h4>
            <div className="space-y-3">
              {[
                { level: 'Gold Tier', amount: 10000, returns: '100-200%', benefits: ['Priority access', 'Quarterly reports', 'Email support'] },
                { level: 'Platinum Tier', amount: 25000, returns: '150-300%', benefits: ['Early access', 'Monthly reports', 'Phone support', 'Exclusive events'] },
                { level: 'Diamond Tier', amount: 50000, returns: '200-400%', benefits: ['First access', 'Weekly reports', 'Dedicated manager', 'Private events', 'Co-investment opportunities'] }
              ].map((tier) => (
                <label key={tier.level} className="block">
                  <input
                    type="radio"
                    name="premiumTier"
                    value={tier.amount}
                    className="sr-only"
                    onChange={() => setInvestmentData({...investmentData, premiumTier: tier.level, premiumAmount: tier.amount})}
                  />
                  <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    investmentData.premiumAmount === tier.amount 
                      ? 'border-primary bg-primary/10' 
                      : 'border-white/20 bg-white/5 hover:border-white/30'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-white">{tier.level}</div>
                        <div className="text-2xl font-bold text-primary">${tier.amount.toLocaleString()}</div>
                        <div className="text-sm text-green-400">Expected: {tier.returns}</div>
                      </div>
                    </div>
                    <ul className="text-sm text-white/70 space-y-1">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Legal Documentation</h4>
            <div className="space-y-3">
              {[
                { doc: 'Investment Agreement', desc: 'Terms and conditions of the premium investment', status: 'pending' },
                { doc: 'Risk Disclosure', desc: 'Important information about investment risks', status: 'pending' },
                { doc: 'Privacy Policy', desc: 'How your information will be used and protected', status: 'pending' },
                { doc: 'Anti-Money Laundering', desc: 'Compliance verification and documentation', status: 'pending' }
              ].map((doc) => (
                <div key={doc.doc} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{doc.doc}</div>
                    <div className="text-sm text-white/60">{doc.desc}</div>
                  </div>
                                     <div className="flex items-center gap-2">
                     <button className="text-primary hover:text-primary/80 text-sm">Review</button>
                     <label>
                       <input type="checkbox" className="text-primary" aria-label={`Accept ${doc.doc}`} />
                       <span className="sr-only">Accept {doc.doc}</span>
                     </label>
                   </div>
                </div>
              ))}
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">⚠️</span>
                <span className="font-medium text-white">Important Notice</span>
              </div>
              <p className="text-sm text-white/80">All documentation must be reviewed and accepted before proceeding with the premium investment.</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Crown className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-semibold text-white text-xl">Premium Investment Approved!</h4>
            <div className="bg-gradient-to-r from-primary/20 to-yellow-400/20 rounded-lg p-4 border border-primary/30">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Investment Tier:</span>
                  <span className="text-white font-medium ml-2">{investmentData.premiumTier}</span>
                </div>
                <div>
                  <span className="text-white/60">Amount:</span>
                  <span className="text-primary font-medium ml-2">${investmentData.premiumAmount?.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-white/60">Expected Returns:</span>
                  <span className="text-green-400 font-medium ml-2">200-400%</span>
                </div>
                <div>
                  <span className="text-white/60">Timeline:</span>
                  <span className="text-white font-medium ml-2">24 months</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-left">
              <h5 className="font-medium text-white mb-2">VIP Benefits Activated:</h5>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Dedicated investment manager assigned</li>
                <li>• Access to exclusive opportunities</li>
                <li>• Priority customer support</li>
                <li>• Invitations to private events</li>
                <li>• Detailed performance reporting</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const InvestmentModal = () => {
    if (!showInvestmentModal || !selectedOpportunity) return null;

    const steps = getInvestmentSteps(selectedOpportunity.type);
    const maxSteps = steps.length;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-secondary rounded-2xl max-w-4xl w-full border border-white/10 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">{selectedOpportunity.title}</h3>
              <button
                onClick={() => setShowInvestmentModal(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 < currentStep ? 'bg-green-500 text-white' :
                    index + 1 === currentStep ? 'bg-primary text-white' :
                    'bg-white/20 text-white/60'
                  }`}>
                    {index + 1 < currentStep ? '✓' : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      index + 1 < currentStep ? 'bg-green-500' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold text-white">{steps[currentStep - 1]?.title}</h4>
              <p className="text-white/60 text-sm">{steps[currentStep - 1]?.description}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {renderStepContent(currentStep, selectedOpportunity.type)}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex gap-2">
              {currentStep < maxSteps ? (
                <button
                  onClick={() => setCurrentStep(Math.min(maxSteps, currentStep + 1))}
                  className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowInvestmentModal(false);
                    setCurrentStep(1);
                    setInvestmentData({});
                  }}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const OpportunitiesTab = () => (
    <div className="space-y-6">
      {/* Investment Type Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setSelectedInvestmentType('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            selectedInvestmentType === 'all'
              ? 'bg-primary text-white'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          All Types
        </button>
        {investmentTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedInvestmentType(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedInvestmentType === type.id
                  ? `${type.bgColor} ${type.color} border ${type.borderColor}`
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {type.name}
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search investment opportunities..."
              className="w-full pl-10 pr-4 py-2 bg-secondary-light border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <select className="bg-secondary-light border border-white/20 rounded-lg px-4 py-2 text-white text-sm" aria-label="Filter by risk">
          <option>All Risk Levels</option>
          <option>Low Risk</option>
          <option>Medium Risk</option>
          <option>High Risk</option>
        </select>
      </div>

      {/* Featured Opportunities */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Featured Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getFilteredOpportunities().filter(opp => opp.featured).map((opportunity) => {
            const IconComponent = getTypeIcon(opportunity.type);
            return (
              <div key={opportunity.id} className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 ${getTypeBgColor(opportunity.type)} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-5 h-5 ${getTypeColor(opportunity.type)}`} />
                    </div>
                    <div>
                      <span className={`text-xs font-medium uppercase ${getTypeColor(opportunity.type)}`}>
                        {investmentTypes.find(t => t.id === opportunity.type)?.name}
                      </span>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskColor(opportunity.risk)}`}>
                          {opportunity.risk} Risk
                        </span>
                        <span className="text-xs text-primary bg-primary/20 px-2 py-1 rounded-full font-medium">
                          {opportunity.expectedROI} ROI
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors" aria-label="Add to watchlist">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                  {opportunity.title}
                </h4>
                
                <p className="text-sm text-white/60 mb-1">by {opportunity.creator}</p>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">{opportunity.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                    <div>
                      <span className="block">Commission Rate</span>
                      <span className={`font-medium ${getTypeColor(opportunity.type)}`}>
                        {typeof opportunity.commission === 'number' ? `${opportunity.commission}%` : opportunity.commission}
                      </span>
                    </div>
                    <div>
                      <span className="block">Min. Investment</span>
                      <span className="text-white font-medium">
                        {opportunity.minInvestment === 0 ? 'Free' : `$${opportunity.minInvestment}`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                    <div>
                      <span className="block">Participants</span>
                      <span className="text-white font-medium">{opportunity.participants}</span>
                    </div>
                    <div>
                      <span className="block">Est. Monthly</span>
                      <span className="text-green-400 font-medium">{opportunity.estimatedMonthlyEarning}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium transition-colors"
                    onClick={() => handleStartInvestment(opportunity)}
                  >
                    Start Earning
                  </button>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" aria-label="View details">
                    <Eye className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Opportunities */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">All Investment Opportunities</h3>
        <div className="space-y-4">
          {getFilteredOpportunities().map((opportunity) => {
            const IconComponent = getTypeIcon(opportunity.type);
            return (
              <div key={opportunity.id} className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div className={`w-12 h-12 ${getTypeBgColor(opportunity.type)} rounded-lg flex items-center justify-center mr-4`}>
                  <IconComponent className={`w-6 h-6 ${getTypeColor(opportunity.type)}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-white">{opportunity.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskColor(opportunity.risk)}`}>
                      {opportunity.risk}
                    </span>
                    {opportunity.status === 'funded' && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">
                        Funded
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/60 mb-2">
                    by {opportunity.creator} • {opportunity.category} • {investmentTypes.find(t => t.id === opportunity.type)?.name}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-white/50">
                    <span>Commission: {typeof opportunity.commission === 'number' ? `${opportunity.commission}%` : opportunity.commission}</span>
                    <span>{opportunity.expectedROI} ROI</span>
                    <span>{opportunity.participants} participants</span>
                    <span>Min. {opportunity.minInvestment === 0 ? 'Free' : `$${opportunity.minInvestment}`}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-green-400 mb-1">{opportunity.expectedROI}</div>
                  <div className="text-sm text-white/60">{opportunity.timeframe}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const PortfolioTab = () => (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Total Invested</h3>
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <div className="text-2xl font-bold text-white">$3,000</div>
          <p className="text-sm text-white/60">Across {portfolio.length} investments</p>
        </div>

        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Current Value</h3>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">$4,720</div>
          <div className="flex items-center space-x-1">
            <ArrowUpRight className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">+57.3%</span>
          </div>
        </div>

        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Total Returns</h3>
            <DollarSign className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white">$1,720</div>
          <p className="text-sm text-white/60">+$350 this month</p>
        </div>

        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Active Investments</h3>
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{portfolio.filter(p => p.status === 'active').length}</div>
          <p className="text-sm text-white/60">Generating returns</p>
        </div>
      </div>

      {/* Investment Distribution by Type */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Investment Distribution by Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {investmentTypes.map((type) => {
            const IconComponent = type.icon;
            const count = portfolio.filter(p => p.investmentType === type.id).length;
            return (
              <div key={type.id} className={`${type.bgColor} border ${type.borderColor} rounded-lg p-4 text-center`}>
                <IconComponent className={`w-8 h-8 ${type.color} mx-auto mb-2`} />
                <div className="text-sm font-medium text-white">{type.name}</div>
                <div className={`text-lg font-bold ${type.color}`}>{count}</div>
                <div className="text-xs text-white/60">{type.commission}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Portfolio Breakdown */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Your Investments</h3>
        <div className="space-y-4">
          {portfolio.map((investment) => {
            const IconComponent = getTypeIcon(investment.investmentType);
            return (
              <div key={investment.id} className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div className={`w-12 h-12 ${getTypeBgColor(investment.investmentType)} rounded-lg flex items-center justify-center mr-4`}>
                  <IconComponent className={`w-6 h-6 ${getTypeColor(investment.investmentType)}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-white">{investment.productTitle}</h4>
                    <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                      {investment.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      investment.status === 'active' ? 'text-green-400 bg-green-400/20' :
                      investment.status === 'completed' ? 'text-blue-400 bg-blue-400/20' :
                      'text-yellow-400 bg-yellow-400/20'
                    }`}>
                      {investment.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-white/50">
                    <span>Invested: ${investment.investedAmount}</span>
                    <span>Current: ${investment.currentValue}</span>
                    <span>Returns: ${investment.returns}</span>
                    <span>Structure: {investment.commissionStructure}</span>
                    <span>Next Payout: {investment.nextPayout}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-lg font-bold mb-1 ${
                    investment.returnsPercentage > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {investment.returnsPercentage > 0 ? '+' : ''}{investment.returnsPercentage}%
                  </div>
                  <div className="text-sm text-white/60">
                    Since {new Date(investment.investmentDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      {/* Investment Type Performance */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Performance by Investment Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {investmentTypes.map((type) => {
            const IconComponent = type.icon;
            // Mock performance data
                         const performance = {
               'affiliation': { roi: '22%', earnings: '$770', count: 2 },
               'sponsoring': { roi: '30%', earnings: '$350', count: 1 },
               'promo-codes': { roi: '15%', earnings: '$120', count: 1 },
               'license-purchase': { roi: '28%', earnings: '$700', count: 1 },
               'premium-option': { roi: '0%', earnings: '$0', count: 0 }
             };
                         const perf = performance[type.id as keyof typeof performance] || { roi: '0%', earnings: '$0', count: 0 };
            
            return (
              <div key={type.id} className={`${type.bgColor} border ${type.borderColor} rounded-lg p-4 text-center`}>
                <IconComponent className={`w-10 h-10 ${type.color} mx-auto mb-3`} />
                <h4 className="font-semibold text-white mb-2">{type.name}</h4>
                <div className={`text-2xl font-bold ${type.color} mb-1`}>{perf.roi}</div>
                <div className="text-sm text-white/70 mb-1">ROI</div>
                <div className="text-white font-medium">{perf.earnings}</div>
                <div className="text-xs text-white/60">{perf.count} active</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Portfolio Performance</h3>
          <div className="h-48 bg-white/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-white/40 mx-auto mb-2" />
              <p className="text-white/60">Performance chart visualization</p>
              <p className="text-sm text-green-400 mt-2">+57.3% Total Return</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Investment Distribution</h3>
          <div className="h-48 bg-white/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-white/40 mx-auto mb-2" />
              <p className="text-white/60">Distribution pie chart</p>
              <p className="text-sm text-primary mt-2">Diversified Portfolio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Investment Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">85%</div>
            <p className="text-sm text-white/60">Success Rate</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">24.8%</div>
            <p className="text-sm text-white/60">Avg. ROI</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">7.2</div>
            <p className="text-sm text-white/60">Avg. Months</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-8 h-8 text-yellow-400" />
            </div>
                         <div className="text-2xl font-bold text-white mb-1">$1,940</div>
            <p className="text-sm text-white/60">Monthly Avg.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const TransactionsTab = () => (
    <div className="space-y-6">
      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Commission Earned</h3>
            <ArrowDownRight className="w-5 h-5 text-green-400" />
          </div>
                     <div className="text-2xl font-bold text-green-400">$1,720</div>
          <p className="text-sm text-white/60">Total commissions</p>
        </div>

        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Investments Made</h3>
            <ArrowUpRight className="w-5 h-5 text-blue-400" />
          </div>
                     <div className="text-2xl font-bold text-blue-400">$3,000</div>
          <p className="text-sm text-white/60">Total invested</p>
        </div>

        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">This Month</h3>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
                     <div className="text-2xl font-bold text-primary">$295</div>
          <p className="text-sm text-white/60">Monthly earnings</p>
        </div>

        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Pending</h3>
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
                     <div className="text-2xl font-bold text-yellow-400">$45</div>
          <p className="text-sm text-white/60">Processing</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const IconComponent = getTypeIcon(transaction.investmentType);
            return (
              <div key={transaction.id} className="flex items-center p-4 bg-white/5 rounded-lg">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                  transaction.type === 'investment' ? 'bg-blue-500/20' :
                  transaction.type === 'commission' || transaction.type === 'return' ? 'bg-green-500/20' :
                  'bg-yellow-500/20'
                }`}>
                  {transaction.type === 'investment' && <ArrowUpRight className="w-5 h-5 text-blue-400" />}
                  {(transaction.type === 'commission' || transaction.type === 'return') && <ArrowDownRight className="w-5 h-5 text-green-400" />}
                  {transaction.type === 'withdrawal' && <DollarSign className="w-5 h-5 text-yellow-400" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent className={`w-4 h-4 ${getTypeColor(transaction.investmentType)}`} />
                    <h4 className="font-semibold text-white">
                      {transaction.type === 'investment' ? 'Investment' :
                       transaction.type === 'commission' ? 'Commission' :
                       transaction.type === 'return' ? 'Return Payment' : 'Withdrawal'}
                    </h4>
                    <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                      {investmentTypes.find(t => t.id === transaction.investmentType)?.name}
                    </span>
                  </div>
                  <p className="text-sm text-white/60">{transaction.productTitle}</p>
                  <p className="text-xs text-white/50">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>

                <div className="text-right">
                  <div className={`font-bold ${
                    transaction.type === 'investment' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {transaction.type === 'investment' ? '-' : '+'}${transaction.amount}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    transaction.status === 'completed' ? 'text-green-400 bg-green-400/20' :
                    transaction.status === 'pending' ? 'text-yellow-400 bg-yellow-400/20' :
                    'text-red-400 bg-red-400/20'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'opportunities', label: 'Opportunities', icon: Target },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'transactions', label: 'Transactions', icon: DollarSign }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Investment Club</h1>
        <p className="text-white/70">Choose from 5 different investment types to earn with digital products</p>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-secondary-light rounded-lg p-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'opportunities' && <OpportunitiesTab />}
        {activeTab === 'portfolio' && <PortfolioTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'transactions' && <TransactionsTab />}
      </div>

      {/* Investment Modal */}
      <InvestmentModal />
    </div>
  );
};

export default ClubInvest; 