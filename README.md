# Qioseon Labs — Website

Built with React + Vite. Deployed via Vercel.

## Deploy to Vercel (recommended)

### Step 1 — Push to GitHub from Colab

Run this in a Google Colab cell:

```python
import os

# Install git if needed
os.system("apt-get install -y git")

# Configure git identity
os.system('git config --global user.email "you@example.com"')
os.system('git config --global user.name "Your Name"')

# Mount Google Drive (optional — if you uploaded the zip there)
from google.colab import drive
drive.mount('/content/drive')

# Unzip the project (adjust path if needed)
os.system("unzip /content/drive/MyDrive/qioseon-labs.zip -d /content/qioseon-labs")
os.chdir("/content/qioseon-labs")

# Init git repo and push to GitHub
os.system("git init")
os.system("git add .")
os.system('git commit -m "Initial deploy: Qioseon Labs website"')
os.system("git branch -M main")

# Replace YOUR_USERNAME and YOUR_REPO with your GitHub details
os.system("git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git")
os.system("git push -u origin main")
```

> When prompted for GitHub credentials, use your GitHub username and a **Personal Access Token** (not your password).  
> Create one at: https://github.com/settings/tokens → New token → check `repo` scope.

---

### Step 2 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import your `YOUR_REPO` repository
4. Leave all settings as default (Vercel auto-detects the config)
5. Click **Deploy**

---

### Step 3 — Add Environment Variables in Vercel

In your Vercel project → **Settings → Environment Variables**, add:

| Key | Value |
|-----|-------|
| `GMAIL_USER` | `qioseonlabs@gmail.com` |
| `GMAIL_APP_PASSWORD` | your Gmail App Password |

Then go to **Deployments → Redeploy** for the variables to take effect.

---

### Step 4 — Connect your custom domain

1. Vercel project → **Settings → Domains**
2. Add your domain (e.g. `qioseonlabs.com`)
3. Vercel gives you a **CNAME** or **A record**
4. Log in to your DNS provider and add that record
5. Wait 5–30 minutes for DNS to propagate → your site is live

---

## Project structure

```
qioseon-labs/
├── api/
│   └── contact.js      # Contact form serverless function (Vercel)
├── public/             # Built React frontend (HTML/CSS/JS/images)
├── vercel.json         # Routing — /api/* → function, /* → React app
├── package.json        # nodemailer dependency for the API function
└── .env.example        # Environment variable reference
```
