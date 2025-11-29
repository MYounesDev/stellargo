'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function WalletTestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    // Initial check
    addResult('Page loaded');
    if (typeof window !== 'undefined') {
      addResult('✓ Running in browser environment');
      
      if ((window as any).freighter) {
        addResult('✓ Freighter API detected on window object');
      } else {
        addResult('✗ Freighter API NOT found - Extension may not be installed');
      }
    }
  }, []);

  const testFreighterAvailability = async () => {
    setLoading(true);
    addResult('--- Starting Freighter availability test ---');
    
    try {
      // Step 1: Check window.freighter
      if (!(window as any).freighter) {
        addResult('✗ FAIL: window.freighter is undefined');
        addResult('→ Please install Freighter from https://www.freighter.app/');
        setLoading(false);
        return;
      }
      addResult('✓ PASS: window.freighter exists');

      // Step 2: Try importing and using the API
      const { isConnected } = await import('@stellar/freighter-api');
      addResult('✓ PASS: @stellar/freighter-api imported successfully');

      // Step 3: Check connection
      const connected = await isConnected();
      addResult(`✓ PASS: isConnected() returned: ${connected}`);

      // Step 4: Try to get public key
      const { getPublicKey } = await import('@stellar/freighter-api');
      addResult('Requesting public key (you should see a Freighter popup)...');
      
      const publicKey = await getPublicKey();
      
      if (publicKey) {
        addResult(`✓ SUCCESS: Got public key: ${publicKey.slice(0, 10)}...${publicKey.slice(-10)}`);
      } else {
        addResult('✗ FAIL: getPublicKey returned null or undefined');
      }

    } catch (error: any) {
      addResult(`✗ ERROR: ${error.message || error.toString()}`);
      
      if (error.toString().includes('User declined')) {
        addResult('→ You clicked "Deny" in Freighter popup. Try again and click "Approve".');
      }
    } finally {
      setLoading(false);
      addResult('--- Test complete ---');
    }
  };

  const testQuickConnect = async () => {
    setLoading(true);
    addResult('--- Testing quick connect ---');
    
    try {
      const { connectWallet } = await import('@/lib/freighter');
      const publicKey = await connectWallet();
      
      if (publicKey) {
        addResult(`✓ SUCCESS: Connected to ${publicKey.slice(0, 10)}...`);
      } else {
        addResult('✗ FAIL: Connection returned null');
      }
    } catch (error: any) {
      addResult(`✗ ERROR: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
    addResult('Results cleared');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Card>
        <h1 className="text-3xl font-bold text-accent-900 mb-4">
          Wallet Connection Diagnostic
        </h1>
        
        <p className="text-accent-600 mb-6">
          Use this page to diagnose wallet connection issues.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            variant="primary"
            onClick={testFreighterAvailability}
            loading={loading}
          >
            Run Full Diagnostic
          </Button>
          
          <Button
            variant="secondary"
            onClick={testQuickConnect}
            loading={loading}
          >
            Quick Connect Test
          </Button>
          
          <Button
            variant="outline"
            onClick={clearResults}
            disabled={loading}
          >
            Clear Results
          </Button>
        </div>

        {/* Results */}
        <Card className="bg-accent-50 border-accent-300">
          <h2 className="text-lg font-semibold text-accent-900 mb-3">
            Test Results:
          </h2>
          
          <div className="bg-white rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-accent-500">No tests run yet. Click a button above to start.</p>
            ) : (
              testResults.map((result, index) => (
                <div
                  key={index}
                  className={`mb-1 ${
                    result.includes('✓') || result.includes('SUCCESS')
                      ? 'text-green-600'
                      : result.includes('✗') || result.includes('FAIL') || result.includes('ERROR')
                      ? 'text-red-600'
                      : result.includes('→')
                      ? 'text-blue-600 ml-4'
                      : 'text-accent-700'
                  }`}
                >
                  {result}
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Instructions */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-accent-900">
            Common Issues:
          </h3>
          
          <Card className="bg-blue-50 border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">
              ✗ Freighter API NOT found
            </h4>
            <p className="text-blue-800 text-sm mb-2">
              <strong>Solution:</strong> Install Freighter wallet extension
            </p>
            <ol className="text-blue-700 text-sm list-decimal list-inside space-y-1">
              <li>Visit <a href="https://www.freighter.app/" target="_blank" className="underline">freighter.app</a></li>
              <li>Click "Add to Chrome" (or your browser)</li>
              <li>Install the extension</li>
              <li>Create or import a wallet</li>
              <li>Refresh this page</li>
            </ol>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-2">
              User declined access
            </h4>
            <p className="text-yellow-800 text-sm">
              <strong>Solution:</strong> When the Freighter popup appears, click "Approve" instead of "Deny"
            </p>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">
              ✓ Everything working?
            </h4>
            <p className="text-green-800 text-sm">
              Great! Go back to the <a href="/" className="underline font-semibold">Dashboard</a> and try connecting your wallet there.
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
}


