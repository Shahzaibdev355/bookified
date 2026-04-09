
<div align="center">

<br/>
 <a href="https://bookified-sigma-flame.vercel.app/" target="_blank">
<img width="1430" height="649" alt="image" src="https://github.com/user-attachments/assets/2bad93b4-46d1-4dc0-8853-2c6da5503ac2" />
 </a>
<br/>

<h2 align="center">📚 Bookified</h2>

<h4> AI Book Companion | Vapi, ElevenLabs,  Upload any book and engage in intelligent AI dialogues about its content. </h4>

<br/>

<div>
<img src="https://img.shields.io/badge/-Next.js_16-000000?style=for-the-badge&logo=Next.js&logoColor=white" />
<img src="https://img.shields.io/badge/-ElevenLabs-FFFFFF?style=for-the-badge&logo=ElevenLabs&logoColor=black" />
<img src="https://img.shields.io/badge/-Vapi-62F6B5?style=for-the-badge&logo=Vapi&logoColor=black" />
<img src="https://img.shields.io/badge/-Clerk-6C47FF?style=for-the-badge&logo=Clerk&logoColor=white" /><br/>
<img src="https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white" />
<img src="https://img.shields.io/badge/-Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white" />
<img src="https://img.shields.io/badge/-Tailwind-06B6D4?style=for-the-badge&logo=Tailwind-CSS&logoColor=white" />
<img src="https://img.shields.io/badge/-Shadcn/UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
</div>

<br/>

**🌐 Live Demo:** [https://bookified-sigma-flame.vercel.app/](https://bookified-sigma-flame.vercel.app)

</div>

<br/>

🤔 What is Bookified?
Bookified is an AI-powered reading companion that transforms how you interact with books. Simply upload a PDF, and our intelligent AI engine reads, indexes, and deeply understands every page. Then engage in natural conversations—via text or voice—to ask questions, explore themes, and discover new insights.

Whether you're a student tackling textbooks, a professional speed-learning business books, or a lifelong reader exploring literature, Bookified makes learning interactive, personalized, and fun. No more passive reading. Chat with your books.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Clerk](https://jsm.dev/books-clerk)** is a comprehensive user management and authentication platform. It provides secure, pre-built components for email and social logins, enabling seamless session management and protected routes with minimal configuration.

- **[CodeRabbit](https://jsm.dev/books-coderabbit)** is an AI-powered code review platform that provides contextual, line-by-line feedback on pull requests. It automates the review process by identifying bugs, suggesting optimizations, and ensuring coding standards are met, significantly reducing the manual effort for developers and improving code quality.

- **[ElevenLabs](https://elevenlabs.io/docs)** is an advanced AI audio platform providing lifelike text-to-speech. It powers the voice previews in Bookified, allowing users to hear and select from a variety of natural-sounding AI personas before starting a conversation.

- **[MongoDB](https://www.mongodb.com/docs/)** is a flexible, document-based NoSQL database designed for scalability and developer ease. Combined with Mongoose, it serves as the core storage for user libraries, book metadata, and conversation transcripts.

- **[Next.js](https://nextjs.org/docs)** is a powerful React framework for building full-stack web applications. It handles the core application logic, server-side rendering, and API routes, enabling a fast and responsive interface for the Bookified platform.

- **[Shadcn UI](https://ui.shadcn.com/)** is a collection of re-usable, accessible components built with Tailwind CSS and Radix UI. It allows for the creation of a clean, modular, and professional-grade user interface that is easy to customize and theme.

- **[TypeScript](https://www.typescriptlang.org/)** is a superset of JavaScript that adds static typing, providing better tooling, code quality, and error detection. It ensures the application remains maintainable and robust as the codebase scales.

- **[Vapi](https://jsm.dev/books-vapi)** is a specialized Voice AI platform that enables real-time, low-latency conversational audio. It serves as the primary engine for Bookified, allowing users to have seamless, back-and-forth verbal interactions with their uploaded content.


## <a name="features">🔋 Features</a>

📄 **PDF Upload & Ingestion**: Seamlessly upload PDF books with automated text extraction, intelligent chunking, and high-dimensional embeddings for precise context retrieval.

🎙️ **Voice-First Conversations**: Engage in natural, real-time voice dialogues with your uploaded books, allowing you to ask questions or explore complex concepts verbally via Vapi.

🧠 **AI Voice Personas**: Choose from a variety of distinct AI personalities and hear instant high-fidelity previews powered by ElevenLabs to find the perfect reading companion.

✨ **Smart Summaries & Insights**: Quickly extract the essence of any chapter or request deep-dive summaries, making long-form content more accessible and digestible.

📝 **Session Transcripts**: Keep a complete record of every vocal interaction with auto-generated text transcripts, ensuring you never lose a key insight from your discussions.

📚 **Library Management**: Effortlessly organize and search through your personal uploads or the global collection with a high-performance search interface.

🔐 **Auth & Subscription**: Secure user access via email and social login, paired with a robust billing system to manage premium features and platform subscriptions.

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
The AI doesn't just search it comprehends. It understands context, recalls relationships between ideas, and provides thoughtful, contextual answers about your books.

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
## Clone the repo
git clone https://github.com/Shahzaibdev355/bookified.git
cd bookified

## Install dependencies
pnpm install

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NODE_ENV='development'
NEXT_PUBLIC_BASE_URL=

# CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# VERCEL BLOB
BLOB_READ_WRITE_TOKEN=

# MONGODB
MONGODB_URI=

# VAPI
NEXT_PUBLIC_VAPI_API_KEY=
VAPI_SERVER_SECRET=

# Google Gemini API for embeddings
GOOGLE_GEMINI_API_KEY=

# ELEVENLABS
ELEVENLABS_API_KEY=
```

Replace the placeholder values with your real credentials. You can get these by signing up at: [**Clerk**](https://clerk.com), [**Vercel**](https://vercel.com), [**MongoDB**](https://www.mongodb.com), [**Vapi**](https://vapi.ai), [**Google AI Studio**](https://aistudio.google.com), [**ElevenLabs**](https://elevenlabs.io).

## Run development server
pnpm dev

## Open http://localhost:3000
Build & Deploy

## Build for production
pnpm build

# Start production server
pnpm start

📄 License
This project is open source under the MIT License.

🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.

📧 Email: Contact via GitHub Issues
<br/>
🐛 Report Issue: Open an issue
<br/>
⭐ Star this repo if you find it useful!
<br/>
Built with ❤️ by Shahzaibdev355
