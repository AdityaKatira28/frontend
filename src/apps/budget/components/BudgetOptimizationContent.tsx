import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/card";
import { Slider } from "@shared/components/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@shared/components/tabs";
import { Badge } from "@shared/components/badge";
import { Input } from "@shared/components/input";
import { Button } from "@shared/components/button";
import { Skeleton } from "@shared/components/skeleton";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "@/hooks/use-toast";
import { analyzeThreatData, optimizeBudget, processQuery } from "@/services/optishieldApi";
import { AlertTriangle, Shield, DollarSign, TrendingUp, Target } from "lucide-react";

// Import types
import { ThreatData, BudgetData, QueryResult } from "../types";

// Import mock data for development
import { mockThreatData, mockBudgetData } from "@/data/mockData";

const BudgetOptimizationContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [budget, setBudget] = useState(250000);
  const [query, setQuery] = useState("");
  const [threatData, setThreatData] = useState<any>(null);
  const [budgetData, setBudgetData] = useState<any>(null);
  const [queryResult, setQueryResult] = useState<any>(null);
  const [loading, setLoading] = useState({
    threats: true,
    budget: true,
    query: false
  });

  // Mock data for demonstration
  const allocationData = [
    {
      name: "Network Security",
      value: 85000,
      threatMultiplier: 1.2,
      threatJustification: "High risk of DDoS attacks",
      roi: 0.35
    },
    {
      name: "Endpoint Protection",
      value: 65000,
      threatMultiplier: 1.15,
      threatJustification: "Increasing malware threats",
      roi: 0.28
    },
    {
      name: "Data Protection",
      value: 45000,
      threatMultiplier: 1.3,
      threatJustification: "Critical data exposure risk",
      roi: 0.42
    },
    {
      name: "Identity & Access",
      value: 35000,
      threatMultiplier: 1.1,
      threatJustification: "Credential stuffing attacks rising",
      roi: 0.25
    },
    {
      name: "Security Operations",
      value: 20000,
      threatMultiplier: 1.05,
      threatJustification: "Need for improved monitoring",
      roi: 0.18
    }
  ];

  // Enhanced threat-based recommendations
  const threatBasedRecommendations = [
    { 
      threat: "Advanced Persistent Threats", 
      recommendation: "Increase MFA and Zero Trust investments",
      priority: "Critical",
      budgetImpact: 45000,
      riskReduction: "85%"
    },
    { 
      threat: "Ransomware Attacks", 
      recommendation: "Strengthen backup and recovery systems",
      priority: "High",
      budgetImpact: 35000,
      riskReduction: "70%"
    },
    { 
      threat: "Data Exfiltration", 
      recommendation: "Enhance DLP and encryption measures",
      priority: "High",
      budgetImpact: 30000,
      riskReduction: "75%"
    }
  ];

  const handleBudgetChange = (value: number[]) => {
    setBudget(value[0]);
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(prev => ({ ...prev, query: true }));
    
    try {
      // In a real app, this would be an API call
      // const result = await processQuery(query);
      // setQueryResult(result);
      
      // Mock response for demo
      setTimeout(() => {
        setQueryResult({
          answer: `Based on current threat intelligence, I recommend allocating approximately 30% of your budget to network security due to increased DDoS activity. Consider implementing advanced threat detection and response capabilities.`,
          confidence: 0.87
        });
        setLoading(prev => ({ ...prev, query: false }));
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your query. Please try again.",
        variant: "destructive"
      });
      setLoading(prev => ({ ...prev, query: false }));
    }
  };

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        // In a real app, these would be API calls
        // const threatResponse = await analyzeThreatData();
        // const budgetResponse = await optimizeBudget();
        
        // Mock data for demo
        setTimeout(() => {
          setThreatData(mockThreatData);
          setBudgetData(mockBudgetData);
          setLoading(prev => ({ ...prev, threats: false, budget: false }));
        }, 1000);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(prev => ({ ...prev, threats: false, budget: false }));
      }
    };

    loadData();
  }, []);

  const totalThreatAdjustedBudget = allocationData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6 bg-slate-950 min-h-screen p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Budget Optimization AI</h2>
          <p className="text-slate-400 mt-1">Threat-driven security investment recommendations</p>
        </div>
        <Badge variant="outline" className="bg-purple-900/50 text-purple-300 border-purple-500">
          <Shield className="h-4 w-4 mr-1" />
          AI-powered
        </Badge>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-900 border-slate-800">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-300">
            Threat-Based Allocation
          </TabsTrigger>
          <TabsTrigger value="query" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-300">
            AI Query
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-300">
            Scenario Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6 mt-6">
          {/* Content for dashboard tab */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Current Threat Landscape
              </CardTitle>
              <CardDescription className="text-slate-400">
                AI analysis of active threats influencing budget recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading.threats ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-slate-800" />
                  <Skeleton className="h-4 w-3/4 bg-slate-800" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-900/30 border border-red-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <p className="text-sm text-red-300 font-medium">Threat Severity</p>
                    </div>
                    <p className="text-2xl font-bold text-red-400 mt-1">HIGH</p>
                    <p className="text-xs text-red-300 mt-1">Active credential attacks detected</p>
                  </div>
                  <div className="bg-blue-900/30 border border-blue-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-400" />
                      <p className="text-sm text-blue-300 font-medium">AI Confidence</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-400 mt-1">92%</p>
                    <p className="text-xs text-blue-300 mt-1">Model accuracy rating</p>
                  </div>
                  <div className="bg-amber-900/30 border border-amber-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-amber-400" />
                      <p className="text-sm text-amber-300 font-medium">Active Threats</p>
                    </div>
                    <p className="text-2xl font-bold text-amber-400 mt-1">5 critical</p>
                    <p className="text-xs text-amber-300 mt-1">Requiring immediate attention</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Rest of the dashboard content */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <DollarSign className="h-5 w-5 text-green-500" />
                Threat-Adjusted Budget Allocation
              </CardTitle>
              <CardDescription className="text-slate-400">
                AI-optimized investment based on current threat intelligence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">Total Security Budget</span>
                  <span className="text-sm font-medium text-green-400">${budget.toLocaleString()}</span>
                </div>
                <Slider 
                  value={[budget]} 
                  min={50000} 
                  max={500000} 
                  step={10000} 
                  onValueChange={handleBudgetChange}
                  className="mb-4"
                />
                <div className="text-xs text-slate-400">
                  Recommended range: $200K - $400K based on threat analysis
                </div>
              </div>
              
              {loading.budget ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-slate-800" />
                  <Skeleton className="h-4 w-3/4 bg-slate-800" />
                </div>
              ) : allocationData.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {allocationData.map((item) => (
                      <div key={item.name} className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-slate-300 font-medium">{item.name}</p>
                          <Badge className="bg-purple-900/50 text-purple-300 text-xs">
                            +{Math.round((item.threatMultiplier - 1) * 100)}%
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold text-white">${item.value.toLocaleString()}</p>
                        <p className="text-xs text-slate-400 mt-1">{item.threatJustification}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <TrendingUp className="h-3 w-3 text-green-400" />
                          <span className="text-xs text-green-400">ROI: {(item.roi * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-white mb-3">Budget vs. Threat Impact Analysis</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={allocationData}>
                          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                          <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1e293b', 
                              border: '1px solid #475569',
                              borderRadius: '8px',
                              color: '#fff'
                            }}
                            formatter={(value: number, name: string) => [
                              `$${value.toLocaleString()}`,
                              name === 'value' ? 'Threat-Adjusted Budget' : name
                            ]}
                          />
                          <Bar dataKey="value" fill="#8b5cf6" name="value" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-900/30 border border-green-800 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-green-300 mb-2">Projected Risk Reduction</h4>
                      <p className="text-2xl font-bold text-green-400">78%</p>
                      <p className="text-xs text-green-300 mt-1">
                        Based on threat-adjusted allocations
                      </p>
                    </div>
                    <div className="bg-blue-900/30 border border-blue-800 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-300 mb-2">Cost Avoidance</h4>
                      <p className="text-2xl font-bold text-blue-400">$3.2M</p>
                      <p className="text-xs text-blue-300 mt-1">
                        Estimated prevented breach costs
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-400">No allocation data available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="query" className="space-y-6 mt-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Ask OptiShield AI</CardTitle>
              <CardDescription className="text-slate-400">
                Query the AI for threat-specific budget insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuerySubmit} className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g., 'How should I allocate budget for ransomware protection?'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={loading.query}
                    className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
                  />
                  <Button type="submit" disabled={loading.query} className="bg-purple-600 hover:bg-purple-700">
                    {loading.query ? "Processing..." : "Ask AI"}
                  </Button>
                </div>
                
                {queryResult && (
                  <div className="mt-6 p-4 bg-slate-800 border border-slate-700 rounded-lg">
                    <h4 className="text-sm font-medium text-white mb-2">AI Response</h4>
                    <p className="text-slate-300 mb-3">{queryResult.answer}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Confidence: <span className="text-purple-400">{Math.round(queryResult.confidence * 100)}%</span>
                      </span>
                      <span className="text-slate-400">
                        Based on current threat intelligence
                      </span>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="budget" className="space-y-6 mt-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Budget Scenario Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                Test different budget levels against threat models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Scenario Budget</span>
                    <span className="text-sm font-medium text-green-400">${budget.toLocaleString()}</span>
                  </div>
                  <Slider 
                    value={[budget]} 
                    min={50000} 
                    max={500000} 
                    step={10000} 
                    onValueChange={handleBudgetChange}
                    className="mb-4"
                  />
                </div>
                
                {loading.budget ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-slate-800" />
                    <Skeleton className="h-4 w-3/4 bg-slate-800" />
                  </div>
                ) : allocationData.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {allocationData.map((item) => (
                        <div key={item.name} className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
                          <p className="text-sm text-slate-300 font-medium">{item.name}</p>
                          <p className="text-xl font-bold text-white">${item.value.toLocaleString()}</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {((item.value / totalThreatAdjustedBudget) * 100).toFixed(1)}% of total
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-purple-900/30 border border-purple-800 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-purple-300 mb-2">Scenario Impact Analysis</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Risk Coverage:</span>
                          <span className="text-white ml-2 font-medium">
                            {budget >= 200000 ? "Comprehensive" : budget >= 100000 ? "Moderate" : "Basic"}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Threat Readiness:</span>
                          <span className="text-white ml-2 font-medium">
                            {budget >= 250000 ? "Advanced" : budget >= 150000 ? "Standard" : "Minimal"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400">No scenario data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetOptimizationContent;
