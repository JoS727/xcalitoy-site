#!/bin/bash
# ============================================================
# DEPLOYMENT SCRIPT FOR CALITOYCORP
# Automates pushing to GitHub Pages
# ============================================================

set -e  # Exit on error

echo "=========================================="
echo "  CALITOYCORP DEPLOYMENT SCRIPT"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/JoS727/CalitoyCorp.git"
BRANCH="main"
BUILD_DIR="."

# Function to print status
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    print_error "Not in CalitoyCorp root directory"
    echo "Please run this script from ~/CalitoyCorp"
    exit 1
fi

print_status "Found CalitoyCorp directory"

# Check git status
echo ""
echo "Checking git status..."
GIT_STATUS=$(git status --porcelain)
if [ -n "$GIT_STATUS" ]; then
    print_warning "Uncommitted changes found"
    echo "Changes:"
    echo "$GIT_STATUS"
    echo ""
    read -p "Do you want to commit these changes? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter commit message: " commit_msg
        git add -A
        git commit -m "$commit_msg"
        print_status "Changes committed"
    else
        print_warning "Skipping commit"
    fi
else
    print_status "No uncommitted changes"
fi

# Check for unpushed commits
echo ""
echo "Checking for unpushed commits..."
UNPUSHED=$(git log --oneline origin/$BRANCH..HEAD 2>/dev/null | wc -l)
if [ "$UNPUSHED" -gt 0 ]; then
    print_status "Found $UNPUSHED commits to push"
    echo "Commits:"
    git log --oneline origin/$BRANCH..HEAD
else
    print_warning "No unpushed commits found"
    echo "Everything is up to date!"
    exit 0
fi

# Check GitHub credentials
echo ""
echo "Checking GitHub credentials..."

# Try to use gh CLI if available
if command -v gh &> /dev/null; then
    print_status "GitHub CLI (gh) found"
    
    # Check if authenticated
    if gh auth status &> /dev/null; then
        print_status "Already authenticated with GitHub"
    else
        print_warning "Not authenticated with GitHub CLI"
        echo "Please authenticate:"
        gh auth login
    fi
    
    # Push using gh
    echo ""
    echo "Pushing to GitHub..."
    if git push origin $BRANCH; then
        print_status "Successfully pushed to GitHub!"
    else
        print_error "Push failed"
        exit 1
    fi
else
    # Try HTTPS with stored credentials
    print_warning "GitHub CLI not found, trying HTTPS..."
    
    # Check if credential helper is configured
    if git config --get credential.helper &> /dev/null; then
        print_status "Credential helper configured"
    else
        print_warning "Setting up credential helper..."
        git config --global credential.helper cache
        git config --global credential.helper 'cache --timeout=3600'
    fi
    
    # Push
    echo ""
    echo "Pushing to GitHub..."
    echo "(You may be prompted for username and password/token)"
    echo ""
    
    if git push origin $BRANCH; then
        print_status "Successfully pushed to GitHub!"
    else
        print_error "Push failed"
        echo ""
        echo "To fix this, you can:"
        echo "1. Use GitHub CLI: gh auth login"
        echo "2. Use personal access token instead of password"
        echo "3. Set up SSH keys for authentication"
        echo ""
        echo "Get a token at: https://github.com/settings/tokens"
        exit 1
    fi
fi

# Verify deployment
echo ""
echo "Verifying deployment..."
sleep 3

# Check if GitHub Pages is enabled
if curl -s -o /dev/null -w "%{http_code}" "https://jos727.github.io/CalitoyCorp/" | grep -q "200\|301\|302"; then
    print_status "GitHub Pages is responding!"
    echo ""
    echo "Your sites are live at:"
    echo "  • Main: https://jos727.github.io/CalitoyCorp/"
    echo "  • Kurced: https://jos727.github.io/CalitoyCorp/brands/kurced/"
    echo "  • Love Louder: https://jos727.github.io/CalitoyCorp/brands/lovelouder/"
    echo "  • Tarosyn: https://jos727.github.io/CalitoyCorp/brands/tarosyn/"
    echo "  • Wicked Youth: https://jos727.github.io/CalitoyCorp/brands/wickedyouth/"
    echo "  • Endof8: https://jos727.github.io/CalitoyCorp/brands/endof8/"
    echo "  • Admin: https://jos727.github.io/CalitoyCorp/admin/"
else
    print_warning "GitHub Pages may take a few minutes to update"
    echo "Check status at: https://github.com/JoS727/CalitoyCorp/settings/pages"
fi

echo ""
echo "=========================================="
echo "  DEPLOYMENT COMPLETE!"
echo "=========================================="
