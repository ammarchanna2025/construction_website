# ARC Construction Website

A modern, full-stack construction company website built with Laravel API backend and React frontend. This comprehensive platform provides a complete content management system for construction companies to showcase their services, projects, articles, and testimonials with a professional admin dashboard.

## 🏗️ Project Overview

**ARC Construction** is a fully functional construction company website featuring:
- **Public Website**: Professional showcase of company services, projects, blog articles, and testimonials
- **Admin Dashboard**: Complete content management system with authentication and CRUD operations
- **Responsive Design**: Mobile-first approach using Bootstrap 5 with modern UI components
- **Modern Stack**: Laravel 11 + React 18 with Vite for optimal performance

## 🚀 Current Features & Capabilities

### Public Website
- **Home Page**: Dynamic hero section with company overview and latest content from all sections
- **About Us**: Company information, mission, and team presentation
- **Services**: Dynamic listing of construction services with detailed descriptions
- **Projects**: Portfolio showcase with project details, images, and categorization
- **Blog**: Articles and news with rich content and image support
- **Contact**: Company contact information with interactive contact form
- **Testimonials**: Client reviews and feedback with image support

### Admin Dashboard
- **Secure Authentication**: Laravel Sanctum-based login system with session management
- **Services Management**: Complete CRUD operations for construction services
- **Projects Management**: Full project portfolio management with image uploads
- **Articles Management**: Blog content management with rich text editor (Jodit)
- **Testimonials Management**: Client testimonial management with image support
- **Members Management**: Team member profiles with social media links
- **Image Upload System**: Temporary image upload with cleanup functionality
- **Dashboard Analytics**: Real-time statistics and recent activity overview

## 🛠️ Technology Stack

### Backend (Laravel API)
- **Framework**: Laravel 11 (Latest LTS)
- **PHP Version**: 8.2+
- **Database**: MySQL with Eloquent ORM
- **Authentication**: Laravel Sanctum (API token-based)
- **Image Processing**: Intervention Image v3.9
- **Testing**: Pest PHP v3.3
- **Additional**: Laravel Tinker for database interaction

### Frontend (React SPA)
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.8 (Fast HMR and optimized builds)
- **Routing**: React Router DOM v6.27.0
- **UI Framework**: Bootstrap 5.3.3 + React Bootstrap 2.10.5
- **Styling**: SCSS/Sass with custom variables and mixins
- **Forms**: React Hook Form 7.53.1 (Performance-optimized forms)
- **Rich Text Editor**: Jodit React 4.1.2 (WYSIWYG editor)
- **Notifications**: React Toastify 10.0.6
- **Carousel**: Swiper 11.1.14 for testimonials and galleries
- **Icons**: Bootstrap Icons 1.11.3
- **HTTP Client**: Native Fetch API with custom utilities

## 📁 Project Structure

```
project/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── admin/      # Admin controllers
│   │   │   └── front/      # Public API controllers
│   │   └── Models/         # Eloquent models
│   ├── database/
│   │   └── migrations/     # Database migrations
│   ├── routes/
│   │   ├── api.php        # API routes
│   │   └── web.php        # Web routes
│   └── config/            # Configuration files
│
└── frontend/               # React SPA
    ├── src/
    │   ├── components/
    │   │   ├── backend/    # Admin components
    │   │   ├── frontend/   # Public components
    │   │   └── common/     # Shared components
    │   ├── assets/         # Images, styles
    │   └── App.jsx         # Main app component
    └── public/             # Static assets
```

## 🗄️ Database Schema

### Implemented Tables
- **users**: Admin user authentication and session management
- **services**: Construction services with rich content and images
- **projects**: Portfolio projects with categorization and location data
- **articles**: Blog articles with author attribution and rich content
- **testimonials**: Client testimonials with images and citations
- **members**: Team member profiles with social media integration
- **temp_images**: Temporary image upload system with cleanup
- **personal_access_tokens**: Laravel Sanctum authentication tokens

