# CalitoyCorp Deployment Guide

## 🚀 Quick Deploy

### Option 1: Run Deployment Script (Recommended)

```bash
cd ~/CalitoyCorp
./deploy.sh
```

This script will:
- Check for uncommitted changes
- Commit changes if needed
- Push to GitHub
- Verify deployment

### Option 2: Manual Push

```bash
cd ~/CalitoyCorp
git add -A
git commit -m "Your commit message"
git push origin main
```

### Option 3: GitHub CLI

```bash
# Install gh if needed
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
sudo apt update
sudo apt install gh

# Authenticate
gh auth login

# Push
cd ~/CalitoyCorp
git push origin main
```

## 🔧 Setup GitHub Authentication

### Using Personal Access Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `workflow`
4. Generate token
5. Copy token

**For HTTPS:**
```bash
git remote set-url origin https://JoS727:<TOKEN>@github.com/JoS727/CalitoyCorp.git
```

**For SSH (more secure):**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your@email.com"

# Add to GitHub
cat ~/.ssh/id_ed25519.pub
# Copy and paste to: https://github.com/settings/keys

# Update remote
git remote set-url origin git@github.com:JoS727/CalitoyCorp.git
```

## 📁 What's Deployed

### Brand Storefronts
- ✅ **Kurced**: `brands/kurced/index.html`
- ✅ **Love Louder**: `brands/lovelouder/index.html`
- ✅ **Tarosyn**: `brands/tarosyn/index.html`
- ✅ **Wicked Youth**: `brands/wickedyouth/index.html`
- ✅ **Endof8**: `brands/endof8/index.html`

### Admin Dashboard
- ✅ **Admin**: `admin/index.html`

### Total Files
- 75+ product images (SVG)
- 5 brand storefronts
- 1 admin dashboard
- 18 social media clip templates
- 25 lifestyle photography prompts
- Complete checkout system

## 🌐 Live URLs

After deployment, your sites will be at:

| Site | URL |
|------|-----|
| **Portfolio** | https://jos727.github.io/CalitoyCorp/ |
| **Kurced** | https://jos727.github.io/CalitoyCorp/brands/kurced/ |
| **Love Louder** | https://jos727.github.io/CalitoyCorp/brands/lovelouder/ |
| **Tarosyn** | https://jos727.github.io/CalitoyCorp/brands/tarosyn/ |
| **Wicked Youth** | https://jos727.github.io/CalitoyCorp/brands/wickedyouth/ |
| **Endof8** | https://jos727.github.io/CalitoyCorp/brands/endof8/ |
| **Admin** | https://jos727.github.io/CalitoyCorp/admin/ |

## 🔄 Auto-Deployment

GitHub Actions workflow is set up in `.github/workflows/deploy.yml`

This will automatically deploy when you push to the main branch.

## 🐛 Troubleshooting

### "fatal: could not read Username"

**Solution:** Set up authentication (see above)

### "Permission denied"

**Solution:** Check token permissions or use SSH

### "Updates were rejected"

```bash
git pull origin main --rebase
git push origin main
```

### Pages not updating

1. Check GitHub Pages settings: https://github.com/JoS727/CalitoyCorp/settings/pages
2. Ensure source is set to "Deploy from a branch" → "main"
3. Wait 2-5 minutes for CDN propagation

## 📞 Support

If deployment fails:
1. Check `git status` for uncommitted changes
2. Run `./deploy.sh` for guided deployment
3. Check GitHub token permissions
4. Verify repository settings

---

**Last Updated:** August 2, 2026
**Version:** 1.0
