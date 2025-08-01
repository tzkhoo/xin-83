import { useState } from 'react';
import { Sparkles, TrendingUp, Heart, MessageCircle, Share, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NewsReel {
  id: string;
  title: string;
  summary: string;
  impact: 'high' | 'medium' | 'low';
  thumbnail: string;
  timestamp: string;
  likes: number;
  comments: number;
  affectedStocks: string[];
  aiConfidence: number;
}

interface StockSuggestion {
  symbol: string;
  name: string;
  price: string;
  change: string;
  trend: 'up' | 'down';
  aiRecommendation: string;
}

const newsReels: NewsReel[] = [
  {
    id: '1',
    title: 'Fed Rate Cut Signals',
    summary: 'Federal Reserve hints at aggressive monetary easing affecting your tech holdings',
    impact: 'high',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop&crop=center',
    timestamp: '2m ago',
    likes: 2847,
    comments: 189,
    affectedStocks: ['AAPL', 'NVDA', 'MSFT'],
    aiConfidence: 94
  },
  {
    id: '2',
    title: 'China Tech Breakthrough',
    summary: 'Semiconductor advancement impacts global supply chains and your positions',
    impact: 'high',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop&crop=center',
    timestamp: '15m ago',
    likes: 1923,
    comments: 234,
    affectedStocks: ['TSM', 'NVDA', '0700.HK'],
    aiConfidence: 87
  },
  {
    id: '3',
    title: 'ESG Investment Surge',
    summary: 'Sustainable investing trends create new opportunities matching your profile',
    impact: 'medium',
    thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=600&fit=crop&crop=center',
    timestamp: '1h ago',
    likes: 1456,
    comments: 98,
    affectedStocks: ['TSLA', 'NEE'],
    aiConfidence: 78
  }
];

const stockSuggestions: StockSuggestion[] = [
  { 
    symbol: 'NVDA', 
    name: 'NVIDIA', 
    price: '$486.21', 
    change: '+5.7%', 
    trend: 'up',
    aiRecommendation: 'Strong Buy'
  },
  { 
    symbol: '0700.HK', 
    name: 'Tencent', 
    price: 'HK$312.40', 
    change: '+1.8%', 
    trend: 'up',
    aiRecommendation: 'Monitor'
  },
  { 
    symbol: 'TSLA', 
    name: 'Tesla', 
    price: '$248.50', 
    change: '+3.2%', 
    trend: 'up',
    aiRecommendation: 'Hold'
  },
  { 
    symbol: 'AAPL', 
    name: 'Apple', 
    price: '$175.84', 
    change: '+2.4%', 
    trend: 'up',
    aiRecommendation: 'Buy'
  }
];

export const NewsAIAgent = () => {
  const [currentReel, setCurrentReel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNews, setHasNews] = useState(false);

  const handleFindNews = async () => {
    setIsLoading(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setHasNews(true);
    setIsLoading(false);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'Strong Buy': return 'bg-green-500/20 text-green-400';
      case 'Buy': return 'bg-green-500/15 text-green-400';
      case 'Hold': return 'bg-blue-500/20 text-blue-400';
      case 'Monitor': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  if (!hasNews) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-24 h-24">
            <Sparkles className="w-24 h-24 text-primary animate-pulse" />
            <div className="absolute inset-0 animate-ping">
              <Sparkles className="w-24 h-24 text-primary/30" />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI News Agent
          </h2>
          <p className="text-muted-foreground">
            Get personalized financial news curated for your portfolio
          </p>
        </div>

        <Button 
          onClick={handleFindNews}
          disabled={isLoading}
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              AI is analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Find me personalized news
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Your AI News Feed
      </h2>
      
      {/* Reels Container */}
      <div className="relative">
        <div className="aspect-[9/16] max-h-[600px] bg-black rounded-2xl overflow-hidden relative group">
          {/* Navigation Areas */}
          <div className="absolute inset-0 z-20 flex">
            <button 
              className="w-1/3 h-full flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity"
              onClick={() => setCurrentReel(currentReel > 0 ? currentReel - 1 : newsReels.length - 1)}
            >
              <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <ChevronLeft className="w-5 h-5 text-white" />
              </div>
            </button>
            <div className="w-1/3 h-full"></div>
            <button 
              className="w-1/3 h-full flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity"
              onClick={() => setCurrentReel(currentReel < newsReels.length - 1 ? currentReel + 1 : 0)}
            >
              <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </button>
          </div>
          
          {/* News Content */}
          <img
            src={newsReels[currentReel].thumbnail}
            alt={newsReels[currentReel].title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback image in case of loading error
              e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop&crop=center';
            }}
            style={{ minHeight: '100%', minWidth: '100%' }}
          />
          
          {/* AI Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
              AI {newsReels[currentReel].aiConfidence}%
            </Badge>
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`text-xs ${getImpactColor(newsReels[currentReel].impact)}`}>
                {newsReels[currentReel].impact.toUpperCase()}
              </Badge>
              <span className="text-xs opacity-75">{newsReels[currentReel].timestamp}</span>
            </div>
            
            <h3 className="text-lg font-bold mb-2">{newsReels[currentReel].title}</h3>
            <p className="text-sm opacity-90 mb-3">{newsReels[currentReel].summary}</p>
            
            {/* Affected Stocks */}
            <div className="flex items-center gap-1 mb-3">
              <span className="text-xs opacity-75">Affects:</span>
              {newsReels[currentReel].affectedStocks.map(stock => (
                <Badge key={stock} variant="outline" className="text-xs text-white border-white/30">
                  {stock}
                </Badge>
              ))}
            </div>
            
            {/* Engagement */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{newsReels[currentReel].likes}</span>
                </button>
                <button className="flex items-center space-x-1">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{newsReels[currentReel].comments}</span>
                </button>
                <button>
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute top-4 left-4 right-16">
            <div className="flex space-x-1">
              {newsReels.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full ${
                    index === currentReel ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {newsReels.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReel(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentReel ? 'bg-primary' : 'bg-muted-foreground/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Related Stocks */}
      <div className="w-full glass-panel p-4 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Stocks to Monitor</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {stockSuggestions.map((stock) => (
            <div key={stock.symbol} className="glass-panel p-3 rounded-xl hover:shadow-lg transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-sm">{stock.symbol}</div>
                <TrendingUp className="w-3 h-3 text-green-500" />
              </div>
              <div className="text-xs text-muted-foreground mb-1">{stock.name}</div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-sm">{stock.price}</div>
                <div className="text-sm font-medium text-green-500">{stock.change}</div>
              </div>
              <Badge className={`text-xs w-full justify-center ${getRecommendationColor(stock.aiRecommendation)}`}>
                AI: {stock.aiRecommendation}
              </Badge>
            </div>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4"
          onClick={handleFindNews}
        >
          <Sparkles className="w-4 h-4 mr-1" />
          Refresh AI Analysis
        </Button>
      </div>
    </div>
  );
};