### Complete Database Structure
```sql
-- Users Table (Authentication)
users: id, name, email, email_verified_at, password, remember_token, timestamps

-- Services Table (Construction Services)
services: id, title, slug, short_desc, content, image, status, timestamps

-- Projects Table (Portfolio)
projects: id, title, slug, short_desc, content, construction_type,
         sector, location, image, status, timestamps

-- Articles Table (Blog Content)
articles: id, title, slug, author, content, image, status, timestamps

-- Testimonials Table (Client Reviews)
testimonials: id, testimonial, title, citation, image, status, timestamps

-- Members Table (Team Profiles)
members: id, name, designation, email, phone, bio, image,
         linkedin, twitter, status, timestamps

-- Temp Images Table (Upload System)
temp_images: id, name, timestamps
```

## 🔧 Installation & Setup

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- MySQL database
- Git

### Backend Setup (Laravel)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project/backend
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure database in `.env`**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=react_laravel_db
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

5. **Run migrations**
   ```bash
   php artisan migrate
   ```

6. **Create admin user (optional)**
   ```bash
   php artisan tinker
   User::create([
       'name' => 'Admin',
       'email' => 'admin@example.com',
       'password' => bcrypt('password')
   ]);
   ```

7. **Start the server**
   ```bash
   php artisan serve
   ```
   Backend will be available at `http://localhost:8000`

### Frontend Setup (React)

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

## 🔐 API Documentation

### Authentication System
```bash
# Admin Login
POST /api/authenticate
Content-Type: application/json
{
    "email": "admin@example.com",
    "password": "password"
}

# Response
{
    "status": true,
    "token": "bearer_token_here",
    "user": { "id": 1, "name": "Admin", "email": "admin@example.com" }
}

# Logout (requires authentication)
GET /api/logout
Authorization: Bearer {token}
```

### Public API Endpoints
```bash
# Services
GET /api/get-services              # All services
GET /api/get-latest-services       # Latest services (limit parameter supported)

# Projects
GET /api/get-projects              # All projects
GET /api/get-latest-projects       # Latest projects (limit parameter supported)

# Articles/Blog
GET /api/get-articles              # All articles
GET /api/get-latest-articles       # Latest articles (limit parameter supported)

# Testimonials
GET /api/get-testimonials          # All testimonials
GET /api/get-latest-testimonials   # Latest testimonials (limit parameter supported)

# Members
GET /api/get-members               # All team members
GET /api/get-latest-members        # Latest members (limit parameter supported)
```

### Protected Admin Endpoints
All admin endpoints require `Authorization: Bearer {token}` header.

```bash
# Dashboard Analytics
GET /api/dashboard                 # Statistics and recent activities

# Services Management
GET    /api/services               # List all services
POST   /api/services               # Create new service
GET    /api/services/{id}          # Get specific service
PUT    /api/services/{id}          # Update service
DELETE /api/services/{id}          # Delete service

# Projects Management
GET    /api/projects               # List all projects
POST   /api/projects               # Create new project
GET    /api/projects/{id}          # Get specific project
PUT    /api/projects/{id}          # Update project
DELETE /api/projects/{id}          # Delete project

# Articles Management
GET    /api/articles               # List all articles
POST   /api/articles               # Create new article
GET    /api/articles/{id}          # Get specific article
PUT    /api/articles/{id}          # Update article
DELETE /api/articles/{id}          # Delete article

# Testimonials Management
GET    /api/testimonials           # List all testimonials
POST   /api/testimonials           # Create new testimonial
GET    /api/testimonials/{id}      # Get specific testimonial
PUT    /api/testimonials/{id}      # Update testimonial
DELETE /api/testimonials/{id}      # Delete testimonial

# Members Management
GET    /api/members                # List all members
POST   /api/members                # Create new member
GET    /api/members/{id}           # Get specific member
PUT    /api/members/{id}           # Update member
DELETE /api/members/{id}           # Delete member

# Image Upload System
POST   /api/temp-images            # Upload temporary image
POST   /api/temp-images/cleanup    # Cleanup unused images
```

