import { useState, useEffect } from 'react';
import { Bell, TrendingUp, Target, Zap, Eye, Star, AlertTriangle, CheckCircle, ArrowRight, Filter, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  timestamp: string;
  relevanceScore: number;
  affectedStocks: string[];
  source: string;
  isAlert: boolean;
}

interface StockRecommendation {
  symbol: string;
  name: string;
  price: string;
  change: string;
  recommendation: 'buy' | 'sell' | 'hold' | 'monitor';
  confidence: number;
  reasoning: string;
  newsImpact: string;
}

const mockNewsData: NewsItem[] = [
  {
    id: '1',
    title: 'Fed Signals Aggressive Rate Cuts Following Economic Data',
    summary: 'Federal Reserve Chair hints at accelerated monetary easing based on latest employment figures and inflation trends affecting your tech portfolio holdings.',
    impact: 'high',
    category: 'Monetary Policy',
    timestamp: '2 min ago',
    relevanceScore: 98,
    affectedStocks: ['AAPL', 'NVDA', 'MSFT'],
    source: 'Reuters',
    isAlert: true
  },
  {
    id: '2',
    title: 'China Semiconductor Breakthrough Impacts Global Tech Supply',
    summary: 'Major advancement in chip manufacturing could disrupt your semiconductor positions. AI analysis suggests immediate portfolio review recommended.',
    impact: 'high',
    category: 'Technology',
    timestamp: '15 min ago',
    relevanceScore: 92,
    affectedStocks: ['TSM', 'NVDA', '0700.HK'],
    source: 'Financial Times',
    isAlert: true
  },
  {
    id: '3',
    title: 'ESG Investment Surge Creates New Opportunities',
    summary: 'Sustainable investing trends align with your profile preferences. AI identifies 3 high-potential ESG stocks matching your risk tolerance.',
    impact: 'medium',
    category: 'ESG',
    timestamp: '1 hour ago',
    relevanceScore: 78,
    affectedStocks: ['TSLA', 'NEE'],
    source: 'Bloomberg',
    isAlert: false
  }
];

const mockStockRecommendations: StockRecommendation[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: '$486.21',
    change: '+5.7%',
    recommendation: 'buy',
    confidence: 94,
    reasoning: 'AI chip demand surge + Fed rate cuts create perfect storm',
    newsImpact: 'Semiconductor breakthrough news'
  },
  {
    symbol: '0700.HK',
    name: 'Tencent Holdings',
    price: 'HK$312.40',
    change: '+1.8%',
    recommendation: 'monitor',
    confidence: 71,
    reasoning: 'China tech regulations stabilizing, gaming recovery ahead',
    newsImpact: 'China policy updates'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: '$248.50',
    change: '+3.2%',
    recommendation: 'hold',
    confidence: 82,
    reasoning: 'ESG momentum + production milestones align with sustainability trends',
    newsImpact: 'ESG investment surge'
  }
];

export const NewsAIAgent = () => {
  const [activeAlerts, setActiveAlerts] = useState(2);
  const [personalizedNews, setPersonalizedNews] = useState(mockNewsData);
  const [recommendations, setRecommendations] = useState(mockStockRecommendations);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [curationLevel, setCurationLevel] = useState('aggressive');

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'buy': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'sell': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'hold': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'monitor': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          News AI Agent
        </h2>
        <p className="text-muted-foreground">Personalized financial intelligence powered by AI</p>
      </div>

      {/* AI Status & Controls */}
      <Card className="glass-panel p-4 sm:p-6 rounded-2xl w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Zap className="w-8 h-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-semibold">AI Agent Active</h3>
              <p className="text-sm text-muted-foreground">Monitoring 847 sources • Last update: 30 seconds ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="text-sm">Alerts</span>
              <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>
      </Card>

      {/* Real-Time Alerts */}
      {alertsEnabled && activeAlerts > 0 && (
        <Card className="glass-panel p-4 sm:p-6 rounded-2xl w-full border-yellow-500/20 bg-yellow-500/5">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-semibold">Real-Time Alerts</h3>
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-700">
              {activeAlerts} Active
            </Badge>
          </div>
          <div className="space-y-3">
            {personalizedNews.filter(news => news.isAlert).map(alert => (
              <div key={alert.id} className="p-3 bg-background/50 rounded-lg border border-yellow-500/20">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{alert.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{alert.summary}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-xs ${getImpactColor(alert.impact)}`}>
                        {alert.impact.toUpperCase()} IMPACT
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Personalized News Curation */}
      <Card className="glass-panel p-4 sm:p-6 rounded-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" />
            <h3 className="text-lg sm:text-xl font-semibold">Personalized News Feed</h3>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <select className="text-sm bg-transparent border border-muted rounded-md px-2 py-1">
              <option value="aggressive">Aggressive Curation</option>
              <option value="balanced">Balanced</option>
              <option value="conservative">Conservative</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {personalizedNews.map(news => (
            <div key={news.id} className="p-4 glass-panel rounded-xl hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={`text-xs ${getImpactColor(news.impact)}`}>
                      {news.impact.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {news.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{news.source}</span>
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">{news.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{news.relevanceScore}% match</span>
                      <Progress value={news.relevanceScore} className="w-16 h-2" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">Affects:</span>
                      {news.affectedStocks.map(stock => (
                        <Badge key={stock} variant="outline" className="text-xs">
                          {stock}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {news.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Stock Recommendations */}
      <Card className="glass-panel p-4 sm:p-6 rounded-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h3 className="text-lg sm:text-xl font-semibold">AI Stock Recommendations</h3>
          </div>
          <Button variant="outline" size="sm">
            View All Analysis <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid gap-4">
          {recommendations.map(stock => (
            <div key={stock.symbol} className="p-4 glass-panel rounded-xl hover:shadow-lg transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div>
                      <h4 className="font-bold">{stock.symbol}</h4>
                      <p className="text-sm text-muted-foreground">{stock.name}</p>
                    </div>
                    <Badge className={`${getRecommendationColor(stock.recommendation)} capitalize`}>
                      {stock.recommendation}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{stock.confidence}%</span>
                      <Progress value={stock.confidence} className="w-12 h-2" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{stock.reasoning}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Related to: {stock.newsImpact}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{stock.price}</div>
                  <div className={`text-sm font-medium ${stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.change}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="font-semibold">AI Confidence Level: High</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Based on your portfolio analysis, risk tolerance, and 847 real-time data sources, 
            these recommendations have a 89% historical accuracy rate. Market conditions favor 
            technology and semiconductor sectors for the next 2-4 weeks.
          </p>
        </div>
      </Card>
    </div>
  );
};