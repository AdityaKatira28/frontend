import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Shield, TrendingUp, TrendingDown, Upload } from 'lucide-react';

interface ComplianceData {
  total_checks: number;
  compliant: number;
  non_compliant: number;
  critical_count: number;
  framework_scores: Record<string, number>;
  provider_stats: Record<string, { total: number; critical: number }>;
  recent_violations: Array<{
    id: string;
    framework: string;
    provider: string;
    severity: string;
    status: string;
    risk_score: number;
    description: string;
    last_checked: string;
    ai_summary: string;
  }>;
}

interface AiInsights {
  summary: {
    total_violations: number;
    critical_violations: number;
    frameworks_affected: number;
    last_updated: string;
  };
  recommendations: Array<{
    priority: string;
    description: string;
    action: string;
  }>;
}

// File Upload Component
const FileUpload: React.FC<{ onUploadSuccess: () => void }> = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      setUploadStatus('error');
      setMessage('Please upload a CSV file');
      return;
    }

    setUploading(true);
    setUploadStatus('idle');
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://backend-production-6b38.up.railway.app/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus('success');
        setMessage(result.message || 'File uploaded successfully!');
        
        // Trigger dashboard refresh after successful upload
        setTimeout(() => {
          onUploadSuccess();
          setUploadStatus('idle');
          setMessage('');
        }, 2000);
      } else {
        const errorData = await response.json();
        setUploadStatus('error');
        setMessage(errorData.detail || 'Upload failed');
      }
    } catch (error) {
      setUploadStatus('error');
      setMessage('Network error - please try again');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Upload className="h-5 w-5" />
          Upload Compliance Data
        </CardTitle>
        <CardDescription className="text-slate-400">
          Upload CSV files to update compliance monitoring data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={uploading}
            className="bg-slate-700 border-slate-600 text-white file:bg-slate-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1"
          />
          <p className="text-sm text-slate-400 mt-2">
            CSV format: framework,provider,severity,status,risk_score,description
          </p>
        </div>

        {/* Status Messages */}
        {uploading && (
          <div className="flex items-center gap-2 text-blue-400">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-sm">Uploading file...</span>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">{message}</span>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">{message}</span>
          </div>
        )}

        {/* Sample CSV Format */}
        <div className="pt-2 border-t border-slate-600">
          <p className="text-xs text-slate-400 mb-2">Sample CSV format:</p>
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-600">
            <code className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
{`framework,provider,severity,status,risk_score,description
SOC 2,AWS,Critical,Failing,9.2,Database encryption missing
GDPR,Azure,High,Passing,3.1,Data encryption enabled
HIPAA,GCP,Medium,Warning,5.7,Access logs incomplete`}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
export const ComplianceDashboard: React.FC = () => {
  const [complianceData, setComplianceData] = useState<ComplianceData | null>(null);
  const [aiInsights, setAiInsights] = useState<AiInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch compliance dashboard data
      const dashboardResponse = await fetch('http://localhost:8000/api/v1/dashboard');
      if (!dashboardResponse.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const dashboardData = await dashboardResponse.json();
      setComplianceData(dashboardData);

      // Fetch AI insights
      const insightsResponse = await fetch('http://localhost:8000/api/v1/ai-insights');
      if (!insightsResponse.ok) {
        throw new Error('Failed to fetch AI insights');
      }
      const insightsData = await insightsResponse.json();
      setAiInsights(insightsData);
      
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'passing': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failing': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading && !complianceData) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-purple-500" />
          <span className="ml-2 text-white">Loading compliance data...</span>
        </div>
      </div>
    );
  }

  if (error && !complianceData) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="flex flex-col items-center justify-center h-64">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-400 mb-4">Error: {error}</p>
          <Button onClick={fetchData} variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const compliancePercentage = complianceData ? Math.round((complianceData.compliant / complianceData.total_checks) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">AI Compliance Dashboard</h1>
            <p className="text-slate-400 mt-1">
              Real-time compliance monitoring and AI-powered insights
              {lastUpdated && (
                <span className="ml-2 text-xs">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {loading && (
              <RefreshCw className="h-4 w-4 animate-spin text-purple-500" />
            )}
            <Button 
              onClick={fetchData} 
              variant="outline" 
              size="sm"
              className="border-slate-600 text-white hover:bg-slate-700"
              disabled={loading}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* File Upload Section */}
        <FileUpload onUploadSuccess={fetchData} />

        {complianceData && aiInsights && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-200">Total Checks</CardTitle>
                  <Shield className="h-4 w-4 text-slate-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{complianceData.total_checks}</div>
                  <p className="text-xs text-slate-400">Across all frameworks</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-200">Compliance Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{compliancePercentage}%</div>
                  <p className="text-xs text-slate-400">{complianceData.compliant} of {complianceData.total_checks} passing</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-200">Critical Issues</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{complianceData.critical_count}</div>
                  <p className="text-xs text-slate-400">Require immediate attention</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-200">Non-Compliant</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{complianceData.non_compliant}</div>
                  <p className="text-xs text-slate-400">Failed checks</p>
                </CardContent>
              </Card>
            </div>

            {/* Framework Scores */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Framework Scores</CardTitle>
                <CardDescription className="text-slate-400">Average risk scores by compliance framework</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Object.entries(complianceData.framework_scores).map(([framework, score]) => (
                    <div key={framework} className="text-center p-4 bg-slate-900 rounded-lg">
                      <div className="text-2xl font-bold text-white">{score}</div>
                      <div className="text-sm text-slate-400">{framework}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Violations */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Violations</CardTitle>
                <CardDescription className="text-slate-400">Latest compliance issues detected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceData.recent_violations.slice(0, 5).map((violation) => (
                    <div key={violation.id} className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-700">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(violation.status)}
                        <div className="flex-1">
                          <div className="font-medium text-white">{violation.description}</div>
                          <div className="text-sm text-slate-400">
                            {violation.framework} • {violation.provider} • Risk Score: {violation.risk_score}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">{violation.ai_summary}</div>
                        </div>
                      </div>
                      <Badge className={`${getSeverityColor(violation.severity)} text-white`}>
                        {violation.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">AI Insights & Recommendations</CardTitle>
                <CardDescription className="text-slate-400">AI-powered analysis and suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-900 rounded-lg">
                      <div className="text-2xl font-bold text-white">{aiInsights.summary.total_violations}</div>
                      <div className="text-sm text-slate-400">Total Violations</div>
                    </div>
                    <div className="text-center p-4 bg-slate-900 rounded-lg">
                      <div className="text-2xl font-bold text-white">{aiInsights.summary.critical_violations}</div>
                      <div className="text-sm text-slate-400">Critical Violations</div>
                    </div>
                    <div className="text-center p-4 bg-slate-900 rounded-lg">
                      <div className="text-2xl font-bold text-white">{aiInsights.summary.frameworks_affected}</div>
                      <div className="text-sm text-slate-400">Frameworks Affected</div>
                    </div>
                  </div>

                  {aiInsights.recommendations.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Recommendations</h4>
                      <div className="space-y-3">
                        {aiInsights.recommendations.map((rec, index) => (
                          <div key={index} className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                            <div className="flex items-center justify-between mb-2">
                              <Badge className={`${getSeverityColor(rec.priority)} text-white`}>
                                {rec.priority}
                              </Badge>
                            </div>
                            <div className="text-white font-medium">{rec.description}</div>
                            <div className="text-sm text-slate-400 mt-1">{rec.action}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};