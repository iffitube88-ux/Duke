# GitHub Publishing Guide - Step by Step

## ✅ Prerequisites Check

Pehle yeh check karein:

```bash
# Git installed hai?
git --version

# Node installed hai?
node --version

# npm installed hai?
npm --version
```

## 🚀 Step-by-Step GitHub Publishing

### Step 1: Git Initialize karein

```bash
git init
```

### Step 2: Files Add karein

```bash
git add .
```

### Step 3: First Commit karein

```bash
git commit -m "Initial commit: Dukes of Beauty luxury salon website"
```

### Step 4: GitHub pe Repository Create karein

1. https://github.com/new pe jayein
2. Repository name: `dukes-of-beauty`
3. Description: "Premium luxury beauty salon website"
4. **Public** select karein
5. **NO** initialize with README (humne already bana liya hai)
6. **NO** add .gitignore (humne already bana liya hai)
7. **NO** add license
8. "Create repository" pe click karein

### Step 5: Remote Add karein

```bash
# IMPORTANT: YOUR_USERNAME ko apne GitHub username se replace karein
git remote add origin https://github.com/YOUR_USERNAME/dukes-of-beauty.git
```

### Step 6: Branch Rename karein

```bash
git branch -M main
```

### Step 7: Push karein

```bash
git push -u origin main
```

## 🔐 Authentication

Agar GitHub username/password maange:

### Option 1: Personal Access Token (Recommended)

1. https://github.com/settings/tokens pe jayein
2. "Generate new token (classic)" pe click karein
3. Note: "dukes-of-beauty" likhein
4. Expiration: "90 days" select karein
5. Scopes: `repo` select karein
6. "Generate token" pe click karein
7. **Token copy karein** (yeh sirf ek baar dikhega!)
8. Password ki jagah yeh token paste karein

### Option 2: GitHub CLI

```bash
# Install GitHub CLI
# Windows: winget install --id GitHub.cli
# Mac: brew install gh
# Linux: sudo apt install gh

# Login
gh auth login

# Follow the prompts
```

## ❌ Common Errors & Solutions

### Error 1: "fatal: remote origin already exists"

**Solution:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/dukes-of-beauty.git
```

### Error 2: "error: failed to push some refs"

**Solution:**
```bash
git pull origin main --rebase
git push -u origin main
```

### Error 3: "Authentication failed"

**Solution:**
- Personal Access Token use karein (upar dekhein)
- Ya phir:
```bash
git config --global credential.helper store
# Phir se push karein, credentials save ho jayenge
```

### Error 4: "Permission denied (publickey)"

**Solution:**
```bash
# SSH key generate karein
ssh-keygen -t ed25519 -C "your_email@example.com"

# SSH agent start karein
eval "$(ssh-agent -s)"

# Key add karein
ssh-add ~/.ssh/id_ed25519

# Public key copy karein
cat ~/.ssh/id_ed25519.pub

# GitHub pe jayein: Settings > SSH and GPG keys > New SSH key
# Key paste karein

# Remote URL change karein
git remote set-url origin git@github.com:YOUR_USERNAME/dukes-of-beauty.git
```

### Error 5: "Updates were rejected"

**Solution:**
```bash
# Force push (sirf tab karein jab aap sure hon)
git push -u origin main --force
```

## 📋 Complete Command Sequence

Yeh sab commands ek saath copy-paste karein:

```bash
# Initialize
git init
git add .
git commit -m "Initial commit: Dukes of Beauty luxury salon website"

# GitHub pe repository create karein pehle, phir:
git remote add origin https://github.com/YOUR_USERNAME/dukes-of-beauty.git
git branch -M main
git push -u origin main
```

## ✅ Success Check

Publish hone ke baad:

1. https://github.com/YOUR_USERNAME/dukes-of-beauty pe jayein
2. Sab files dikhni chahiye
3. README.md properly render hona chahiye
4. No error messages

## 🌐 Deployment (Optional)

### Vercel pe Deploy karein:

```bash
npm install -g vercel
vercel
```

### Netlify pe Deploy karein:

1. https://netlify.com pe jayein
2. "Add new site" > "Import an existing project"
3. GitHub se connect karein
4. Repository select karein
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy karein

## 📞 Help Chahiye?

Agar koi error aa raha hai toh:

1. **Exact error message copy karein**
2. **Screenshot lein**
3. **Mujhe batao** - main turant fix kar dunga!

---

**Status:** ✅ Ready to Publish
**Build:** ✅ Successful
**Files:** ✅ All Present
