# 🚀 Quick Start Guide - Instagram Caption Generator

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or cloud)
- Google AI API key (Gemini)
- Git installed

---

## ⚡ Quick Setup (5 minutes)

### 1. Environment Variables

Create `.env.local` in the root directory:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Google Generative AI (Gemini)
GEMINI_API_KEY=your_google_ai_api_key

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Create `.env` in the `backend` directory:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Server Configuration
PORT=5000
NODE_ENV=development

# Gemini API Key
GEMINI_API_KEY=your_google_ai_api_key

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 2. Generate Secrets

```bash
# Generate NextAuth Secret
openssl rand -base64 32

# Generate JWT Secret
openssl rand -base64 32
```

### 3. Get API Keys

#### MongoDB
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Replace `<password>` with your password

#### Google AI (Gemini)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Copy the key

### 4. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 5. Run the Application

**Option A: Run both together (Recommended)**
```bash
npm run dev:all
```

**Option B: Run separately**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run backend
```

### 6. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎨 What You'll See

### Landing Page
- Beautiful Instagram-inspired gradient design
- Sign in / Sign up forms
- Google OAuth option
- Vibrant pink and purple color scheme

### Dashboard
- Sidebar with chat history
- Main input area for caption prompts
- AI-generated Instagram captions
- Copy functionality
- Save to history

---

## 🛠️ Development Scripts

```bash
# Frontend only
npm run dev

# Backend only
npm run backend

# Both together
npm run dev:all

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 📱 Features

### ✨ AI Caption Generation
- Powered by Google's Gemini AI
- Instagram-optimized captions
- Fun and relatable tone
- 5-8 relevant hashtags
- 100-200 words
- Emoji support

### 🔐 Authentication
- Email/Password sign up
- Google OAuth
- Secure session management
- Protected routes

### 💾 Caption Management
- Save generated captions
- View history
- Copy to clipboard
- Delete captions

### 🎨 Modern UI
- Instagram gradient design
- Smooth animations
- Responsive layout
- Toast notifications
- Loading states

---

## 🔧 Troubleshooting

### MongoDB Connection Issues
```bash
# Make sure MongoDB is running
# Check connection string format:
mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Do the same for backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

### API Key Issues
- Verify Gemini API key is correct
- Check API key has proper permissions
- Ensure no extra spaces in .env files

---

## 🎯 First Time User Flow

1. **Visit Landing Page**
   - See the vibrant Instagram-themed design
   - Read about the features

2. **Sign Up**
   - Use email/password or Google
   - Get redirected to dashboard

3. **Generate First Caption**
   - Type a prompt like "Generate a caption for my beach vacation photo"
   - Click the send button (or press Enter)
   - Wait for AI to generate

4. **Use Your Caption**
   - Copy the generated caption
   - Paste to Instagram
   - Watch the engagement roll in! 🎉

5. **Explore History**
   - View past captions in sidebar
   - Click to load any previous caption
   - Delete unwanted captions

---

## 🌟 Pro Tips

### Getting Better Captions
```
Good prompt: "Caption for my coffee morning routine"
Great prompt: "Caption for my cozy Sunday morning coffee setup, aesthetic vibes"
```

### Prompt Ideas
- "Motivational Monday workout post"
- "Foodie post about homemade pasta"
- "Travel caption for Santorini sunset"
- "Fashion outfit of the day, casual chic"
- "Pet post about my cute dog playing"

### Customization
1. Edit `src/app/globals.css` for color changes
2. Modify `src/app/api/generate-caption/route.js` for AI prompt
3. Update `src/components/` for UI changes

---

## 📊 Project Structure

```
Instagram-caption-generator/
├── src/
│   ├── app/                    # Next.js 15 app directory
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Dashboard page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Landing page
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   └── *.jsx             # Custom components
│   ├── lib/                   # Utilities
│   └── models/                # MongoDB models
├── backend/                   # Express.js backend
│   ├── config/               # Configuration
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Express middleware
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   └── server.js             # Entry point
├── public/                    # Static files
└── package.json              # Dependencies
```

---

## 🔒 Security Notes

1. Never commit `.env` files
2. Use strong secrets (32+ characters)
3. Enable 2FA on MongoDB Atlas
4. Rotate API keys regularly
5. Use HTTPS in production

---

## 🚀 Deployment

### Vercel (Frontend)
```bash
vercel deploy
```

### Railway/Heroku (Backend)
1. Push to GitHub
2. Connect repository
3. Add environment variables
4. Deploy

### MongoDB Atlas
Already cloud-hosted! ✅

---

## 📚 Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose
- **AI**: Google Gemini AI
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS, Framer Motion
- **UI**: shadcn/ui, Radix UI

---

## 💬 Support

Having issues? Check:
1. [GitHub Issues](your-repo-url)
2. Documentation files in this repo
3. Stack Overflow with relevant tags

---

## 🎉 You're All Set!

Your Instagram Caption Generator is ready to create amazing content! 

Start generating captions and watch your Instagram game level up! 💖✨

Happy posting! 📸
