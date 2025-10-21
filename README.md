# Spin The Wheel – Django Web App

A fun and interactive **Spin the Wheel** web application built with **Django**, featuring **user authentication**, **daily spin limits**, **streak tracking**, and a **history system** to keep players engaged every day.  

Users type in their own options, and when they spin the wheel, it randomly selects one! 🎯  

---

## Features

### User Authentication
- Sign up, log in, and log out  
- Secure password validation  
- Email uniqueness enforcement  

### Profile System
- Each user automatically gets a profile upon registration  
- Stores daily spin stats and streak info  

### Spin System
- Users can spin up to **20 times per day**  
- Randomized spin results  

### Streak & Daily Rewards
- Tracks consecutive login days  
- Resets spin count each day  
- Maintains streak even across multiple sessions  

### Spin History
- View the last **50 spins** with results and timestamps  

---
## 🧱 Project Structure
│
├── accounts/
│ ├── admin.py
│ ├── apps.py
│ ├── forms.py
│ ├── models.py
│ ├── signals.py
│ ├── tests.py
│ ├── urls.py
│ ├── views.py
│ ├── init.py
│ │
│ ├── migrations/
│ │ ├── 0001_initial.py
│ │ └── init.py
│ │
│ ├── static/
│ │ ├── accounts/
│ │ │ ├── help_style.css
│ │ │ ├── privacy_style.css
│ │ │ ├── script.js
│ │ │ ├── small_wheel.jpg
│ │ │ ├── style.css
│ │ │ └── wheel2.webp
│ │ │
│ │ ├── css/
│ │ │ └── fonts.css
│ │ │
│ │ └── fonts/
│ │ ├── Poppins-Bold.ttf
│ │ ├── Poppins-Medium.ttf
│ │ └── Poppins-Regular.ttf
│ │
│ └── templates/accounts/
│ ├── auth.html
│ ├── help.html
│ └── privacy.html
│
├── spin/
│ ├── admin.py
│ ├── apps.py
│ ├── models.py
│ ├── tests.py
│ ├── urls.py
│ ├── utils.py
│ ├── views.py
│ ├── init.py
│ │
│ ├── migrations/
│ │ ├── 0001_initial.py
│ │ └── init.py
│ │
│ ├── static/spin/
│ │ ├── history_style.css
│ │ ├── spin_wheel.js
│ │ ├── wheel_draw.js
│ │ │
│ │ └── css/
│ │ ├── base.css
│ │ ├── controls.css
│ │ ├── layout.css
│ │ ├── navbar.css
│ │ ├── responsive.css
│ │ └── wheel.css
│ │
│ └── templates/spin/
│ ├── dashboard.html
│ └── history_page.html
│
├── Spin_The_Wheel/
│ ├── asgi.py
│ ├── settings.py
│ ├── urls.py
│ ├── wsgi.py
│ └── init.py
│
└── templates/
(base templates if used)

---

## API Endpoints

| Endpoint | Method | Description |
|---------------|--------|------------------------------------|
| `/`           | GET    | Authentication page (Login/Signup) |
| `/dashboard/` | GET    | Main user dashboard                |
| `/api/spin/`  | POST   | Perform a spin (requires login)    |
| `/history/`   | GET    | Show user's last 50 spin results   |
| `/logout/`    | GET    | Log out from session               |

---

## Tech Stack

- **Backend:** Django 5.x  
- **Frontend:** HTML, CSS, JavaScript  
- **Database:** SQLite (Django’s default ORM)  
- **Authentication:** Django’s built-in auth system  
- **Signals:** Django signals for streak tracking  

---

## How It Works

1. User **signs up** or **logs in**.  
2. A **Profile** is automatically created using Django signals.  
3. On each login:
   - Daily spin count resets.  
   - Streak count updates.  
4. When spinning:
   - A random result is chosen from the user’s custom options.  
   - Spin result is saved in history.  
   - Remaining spins decrease.  

---

## Author

**Sarina**  
Computer Engineering Student | Passionate about Web Development  

Email: [sarinababadi900@gmail.com](mailto:sarinababadi900@gmail.com)  
GitHub: [Sarina-b](https://github.com/Sarina-b)


