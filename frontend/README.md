# Social Media App - Frontend

A modern, responsive social media application built with React, Vite, and Tailwind CSS. Features a Twitter-like interface with a beautiful gradient design, interactive components, and responsive mobile-first layout with user authentication.

## 🔐 Authentication

### Login & Register Pages

The app includes unified Login/Register pages (`/login`, `/register`) with:

- **Email validation** with regex pattern matching
- **Password strength** requirements (minimum 6 characters)
- **Confirm password** verification on signup
- **Password visibility toggle** with eye icons
- **Form state management** with real-time validation
- **Error and success messages** with visual feedback
- **Loading states** with spinner animations
- **Responsive design** on all device sizes
- **API integration** with backend authentication endpoints

#### Login Features:

- Email and password fields
- Forgot password link
- Toggle to signup form
- JWT token storage in localStorage

#### Signup Features:

- Name, email, password, and confirm password fields
- Terms & Conditions checkbox
- Password confirmation validation
- Duplicate email detection
- Auto-login after successful registration

### Authentication Flow

1. **Unauthenticated Users**: Redirected to `/login`
2. **Login**: POST to `/api/user/login` with email and password
3. **Register**: POST to `/api/user/register` with user details
4. **Token Storage**: JWT token stored in `localStorage.authToken`
5. **User Session**: User data stored in `localStorage.user`
6. **Protected Routes**: Automatically redirects to login if token expires or is missing

### Protected Routes

All authenticated routes check for token validity:

- If token exists: Access app with Navbar + Sidebar
- If no token: Redirect to login page
- Loading state while checking authentication

## 🎨 Features

### Components

#### **Navbar**

- Sticky positioning with smooth scrolling
- Integrated search functionality (desktop)
- Responsive mobile menu with hamburger navigation
- Gradient-styled Sign Up and Login buttons
- Clean white background with subtle borders

#### **Sidebar**

- Fixed navigation with responsive design
- Gradient active states and hover effects
- Quick access to main features:
  - Home
  - Explore
  - Notifications (with badge indicator)
  - Messages
  - Bookmarks
  - Profile
- Compose button for creating new posts
- User profile card at the bottom

#### **PostCard Component**

- Reusable card component for displaying posts
- Features:
  - User avatar and verified badge
  - Author name, handle, and timestamp
  - Post content with optional images
  - Engagement statistics (replies, reposts, likes)
  - Interactive action buttons:
    - Reply
    - Repost
    - Like (with count update)
    - Share
  - Hover effects and smooth transitions
  - Fully responsive design

#### **Pages (Routes)**

##### **Login/Register** (`/login`, `/register`)

- Unified authentication interface
- Toggle between login and signup modes
- Email validation
- Password strength requirements
- JWT token handling
- API error handling
- Loading states

##### **Home** (`/`)

- Sticky feed header
- Compose section for writing new posts
- Feed with dummy posts
- Mix of text-only and image posts
- Verified and unverified user examples

##### **Explore** (`/explore`)

- Search bar for posts and people
- Trending topics grid
- Curated posts from popular creators
- Topic-based content discovery

##### **Messages** (`/messages`)

- Chat list with recent conversations
- Real-time messaging interface
- Search chats functionality
- Unread message indicators
- Responsive split layout (list on left, chat on right)

##### **Bookmarks** (`/bookmarks`)

- Collection of saved posts
- Same PostCard component for consistency
- Empty state when no bookmarks

##### **Profile** (`/profile`)

- Cover photo with profile customization
- User avatar and verified badge
- Bio and profile metadata (location, website, join date)
- Stats (followers, following)
- Tab navigation (Posts, Replies, Media, Likes)
- User's posts feed

##### **Settings** (`/settings`)

- Appearance preferences (Dark Mode toggle)
- Notification settings
- Privacy & Security options
- Account management
- Logout functionality

#### **App Layout**

