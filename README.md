# ARC Construction Website

A modern, full-stack construction company website built with Laravel API backend and React frontend. This project provides a complete content management system for construction companies to showcase their services, projects, articles, and testimonials.

## 🏗️ Project Overview

**ARC Construction** is a professional construction company website featuring:
- **Public Website**: Showcasing company services, projects, blog articles, and testimonials
- **Admin Dashboard**: Complete content management system for administrators
- **Responsive Design**: Mobile-first approach using Bootstrap 5
- **Modern Stack**: Laravel 11 + React 18 with Vite

## 🚀 Features

### Public Website
- **Home Page**: Hero section with company overview and latest content
- **About Us**: Company information and team details
- **Services**: Comprehensive list of construction services offered
- **Projects**: Portfolio showcase with project details
- **Blog**: Articles and news related to construction industry
- **Contact**: Company contact information and location
- **Testimonials**: Client reviews and feedback

### Admin Dashboard
- **Authentication**: Secure login system using Laravel Sanctum
- **Services Management**: Create, read, update, delete services
- **Projects Management**: Manage portfolio projects with images
- **Articles Management**: Blog content management with rich text editor
- **Testimonials Management**: Client testimonial management
- **Image Upload**: Temporary image upload system
- **Dashboard**: Admin overview and navigation

## 🛠️ Technology Stack

### Backend (Laravel API)
- **Framework**: Laravel 11
- **PHP Version**: 8.2+
- **Database**: MySQL
- **Authentication**: Laravel Sanctum (API tokens)
- **Image Processing**: Intervention Image
- **Testing**: Pest PHP

### Frontend (React SPA)
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **UI Framework**: Bootstrap 5 + React Bootstrap
- **Styling**: SCSS
- **Forms**: React Hook Form
- **Rich Text Editor**: Jodit React
- **Notifications**: React Toastify
- **HTTP Client**: Fetch API

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

### Core Tables
- **users**: Admin user authentication
- **services**: Construction services offered
- **projects**: Portfolio projects with details
- **articles**: Blog articles and news
- **testimonials**: Client testimonials
- **temp_images**: Temporary image uploads
- **members**: Team members (planned feature)

### Key Fields
```sql
-- Services Table
services: id, title, slug, short_desc, content, image, status, timestamps

-- Projects Table
projects: id, title, slug, short_desc, content, construction_type,
         sector, location, image, status, timestamps

-- Articles Table
articles: id, title, slug, author, content, image, status, timestamps

-- Testimonials Table
testimonials: id, testimonial, title, citation, image, status, timestamps
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

### Authentication
```bash
# Login
POST /api/authenticate
{
    "email": "admin@example.com",
    "password": "password"
}

# Logout (requires token)
GET /api/logout
Authorization: Bearer {token}
```

### Public Endpoints
```bash
# Get all services
GET /api/get-services

# Get latest services
GET /api/get-latest-services?limit=3

# Get all projects
GET /api/get-projects

# Get latest projects
GET /api/get-latest-projects?limit=6

# Get all articles
GET /api/get-articles

# Get latest articles
GET /api/get-latest-articles?limit=3

# Get all testimonials
GET /api/get-testimonials

# Get latest testimonials
GET /api/get-latest-testimonials?limit=3
```

### Protected Endpoints (require authentication)
```bash
# Services CRUD
GET    /api/services
POST   /api/services
GET    /api/services/{id}
PUT    /api/services/{id}
DELETE /api/services/{id}

# Projects CRUD
GET    /api/projects
POST   /api/projects
GET    /api/projects/{id}
PUT    /api/projects/{id}
DELETE /api/projects/{id}

# Articles CRUD
GET    /api/articles
POST   /api/articles
GET    /api/articles/{id}
PUT    /api/articles/{id}
DELETE /api/articles/{id}

# Testimonials CRUD
GET    /api/testimonials
POST   /api/testimonials
GET    /api/testimonials/{id}
PUT    /api/testimonials/{id}
DELETE /api/testimonials/{id}

# Image Upload
POST   /api/temp-images
```

## 🎨 Frontend Routes

### Public Routes
- `/` - Home page
- `/about` - About us page
- `/services` - Services listing
- `/projects` - Projects portfolio
- `/blogs` - Articles/blog listing
- `/contact-us` - Contact information

### Admin Routes (Protected)
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/services` - Services management
- `/admin/services/create` - Create new service
- `/admin/services/edit/:id` - Edit service
- `/admin/projects` - Projects management
- `/admin/projects/create` - Create new project
- `/admin/projects/edit/:id` - Edit project
- `/admin/articles` - Articles management
- `/admin/articles/create` - Create new article
- `/admin/articles/edit/:id` - Edit article
- `/admin/testimonials` - Testimonials management
- `/admin/testimonials/create` - Create new testimonial
- `/admin/testimonials/edit/:id` - Edit testimonial

## 🔒 Security Features

- **Laravel Sanctum**: API token authentication
- **CSRF Protection**: Built-in Laravel CSRF protection
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Eloquent ORM prevents SQL injection
- **XSS Protection**: Laravel's built-in XSS protection
- **Password Hashing**: Bcrypt password hashing
- **Route Protection**: Middleware-based route protection

## 🧪 Testing

### Backend Testing
```bash
cd backend
php artisan test
```

### Frontend Testing
```bash
cd frontend
npm run test
```

## 📦 Deployment

### Backend Deployment
1. Set up production server with PHP 8.2+, MySQL, and web server
2. Clone repository and install dependencies
3. Configure production environment variables
4. Run migrations and optimize for production:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

### Frontend Deployment
1. Build production assets:
   ```bash
   npm run build
   ```
2. Deploy `dist` folder to web server or CDN

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Ammar Rasool
- **Company**: ARC Construction
- **Contact**: ammar@mail.com


## 📞 Support

For support and questions:
- Email: ammar@mail.com
- Phone: (021-000-000-111)
- Address: Gulshan-e-Iqbal Block-11, Karachi, Sindh, Pakistan

---

**Built with ❤️ for the construction industry**