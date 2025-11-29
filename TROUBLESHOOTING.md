# Troubleshooting Wallet Connection

## Issue: "Connect Wallet" Button Not Working

### Quick Checks:

1. **Is Freighter Wallet installed?**
   - Visit: https://www.freighter.app/
   - Install the browser extension
   - Create or import a wallet
   - Make sure it's unlocked

2. **Check browser console for errors:**
   - Press F12 to open DevTools
   - Go to Console tab
   - Click "Connect Wallet" again
   - Look for error messages

### Common Errors and Solutions:

#### Error: "Freighter is not defined" or "Cannot read properties of undefined"

**Solution:** Freighter extension not installed or disabled
```bash
1. Install Freighter: https://www.freighter.app/
2. Refresh the page
3. Try connecting again
```

#### Error: "User declined access"

**Solution:** You clicked "Deny" in the Freighter popup
```bash
1. Click "Connect Wallet" again
2. Click "Approve" in the Freighter popup
```

#### Error: "Network Error" or timeout

**Solution:** Stellar Testnet might be slow
```bash
1. Wait a few seconds
2. Try again
3. Check your internet connection
```

#### Button does nothing / No popup appears

**Solution:** Multiple possible causes:
```bash
1. Check if Freighter is installed and unlocked
2. Clear browser cache and refresh
3. Try in incognito/private mode
4. Check if another extension is conflicting
5. Try a different browser (Chrome, Brave, Firefox)
```

### Step-by-Step Debug:

1. **Open browser console (F12)**
2. **Run this in console:**
```javascript
console.log('Checking Freighter...');
if (window.freighter) {
  console.log('✓ Freighter API detected');
} else {
  console.log('✗ Freighter API not found - Install extension!');
}
```

3. **If Freighter API not found:**
   - Install from: https://www.freighter.app/
   - Restart browser
   - Refresh page

4. **If Freighter API detected but button still not working:**
   - Check if wallet is unlocked (open Freighter extension)
   - Try clicking the button and check console for errors
   - Look for any error messages in red

### Browser-Specific Issues:

**Chrome/Brave:**
- Make sure extension is enabled
- Check: chrome://extensions/

**Firefox:**
- Make sure extension has permissions
- Check: about:addons

**Safari:**
- Freighter may not be available - use Chrome/Brave

### Still Not Working?

**Enhanced debugging - Add this to your code:**

Open `src/components/Navbar.tsx` and update the `handleConnectWallet` function with better logging:

```typescript
const handleConnectWallet = async () => {
  console.log('🔵 Connect Wallet clicked');
  setLoading(true);
  
  try {
    // Check if window.freighter exists
    if (typeof window !== 'undefined' && !(window as any).freighter) {
      throw new Error('Freighter extension not detected. Please install Freighter wallet.');
    }
    
    console.log('🔵 Calling connectWallet...');
    const publicKey = await connectWallet();
    console.log('🔵 Got public key:', publicKey);
    
    if (publicKey) {
      setWalletAddress(publicKey);
      localStorage.setItem('walletAddress', publicKey);
      await fetchBalance(publicKey);
      console.log('✅ Wallet connected successfully!');
    } else {
      throw new Error('No public key returned from Freighter');
    }
  } catch (error: any) {
    console.error('❌ Error connecting wallet:', error);
    alert(error.message || 'Failed to connect wallet. Please make sure Freighter is installed and unlocked.');
  } finally {
    setLoading(false);
  }
};
```

This will show exactly where the issue is happening in the console.


