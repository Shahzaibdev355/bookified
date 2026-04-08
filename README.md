Turn Books Into Conversations — Upload any book and engage in intelligent AI dialogues about its content.

![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextjs) ![MongoDB](https://img.shields.io/badge/MongoDB-9-green?logo=mongodb) ![Vapi AI](https://img.shields.io/badge/Vapi%20AI-Voice-purple) ![Clerk Auth](https://img.shields.io/badge/Clerk-Auth-cyan)

🚀 Live Demo • 🐛 Report Issue • ⭐ Request Feature

🤔 What is Bookified?
Bookified is an AI-powered reading companion that transforms how you interact with books. Simply upload a PDF, and our intelligent AI engine reads, indexes, and deeply understands every page. Then engage in natural conversations—via text or voice—to ask questions, explore themes, and discover new insights.

Whether you're a student tackling textbooks, a professional speed-learning business books, or a lifelong reader exploring literature, Bookified makes learning interactive, personalized, and fun. No more passive reading. Chat with your books.

👥 Perfect for:
📚 Students — Get instant summaries, study guides, and exam prep
💼 Professionals — Speed-learn and extract actionable insights
🧠 Lifelong Learners — Deep-dive into topics with AI guidance
📖 Book Clubs — Explore themes and author intent together
🎓 Educators — Create interactive learning experiences
✨ Features
🎤 Voice & Text Conversations — Talk to your books using natural language, powered by Vapi AI and ElevenLabs
🔍 Smart Book Search — Find passages, themes, or ideas across all your uploads in seconds
📄 PDF Parsing & Indexing — Automatic text extraction and intelligent segmentation
💬 AI-Powered Dialogues — Context-aware responses that understand your book's nuances
🎯 Personalized Learning — Get tailored insights and study guides based on your goals
⚡ Instant Processing — Books analyzed in seconds, ready for conversation
🔐 Secure Authentication — Clerk-powered sign-in with role-based access
💳 Flexible Plans — Free, Standard, and Pro tiers with subscription limits
🌙 Beautiful UI — Modern, distraction-free reading and conversation interface
📱 Responsive Design — Seamless experience on desktop, tablet, and mobile
🎯 How It Works (For Everyone)
Step 1: Upload Your Book
Add any PDF or EPUB file from your library in seconds. No format conversion needed.

Step 2: AI Processing
Our AI reads, indexes, and deeply understands every page of your book. Content is segmented for intelligent retrieval.

Step 3: Start Conversing
Ask questions, explore themes, and discuss the book through voice or text. The AI remembers context and provides insightful answers.

🧠 AI / Core Engine
Bookified uses a multi-layered AI architecture:

Vapi AI for voice conversation management and natural dialogue flow
ElevenLabs for human-quality text-to-speech responses
MongoDB Text Search + Regex Fallback for intelligent passage retrieval
Semantic Understanding of book content through intelligent segmentation
Subscription-Based Rate Limiting to manage processing costs fairly
The AI doesn't just search—it comprehends. It understands context, recalls relationships between ideas, and provides thoughtful, contextual answers about your books.

🏗️ Architecture Overview
Code
┌─────────────────────────────────────────────────────────────┐
│                    Bookified Architecture                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Frontend: Next.js 16 (React 19) + TypeScript             │
│  ├─ Components: shadcn/ui + Tailwind CSS                  │
│  ├─ Forms: React Hook Form + Zod validation               │
│  ├─ Voice UI: Vapi Web SDK integration                    │
│  └─ 3D Elements: Three.js + React Three Fiber (optional)  │
│                                                             │
│  Backend: Next.js Server Actions + API Routes             │
│  ├─ Authentication: Clerk (OAuth + SSO)                   │
│  ├─ File Storage: Vercel Blob storage                     │
│  ├─ PDF Processing: pdfjs-dist parser                     │
│  └─ Search: MongoDB text search + regex fallback          │
│                                                             │
│  Database: MongoDB (Mongoose ODM)                          │
│  ├─ Books collection                                       │
│  ├─ Book Segments (indexed for search)                    │
│  └─ Voice Sessions (usage tracking & billing)             │
│                                                             │
│  Voice & AI Services                                       │
│  ├─ Vapi AI (conversation management)                     │
│  └─ ElevenLabs (text-to-speech)                          │
│                                                             │
│  Subscription & Billing                                    │
│  ├─ Free Plan: 1 book, limited features                  │
│  ├─ Standard Plan: 5 books, 10 min/month voice           │
│  └─ Pro Plan: Unlimited books, 100 min/month voice       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
Data Flow:

User uploads PDF → Vercel Blob stores file
Backend parses PDF → Extracts text segments
Segments stored in MongoDB with full-text index
User initiates voice/text conversation
Query searched against segments (MongoDB + regex fallback)
Relevant content sent to Vapi AI
Vapi generates response + ElevenLabs synthesizes audio
Usage tracked for subscription enforcement
📸 Screenshots
![Screenshot 1](./public/screenshot-1.png) ![Screenshot 2](./public/screenshot-2.png) ![Screenshot 3](./public/screenshot-3.png)

🚀 Getting Started
Prerequisites
Node.js 18+
MongoDB instance (local or Atlas)
Clerk account for authentication
Vapi AI API keys
ElevenLabs API keys
Vercel Blob storage (optional, or use another file storage)
Installation
bash
# Clone the repo
git clone https://github.com/Shahzaibdev355/bookified.git
cd bookified

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Fill in: NEXT_PUBLIC_CLERK_*, MONGODB_URI, VAPI_*, ELEVENLABS_*, BLOB_READ_WRITE_TOKEN

# Run development server
pnpm dev

# Open http://localhost:3000
Build & Deploy
bash
# Build for production
pnpm build

# Start production server
pnpm start

# Deploy to Vercel
vercel deploy
📦 Tech Stack
Layer	Technologies
Frontend	Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion
UI Components	shadcn/ui, Radix UI, Lucide Icons
Forms & Validation	React Hook Form, Zod
Backend	Next.js Server Actions, API Routes
Database	MongoDB, Mongoose
Auth	Clerk (OAuth, SSO, email/password)
File Storage	Vercel Blob
PDF Processing	pdfjs-dist
Voice & AI	Vapi AI, ElevenLabs
Utilities	Winston (logging), Sonner (toasts), Class Variance Authority (styling)
💳 Subscription Tiers
Feature	Free	Standard	Pro
Books	1	5	Unlimited
Voice Conversations	Limited	10 min/month	100 min/month
Text Search	✅	✅	✅
Book Management	✅	✅	✅
Custom Personas	❌	✅	✅
Priority Support	❌	❌	✅
🔄 Project Status
This is an active development project. Core features are working; additional enhancements are ongoing.

✅ PDF upload & parsing
✅ Book search
✅ Voice conversations (Vapi + ElevenLabs)
✅ User authentication (Clerk)
✅ Subscription limits
🚧 Custom book personas
🚧 Export highlights & notes
🚧 Social sharing & book clubs
📄 License
This project is open source under the MIT License.

🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.

bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "Add: your feature description"

# Push and open a PR
git push origin feature/your-feature-name
💬 Support & Feedback
Have questions? Found a bug? Want to request a feature?

📧 Email: Contact via GitHub Issues
🐛 Report Issue: Open an issue
⭐ Star this repo if you find it useful!
Built with ❤️ by Shahzaibdev355