- Three-column responsive layout
- Left: Sidebar navigation with active route highlighting
- Center: Main content area (Route components)
- Right: Trending sidebar (XL screens and up)
- Proper spacing and alignment across all screen sizes
- BrowserRouter setup in main.jsx for client-side routing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5174/`

## 📦 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Top navigation bar
│   │   ├── Sidebar.jsx      # Left sidebar navigation
│   │   └── PostCard.jsx     # Reusable post card component
│   ├── pages/
│   │   ├── Login.jsx        # Login/Register page (/login, /register)
│   │   ├── Register.jsx     # Alias for Login page
│   │   ├── Home.jsx         # Home feed page (/)
│   │   ├── Explore.jsx      # Explore page (/explore)
│   │   ├── Messages.jsx     # Messages page (/messages)
│   │   ├── Bookmarks.jsx    # Bookmarks page (/bookmarks)
│   │   ├── Profile.jsx      # User profile page (/profile)
│   │   └── Settings.jsx     # Settings page (/settings)
│   ├── assets/
│   │   └── assets.js        # Asset definitions
│   ├── App.jsx              # Main app component with authentication routing
│   ├── App.css              # App styles
│   ├── main.jsx             # Entry point with BrowserRouter
│   └── index.css            # Global styles
├── public/                  # Public assets
├── index.html               # HTML template
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
└── package.json            # Dependencies and scripts
```

│ │ ├── Profile.jsx # User profile page (/profile)
│ │ └── Settings.jsx # Settings page (/settings)
│ ├── assets/
│ │ └── assets.js # Asset definitions
│ ├── App.jsx # Main app component with Routes
│ ├── App.css # App styles
│ ├── main.jsx # Entry point with BrowserRouter
│ └── index.css # Global styles
├── public/ # Public assets
├── index.html # HTML template
├── vite.config.js # Vite configuration
├── eslint.config.js # ESLint configuration
└── package.json # Dependencies and scripts

```

## 🛣️ Routing & Authentication Flow

### Authentication Routes

| Path        | Component | Description                 |
| ----------- | --------- | --------------------------- |
| `/login`    | Login     | Login form                  |
| `/register` | Register  | Sign up form (uses Login)   |

### Protected Routes (Authenticated Users Only)

| Path             | Component | Description                                 |
| ---------------- | --------- | ------------------------------------------- |
| `/`              | Home      | Main feed page                              |
| `/explore`       | Explore   | Discover trending posts and topics          |
| `/notifications` | Home      | Notifications (currently redirects to Home) |
| `/messages`      | Messages  | Direct messaging interface                  |
| `/bookmarks`     | Bookmarks | Saved posts collection                      |
| `/profile`       | Profile   | User profile page                           |
| `/settings`      | Settings  | Account and app settings                    |

### Authentication Flow Diagram

```

1. App starts
   ↓
2. Check if token exists in localStorage
   ↓
   ├─→ Yes → Render authenticated app
   │ (Navbar + Sidebar + Route components)
   └─→ No → Redirect to /login
   (Show Login/Register page)
3. User login/register
   ↓
4. Receive JWT token from backend
   ↓
5. Store token in localStorage.authToken
   ↓
6. Redirect to home page
   ↓
7. User can now access all protected routes

````

### Router Setup

The app uses `BrowserRouter` from React Router v6, configured in `main.jsx`:

```jsx
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
````

Routes are defined in `App.jsx`:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/explore" element={<Explore />} />
  <Route path="/messages" element={<Messages />} />
  <Route path="/bookmarks" element={<Bookmarks />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/settings" element={<Settings />} />
</Routes>
```

## 🔌 API Integration

### Backend Connection

The frontend connects to the backend API at `http://localhost:3000/api`

```javascript
const API_URL = "http://localhost:3000/api/user";
```

### Authentication Endpoints

#### Register

```javascript
POST http://localhost:3000/api/user/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login

```javascript
POST http://localhost:3000/api/user/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Token Management

- **Token Storage**: Stored in `localStorage.authToken`
- **User Data**: Stored in `localStorage.user` (JSON string)
- **Headers**: Add token to requests:
  ```javascript
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
  }
  ```

### Error Handling

All API calls include try-catch blocks and display user-friendly error messages:

- Invalid email format
- Password mismatch
- User already exists
- Invalid credentials
- Server errors

## 🎯 Design System

### Color Scheme