## 🎨 Frontend Application Routes

### Public Website Routes
- `/` - Home page with hero section and latest content
- `/about` - About us page with company information
- `/services` - Services listing with dynamic content from API
- `/projects` - Projects portfolio with filtering and categorization
- `/blogs` - Articles/blog listing with search and pagination
- `/contact-us` - Contact information with interactive form

### Admin Panel Routes (Authentication Required)
- `/admin/login` - Secure admin login with session management
- `/admin/dashboard` - Analytics dashboard with statistics and recent activities

#### Services Management
- `/admin/services` - Services listing with search and status filtering
- `/admin/services/create` - Create new service with rich text editor
- `/admin/services/edit/:id` - Edit existing service with image upload

#### Projects Management
- `/admin/projects` - Projects listing with categorization
- `/admin/projects/create` - Create new project with detailed fields
- `/admin/projects/edit/:id` - Edit project with construction type and location

#### Articles Management
- `/admin/articles` - Articles listing with author and status management
- `/admin/articles/create` - Create new article with Jodit rich text editor
- `/admin/articles/edit/:id` - Edit article with image and content management

#### Testimonials Management
- `/admin/testimonials` - Testimonials listing with client information
- `/admin/testimonials/create` - Create new testimonial with image upload
- `/admin/testimonials/edit/:id` - Edit testimonial with citation management

#### Members Management
- `/admin/members` - Team members listing with social media links
- `/admin/members/create` - Create new member profile with bio and contacts
- `/admin/members/edit/:id` - Edit member with designation and social links

## 🔒 Security & Performance Features

### Security Implementation
- **Laravel Sanctum**: Token-based API authentication with automatic session management
- **CSRF Protection**: Built-in Laravel CSRF protection for all forms and requests
- **Input Validation**: Comprehensive server-side validation for all user inputs
- **SQL Injection Protection**: Eloquent ORM with parameterized queries and safe data binding
- **XSS Protection**: Laravel's built-in XSS filtering and automatic output escaping
- **Password Hashing**: Bcrypt password hashing with salt for secure user authentication
- **Route Protection**: Middleware-based authentication for all admin routes
- **File Upload Security**: Validated image uploads with type checking and size limits

### Performance Optimizations
- **Vite Build System**: Fast development server with HMR and optimized production builds
- **Image Processing**: Intervention Image library for efficient image resizing and optimization
- **API Optimization**: Efficient database queries with Eloquent relationships and eager loading
- **Frontend Performance**: Code splitting, lazy loading, and optimized bundle sizes
- **SCSS Compilation**: Optimized CSS with variables, mixins, and tree-shaking


## 🎯 Key Features Summary

### Content Management Capabilities
- ✅ **Services**: Full CRUD with rich text content and image uploads
- ✅ **Projects**: Portfolio management with categorization and location data
- ✅ **Articles**: Blog system with author attribution and rich content editor
- ✅ **Testimonials**: Client reviews with images and citation management
- ✅ **Members**: Team profiles with social media integration
- ✅ **Dashboard**: Real-time analytics and activity monitoring

### Technical Capabilities
- ✅ **Authentication**: Secure token-based admin authentication
- ✅ **Image Management**: Upload, resize, and optimize images automatically
- ✅ **Responsive Design**: Mobile-first design with Bootstrap 5
- ✅ **Rich Text Editing**: WYSIWYG editor for content creation
- ✅ **API Integration**: RESTful API with comprehensive endpoints
- ✅ **Error Handling**: Graceful error handling with user feedback


## 👥 Development Team

- **Lead Developer**: Ammar Rasool
- **Contact**: ammar.channa2003@outlook.com
- **Github**: github.com/ammarchanna2025
- **Address**: Gulshan-e-Iqbal Block-11, Karachi, Sindh, Pakistan

---

**Built with ❤️ for the construction industry**