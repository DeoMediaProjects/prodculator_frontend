import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Badge } from '@/app/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { API_CONFIG, getAPIStatus } from '@/config/api.config';

/**
 * API Connection Tester
 * Verifies frontend-to-backend connectivity and frontend-safe configuration only.
 */
export function APIConnectionTester() {
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  const [testing, setTesting] = useState(false);

  const apiStatus = getAPIStatus();

  const testBackend = async () => {
    setTesting(true);
    try {
      const response = await fetch(`${API_CONFIG.app.apiBaseURL}/api/health`);
      if (!response.ok) {
        return { success: false, message: `Backend health check failed (${response.status})` };
      }
      const payload = await response.json();
      return {
        success: true,
        message: 'Backend reachable',
        details: payload?.status ? `Status: ${payload.status}` : 'Health endpoint OK',
      };
    } catch (error: any) {
      return { success: false, message: error.message || 'Backend request failed' };
    } finally {
      setTesting(false);
    }
  };

  const testStripe = async () => {
    setTesting(true);
    try {
      const key = API_CONFIG.stripe.publishableKey;
      if (!key) {
        return { success: false, message: 'No Stripe publishable key found' };
      }
      if (!key.startsWith('pk_')) {
        return { success: false, message: 'Invalid Stripe key format' };
      }
      const prices = API_CONFIG.stripe.prices;
      const hasPrices =
        prices.proMonthlyUSD || prices.proMonthlyGBP || prices.producerAnnualUSD || prices.producerAnnualGBP;

      return {
        success: true,
        message: `Stripe configured (${key.startsWith('pk_test') ? 'TEST' : 'LIVE'} mode)`,
        details: `Price IDs: ${hasPrices ? 'Configured' : 'Missing'}`,
      };
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      setTesting(false);
    }
  };

  const testGoogleMaps = async () => {
    setTesting(true);
    try {
      const key = API_CONFIG.googleMaps.apiKey;
      if (!key) {
        return { success: false, message: 'No Google Maps key found' };
      }
      if (!key.startsWith('AIza')) {
        return { success: false, message: 'Google Maps key format looks invalid' };
      }
      return { success: true, message: 'Google Maps key configured' };
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      setTesting(false);
    }
  };

  const runTest = async (service: string, testFn: () => Promise<any>) => {
    setTesting(true);
    const result = await testFn();
    setTestResults((prev) => ({ ...prev, [service]: result }));
    setTesting(false);
  };

  const testAll = async () => {
    setTesting(true);
    const results = await Promise.all([testBackend(), testStripe(), testGoogleMaps()]);

    setTestResults({
      backend: results[0],
      stripe: results[1],
      googleMaps: results[2],
    });
    setTesting(false);
  };

  const getStatusIcon = (active: boolean, tested?: any) => {
    if (tested === undefined) {
      return active ? <Badge className="bg-blue-500">Configured</Badge> : <Badge variant="outline">Not Configured</Badge>;
    }

    if (tested.success) {
      return (
        <Badge className="bg-green-500">
          <CheckCircle2 className="w-3 h-3 mr-1" />Working
        </Badge>
      );
    }

    return (
      <Badge variant="destructive">
        <XCircle className="w-3 h-3 mr-1" />Failed
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">API Connection Tester</h1>
          <p className="text-gray-400">Validate backend-first frontend integrations</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Configuration Status</CardTitle>
            <CardDescription className="text-gray-400">Only frontend-safe values are checked here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-gray-900 border-yellow-500">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-gray-300">
                Secret provider keys (OpenAI, Supabase service role, Stripe secret) are server-side only and are intentionally not exposed in this page.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">Backend API</h3>
                  <p className="text-sm text-gray-400">FastAPI health and routing</p>
                  {testResults.backend && <p className="text-xs text-gray-500 mt-1">{testResults.backend.message}</p>}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(apiStatus.backend.active, testResults.backend)}
                  <Button size="sm" onClick={() => runTest('backend', testBackend)} disabled={testing || !apiStatus.backend.active}>
                    Test
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">Stripe</h3>
                  <p className="text-sm text-gray-400">Checkout client configuration</p>
                  {testResults.stripe && <p className="text-xs text-gray-500 mt-1">{testResults.stripe.message}</p>}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(apiStatus.stripe.active, testResults.stripe)}
                  <Button size="sm" onClick={() => runTest('stripe', testStripe)} disabled={testing || !apiStatus.stripe.active}>
                    Test
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">Google Maps</h3>
                  <p className="text-sm text-gray-400">Frontend geospatial lookups</p>
                  {testResults.googleMaps && (
                    <p className="text-xs text-gray-500 mt-1">{testResults.googleMaps.message}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(apiStatus.googleMaps.active, testResults.googleMaps)}
                  <Button size="sm" onClick={() => runTest('googleMaps', testGoogleMaps)} disabled={testing || !apiStatus.googleMaps.active}>
                    Test
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={testAll} disabled={testing} className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                {testing ? 'Testing...' : 'Test All Connections'}
              </Button>
              <Button variant="outline" onClick={() => setTestResults({})} className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Clear Results
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Frontend Env Example</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">Add to .env.local:</p>
              <pre className="text-xs text-gray-300 overflow-x-auto">{`VITE_API_BASE_URL=http://localhost:8000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_STRIPE_PRICE_PRO_MONTHLY_USD=price_xxx
VITE_STRIPE_PRICE_PRO_MONTHLY_GBP=price_xxx
VITE_STRIPE_PRICE_PRODUCER_ANNUAL_USD=price_xxx
VITE_STRIPE_PRICE_PRODUCER_ANNUAL_GBP=price_xxx
VITE_GOOGLE_MAPS_API_KEY=AIza...`}</pre>
            </div>

            <Alert className="bg-yellow-900/20 border-yellow-600">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-gray-300">
                After updating env vars, restart your dev server (<code className="bg-gray-900 px-2 py-1 rounded">npm run dev</code>).
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors">
              <ExternalLink className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Stripe Dashboard</span>
            </a>
            <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors">
              <ExternalLink className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Google Cloud Console</span>
            </a>
            <a href="http://localhost:8000/api/docs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors">
              <ExternalLink className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Backend API Docs</span>
            </a>
            <a href="/BACKEND_INTEGRATION_GUIDE.md" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors">
              <ExternalLink className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Integration Guide</span>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default APIConnectionTester;