- **Primary Gradient**: Blue (#3B82F6) to Purple (#9333EA)
- **Background**: White (#FFFFFF)
- **Border**: Light Gray (#E5E7EB)
- **Text**: Dark Gray (#111827) for primary, (#6B7280) for secondary
- **Accent**: Red (#EF4444) for likes, Green (#10B981) for reposts

### Typography

- **Logo**: 2xl font-bold with gradient text
- **Headings**: xl font-bold
- **Body**: base font-normal
- **Captions**: sm text-gray-500

### Spacing

- Uses Tailwind's standard spacing scale (px-4, py-3, etc.)
- Consistent 16px (1rem) base unit

## 🔧 Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

### Build

```bash
npm run build
```

Creates an optimized production build.

### Preview

```bash
npm run preview
```

Preview the production build locally.

### Lint

```bash
npm run lint
```

Run ESLint to check code quality.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (md:)
- **Tablet**: 768px - 1024px (lg:)
- **Desktop**: 1024px - 1280px (xl:)
- **Large Desktop**: > 1280px (2xl:)

### Key Responsive Changes:

- Sidebar: 20px (w-20) on mobile → 256px (w-64) on desktop
- Navbar: Simplified on mobile with hamburger menu
- Right sidebar: Hidden until XL screens
- Main feed: Full width on mobile, constrained with margins on desktop

## 🎭 Components Usage

### PostCard

```jsx
import { PostCard } from "./components/PostCard";

const post = {
  id: 1,
  author: {
    name: "John Doe",
    handle: "johndoe",
    avatar: "JD",
    verified: true,
  },
  content: "Your post content here",
  image: "image-url", // optional
  replies: 123,
  reposts: 456,
  likes: 789,
  timestamp: "2 hours ago",
};

<PostCard post={post} />;
```

## 🔗 Dependencies

### Core

- **React**: ^18.2.0 - UI library
- **React Router DOM**: ^6.4.0 - Client-side routing
- **Lucide React**: ^latest - Icon library

### Styling

- **Tailwind CSS**: ^3.3.0 - Utility-first CSS framework
- **PostCSS**: ^8.4.24 - CSS transformation tool

### Development

- **Vite**: ^4.3.0 - Frontend build tool
- **ESLint**: ^8.45.0 - Code quality tool
- **React Plugin for ESLint**: ^7.32.0

## 🎨 Customization

### Colors

Edit the Tailwind classes in components to customize:

- Change gradient colors: `from-blue-500 to-purple-600`
- Modify hover states: `hover:bg-gray-100`
- Update text colors: `text-gray-900`

### Fonts

Global font settings in `index.css` and component-level overrides in individual `.jsx` files.

### Spacing

All spacing follows Tailwind's scale. Modify `px-*`, `py-*`, `gap-*` classes as needed.

## 🚦 Current Status

### Completed ✅

- ✅ Modern responsive design
- ✅ Component-based architecture
- ✅ Gradient color scheme
- ✅ Mobile-first approach
- ✅ Interactive post cards
- ✅ Dummy data for demonstration
- ✅ Full routing with React Router v6
- ✅ Six complete pages with unique layouts
- ✅ Sidebar navigation with active route highlighting
- ✅ Right sidebar trending section
- ✅ Settings page with toggles
- ✅ Profile page with user info
- ✅ Messages page with chat interface
- ✅ Explore page with trending topics
- ✅ **User Authentication System**
  - ✅ Login page with email/password form
  - ✅ Register page with validation (name, email, password confirmation)
  - ✅ Protected routes (auth check on app start)
  - ✅ JWT token handling and storage
  - ✅ API integration with backend
  - ✅ Loading states and error messages
  - ✅ Success notifications
  - ✅ Password visibility toggle
  - ✅ Form validation (email, password length, password match)
  - ✅ Automatic redirect to login if unauthenticated

### Upcoming Features 🔄

- 🔄 User profile retrieval (GET /api/user/me)
- 🔄 Logout functionality
- 🔄 Real post data fetching (GET /api/posts)
- 🔄 Post composition API (POST /api/posts)
- 🔄 Like/repost functionality
- 🔄 Bookmark management
- 🔄 Search functionality
- 🔄 Real-time notifications
- 🔄 Profile image upload
- 🔄 Profile editing
- 🔄 Dark mode implementation
- 🔄 User profile editing
- 🔄 Chat persistence

## 📝 Notes

- All components use Tailwind CSS for styling
- Icons are from the Lucide React library
- Dummy data is provided in page components for demonstration
- The app is fully responsive from mobile to large desktop screens
- React Router v6 is used for client-side navigation
- Sidebar highlights the current active route
- All routes share the same Navbar and Sidebar layout

## 🤝 Contributing

When adding new routes:

1. Create page component in `src/pages/`
2. Add Route to `App.jsx`
3. Add navigation item to Sidebar if needed
4. Use Tailwind CSS for styling
5. Follow the established gradient color scheme
6. Update this README with route documentation

When adding new components:

1. Create component in `src/components/`
2. Use Tailwind CSS for styling
3. Ensure mobile responsiveness
4. Follow the established gradient color scheme
5. Add to this README

## 📄 License

This project is part of a MERN stack social media application.
