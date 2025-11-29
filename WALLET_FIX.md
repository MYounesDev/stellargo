# 🔧 Fix Freighter Wallet Connection

## ✅ Step-by-Step Solution

### Step 1: Verify Freighter is Installed

**Look at your browser toolbar** (top-right corner). You should see a Freighter icon that looks like this: 🔷

**Don't see it?**
- Click the puzzle piece icon (Extensions) in your browser
- Look for "Freighter"
- If not there → Install from https://www.freighter.app/

### Step 2: Unlock Freighter

This is the **#1 reason** for connection failures!

1. **Click the Freighter icon** in your browser toolbar
2. You should see one of these:
   - ✅ **If it shows your wallet address** → You're unlocked! ✓
   - ❌ **If it asks for a password** → Enter your password and click Unlock

**Important:** Freighter must be unlocked BEFORE you click "Connect Wallet"

### Step 3: Restart Your Dev Server

Sometimes the connection gets stuck. Let's refresh everything:

```bash
# Stop the server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

### Step 4: Try Connecting Again

1. Go to http://localhost:3000
2. **First, unlock Freighter** (click the icon, enter password)
3. Then click **"Connect Wallet"** in the app
4. When Freighter popup appears, click **"Approve"**

---

## 🐛 Still Not Working? Debug Time!

### Test 1: Check Browser Console

1. Press **F12** (or Cmd+Option+I on Mac)
2. Go to **Console** tab
3. Click **"Connect Wallet"** in the app
4. Look for these messages:

**Good Signs (Working):**
```
✓ Freighter extension detected
🔵 Attempting to connect wallet...
✅ Wallet connected successfully!
```

**Bad Signs (Not Working):**
```
❌ Freighter API not found
// or
❌ Freighter returned no public key
```

### Test 2: Check Freighter Status Manually

Open your browser console (F12) and run this:

```javascript
// Copy and paste this into the console:
console.log('Freighter installed?', typeof window.freighter !== 'undefined');

// If this returns true, Freighter is installed ✓
// If this returns false, Freighter is NOT installed ✗
```

### Test 3: Use the Diagnostic Page

I created a special test page for you!

```bash
# Make sure your dev server is running
npm run dev

# Then visit:
http://localhost:3000/wallet-test
```

Click **"Run Full Diagnostic"** and it will tell you exactly what's wrong!

---

## 🔴 Common Issues & Solutions

### Issue 1: "Freighter not found"
**Cause:** Extension not installed or disabled

**Fix:**
```bash
1. Install from: https://www.freighter.app/
2. Make sure it's enabled in your browser's extension settings
3. Restart your browser
4. Refresh the page
```

### Issue 2: "Wallet is locked"
**Cause:** You haven't entered your password

**Fix:**
```bash
1. Click the Freighter icon (🔷) in browser toolbar
2. Enter your password
3. Click "Unlock"
4. Try connecting again
```

### Issue 3: "User declined access"
**Cause:** You clicked "Deny" in the popup

**Fix:**
```bash
1. Click "Connect Wallet" again
2. When Freighter popup appears, click "Approve" (not Deny)
```

### Issue 4: No popup appears
**Cause:** Freighter is stuck or not responding

**Fix:**
```bash
1. Close all browser tabs
2. Restart your browser completely
3. Open Freighter and unlock it
4. Go to localhost:3000 and try again
```

### Issue 5: "Cannot read properties of undefined"
**Cause:** Freighter API not loaded yet

**Fix:**
```bash
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Wait 2-3 seconds after page loads
3. Then click "Connect Wallet"
```

---

## 📱 Browser-Specific Tips

### Chrome / Brave / Edge:
- Extensions icon: Puzzle piece (⚙️) in top-right
- Go to: `chrome://extensions/` to see all extensions
- Make sure Freighter is **enabled** (toggle should be blue)

### Firefox:
- Extensions icon: Puzzle piece in toolbar
- Go to: `about:addons` to manage extensions
- Make sure Freighter has permission to run on localhost

### Safari:
- ⚠️ Freighter is **not available** for Safari
- Use Chrome, Brave, or Firefox instead

---

## ✅ Quick Checklist

Before clicking "Connect Wallet", make sure:

- [ ] Freighter extension is installed (see icon in toolbar)
- [ ] Freighter is unlocked (click icon, should show wallet address)
- [ ] Dev server is running (`npm run dev`)
- [ ] Page is fully loaded (wait 2-3 seconds)
- [ ] Browser is up to date
- [ ] No other wallet extensions are interfering

---

## 🆘 Still Need Help?

### Option 1: Check the logs
Look at your browser console (F12) when clicking "Connect Wallet" and send me:
- Any red error messages
- The full error text

### Option 2: Try the test page
Go to: http://localhost:3000/wallet-test
Run the diagnostic and send me the results

### Option 3: Check Freighter itself
1. Click Freighter icon
2. Does it show an address or ask for password?
3. Take a screenshot and share it

---

## 💡 Pro Tips

1. **Always unlock Freighter BEFORE connecting** - Most common issue!
2. **Use Chrome or Brave** - Best compatibility
3. **Keep Freighter updated** - Check for extension updates
4. **One wallet at a time** - Disable MetaMask or other wallets
5. **Clear cache if stuck** - Hard refresh with Ctrl+Shift+R

---

## ✨ Success!

Once connected, you should see:
- Your wallet address in the navbar (GXXX...XXXX)
- Your XLM balance
- "Disconnect" button appears

Now you can create and claim drops! 🎉

---

**Created:** For troubleshooting wallet connection issues
**Updated:** With better error detection and user-friendly messages


