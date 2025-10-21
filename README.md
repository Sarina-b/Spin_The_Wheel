A fun and interactive Spin the Wheel web application built with Django.
fun and interactive Spin the Wheel web application built with Django, featuring user authentication, daily spin limits, streak tracking, and a history system to keep players engaged every day.
Users type in their own options, and when they spin the wheel, it randomly selects one!

Features
* User Authentication
 * Sign up, log in, and log out
 * Secure password validation
 * Email uniqueness enforcement

* Profile System
 * Each user automatically gets a profile on registration
 * Stores daily spin stats and streak info

* Spin System
 * Users can spin up to 20 times per day
 * Randomized spin results

* Streak & Daily Rewards
 * Tracks consecutive login days
 * Resets spin count each day
 * Maintains streak even across multiple sessions

* Spin History
 * View the last 50 spins with results and timestamps


* Project Structure

Spin_The_Wheel/
│
├── accounts/
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── signals.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   ├── __init__.py
│   │
│   ├── migrations/
│   │   ├── 0001_initial.py
│   │   └── __init__.py
│   │
│   ├── static/
│   │   ├── accounts/
│   │   │   ├── help_style.css
│   │   │   ├── privacy_style.css
│   │   │   ├── script.js
│   │   │   ├── small_wheel.jpg
│   │   │   ├── style.css
│   │   │   └── wheel2.webp
│   │   │
│   │   ├── css/
│   │   │   └── fonts.css
│   │   │
│   │   └── fonts/
│   │       ├── Poppins-Bold.ttf
│   │       ├── Poppins-Medium.ttf
│   │       └── Poppins-Regular.ttf
│   │
│   └── templates/accounts/
│       ├── auth.html
│       ├── help.html
│       └── privacy.html
│
├── spin/
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   ├── utils.py
│   ├── views.py
│   ├── __init__.py
│   │
│   ├── migrations/
│   │   ├── 0001_initial.py
│   │   └── __init__.py
│   │
│   ├── static/spin/
│   │   ├── history_style.css
│   │   ├── spin_wheel.js
│   │   ├── wheel_draw.js
│   │   │
│   │   └── css/
│   │       ├── base.css
│   │       ├── controls.css
│   │       ├── layout.css
│   │       ├── navbar.css
│   │       ├── responsive.css
│   │       └── wheel.css
│   │
│   └── templates/spin/
│       ├── dashboard.html
│       └── history_page.html
│
├── Spin_The_Wheel/
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── __init__.py
│
└── templates/

* API Endpoints
/	              GET	       Authentication page (Login/Signup)
/dashboard/	    GET	       Main user dashboard
/api/spin/	    POST	     Perform a spin (requires login)
/history/	      GET	       Shows user's last 50 spin results
/logout/	      GET	       Log out from session

* Tech Stack
Backend: Django 5.x
Frontend: HTML, CSS , JavaScript
Database: SQLite and Django's Default DB (Models)
Authentication: Django’s built-in auth system
Messages & Signals: Django signals for streak tracking

How It Works
 * User signs up or logs in
 * A Profile is automatically created via Django signals
On each login:
 * Daily spin count resets
 * Streak count updates
When spinning:
 * Random result is selected from provided segments
 * Spin history is saved
 * Spin limit decreases


Author
Sarina
Computer Engineering Student | Passionate about Web Development
Reach me at: sarinababadi900@gmail.com
GitHub: Sarina-b



