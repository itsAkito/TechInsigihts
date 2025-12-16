'use client';

import { useState } from 'react';
import { MOCK_TRENDS, MOCK_CASE_STUDIES, MOCK_PREDICTIONS } from '@/lib/api/mock-data';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { ArrowRight, TrendingUp, BookOpen, Lightbulb, Eye } from 'lucide-react';
import Link from 'next/link';

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<'trends' | 'cases' | 'predictions'>('trends');

  const renderTrends = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {MOCK_TRENDS.map((trend: any) => (
        <Card key={trend.id} className="p-6 hover:shadow-lg transition-shadow group">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors mb-2">
                  {trend.title}
                </h3>
                <Badge variant="outline">{trend.domain}</Badge>
              </div>
              <TrendingUp className="text-blue-500 flex-shrink-0" size={24} />
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 bg-muted rounded-lg">
              {Object.entries(trend.metrics).map(([key, value]: any) => (
                <div key={key}>
                  <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-sm font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Key Trends</p>
              <ul className="space-y-1">
                {trend.keyTrends.slice(0, 2).map((t: string, i: number) => (
                  <li key={i} className="text-sm text-foreground flex items-start gap-2">
                    <span className="text-blue-500 font-bold">→</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Eye size={14} /> {trend.views} views
              </span>
              <Link href={`/insights/trends/${trend.slug}`}>
                <Button size="sm" variant="ghost" className="h-8">
                  Read <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderCaseStudies = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {MOCK_CASE_STUDIES.map((study: any) => (
        <Card key={study.id} className="p-6 hover:shadow-lg transition-shadow group">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-blue-600 font-semibold mb-1">{study.company}</p>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors mb-2">
                  {study.title}
                </h3>
                <Badge variant="outline">{study.domain}</Badge>
              </div>
              <BookOpen className="text-blue-500 flex-shrink-0" size={24} />
            </div>

            <div className="space-y-3 p-3 bg-muted rounded-lg">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Challenge</p>
                <p className="text-sm text-foreground line-clamp-2">{study.challenge}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Solution</p>
                <p className="text-sm text-foreground line-clamp-2">{study.solution}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {Object.entries(study.results).map(([key, value]: any) => (
                <div key={key}>
                  <p className="text-xs text-muted-foreground capitalize">{key}</p>
                  <p className="text-sm font-semibold text-green-600">{value}</p>
                </div>
              ))}
            </div>

            <Link href={`/insights/cases/${study.slug}`}>
              <Button className="w-full" variant="outline" size="sm">
                View Case Study <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPredictions = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {MOCK_PREDICTIONS.map((pred: any) => (
        <Card key={pred.id} className="p-6 hover:shadow-lg transition-shadow group">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors mb-2">
                  {pred.title}
                </h3>
                <Badge variant="outline">{pred.domain}</Badge>
              </div>
              <Lightbulb className="text-yellow-500 flex-shrink-0" size={24} />
            </div>

            <div className="space-y-2 p-3 bg-muted rounded-lg max-h-[200px] overflow-y-auto">
              {pred.predictions.slice(0, 3).map((p: any, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-xs font-bold text-blue-600">
                      {p.year}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground line-clamp-2">{p.prediction}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-gray-300 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${p.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground">{p.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href={`/insights/predictions/${pred.slug}`}>
              <Button className="w-full" variant="outline" size="sm">
                Read Full Predictions <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tech Insights</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Deep dives into trends, real-world case studies, and future predictions
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-6 border-b border-border sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'trends', label: 'Trend Analysis', icon: TrendingUp },
              { id: 'cases', label: 'Case Studies', icon: BookOpen },
              { id: 'predictions', label: 'Predictions', icon: Lightbulb },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-background border border-border text-foreground hover:bg-muted'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {activeTab === 'trends' && renderTrends()}
          {activeTab === 'cases' && renderCaseStudies()}
          {activeTab === 'predictions' && renderPredictions()}
        </div>
      </section>
    </div>
  );
}
