# Club Events Map

A **single-page web application (SPA)** built with **React, Firebase, Google Maps API, and Instagram Graph API**. The app displays **club events on a fullscreen map**, allows users to search for clubs by Instagram handle, follow clubs, and save their preferences. Login is contextual, triggered only when users want to follow clubs or save settings.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Goals & Motivation](#goals--motivation)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Frontend Components](#frontend-components)
- [Backend / Firebase](#backend--firebase)
- [Google Maps Integration](#google-maps-integration)
- [Instagram API Integration](#instagram-api-integration)
- [Development Roadmap](#development-roadmap)
- [Team Roles](#team-roles)
- [Next Steps & Recommendations](#next-steps--recommendations)
- [License](#license)

---

## Project Overview

This project enables users to **explore club events on a map interface**, follow clubs, and receive updates on their events. The app focuses on **intuitive club input, smart filters, and an engaging map interface**.

**User Flow:** [Figma Board](https://www.figma.com/board/qVWmtsXzRd5HufjlCckZKf/Untitled?node-id=0-1&t=6eZZVkbmvVQvQA9L-1)

---

## Goals & Motivation

### Consumer Goals

- Intuitive club input and search
- Smart filters that users actually use
- Map interface similar to Google Maps
- Ability to add clubs to personal list

### Personal Goals

- Incorporate backend functionality using Firebase
- Cloud storage for user accounts and preferences

---

## Core Features

| Category | Feature | Description |
|----------|---------|-------------|
| Sidebar | Club list | Displays followed clubs and events |
| List filters | Filter events | Filter by category, date, or club |
| Club event info | Info popup | Shows title, date/time, location, and description |
| Map | Event markers | Pins display club events on map |
| Info window | Marker popups | InfoWindow on marker click |
| Club handle search | Search bar | Search clubs by Instagram handle |
| Add club to list | Follow club | Add clubs to user's followed list |

**Data Layers**

- Club events pinned on the map
- Backend: Firebase for storage, authentication, and optional Instagram API scraping

---

## Tech Stack

**Frontend (Part 1 - Basic Setup)**

- React (SPA)
- HTML / CSS / JavaScript
- Git + GitHub for version control

**Backend**

- Firebase Authentication & Firestore
- Python (optional backend scripts)
- Google Maps API
- Instagram Graph API (optional for auto-fetching events)

**Advanced Features (Part 2 - Polishing)**

- Smart filters
- Instagram API integration
- Deployment via Firebase Hosting or Vercel

---

## Frontend Components

- `MapPage.js` – Fullscreen map with event markers and search bar
- `EventMarker.js` – Individual map pins with info popups
- `ClubSearch.js` – Search bar for Instagram handles
- `LoginModal.js` – Contextual login/signup modal
- `FollowedClubs.js` – Optional floating list of followed clubs

---

## Backend / Firebase

- **Firebase Auth:** Login / signup using email/password
- **Firestore Database:**
  - `users` collection → stores user info and followed clubs
  - `clubs` collection → stores club info and events (as subcollection)
- Optional Firebase Functions for Instagram API scraping

---

## Google Maps Integration

- Fullscreen map on page load
- Event markers from Firestore or Instagram API
- InfoWindow popup on marker click
- Map pans/zooms based on club search

---

## Instagram API Integration (Optional)

- Fetch club posts/events using Graph API
- Convert posts to structured events (title, description, date/time, location)

---

## Development Roadmap

1. **Project Setup**
   - React SPA with single `MapPage` component
   - Install Firebase, Google Maps API, React Router
   - Set up Firestore and Auth
2. **Map Display & Event Pins**
   - Render map on page load
   - Pull events from Firestore (default/public)
   - Display event pins with info popup
3. **Interactive Club Features**
   - Search for clubs by Instagram handle
   - Follow club triggers login modal if not logged in
   - Update Firestore after login
4. **User Authentication (Modal-Based)**
   - Login/signup modal triggered on interaction
   - Firebase Auth integration
   - Save user session to Firestore
5. **Event Management**
   - Clubs’ events stored in Firestore
   - Integration with Instagram API
6. **Testing & Deployment**
   - Verify map works without login
   - Ensure events and user actions are saved post-login
   - Deploy SPA (Firebase Hosting or Vercel)

---

## Team Roles (4 Members)

| Person | Primary Role | Secondary Role |
|--------|--------------|----------------|
| Dev 1 (Sunny) | Map & Event Display | Auth Modal support |
| Dev 2 (Almer) | Club Search & Follow | Event Input |
| Dev 3 (Yat) | Auth Modal & Firestore | Map Integration Support |
| Dev 4 (Andrew) | Event Management + API | Testing & Deployment |

---

## Next Steps & Recommendations

- Complete **map and event pin rendering** with Firestore data
- Implement **club search and follow** functionality
- Integrate **login modal** with Firebase Auth
- Optional: **Instagram API** for automatic event fetching
- Test SPA without login to ensure **progressive enhancement**
- Watch out for potential blockers:
  - API rate limits (Instagram / Google Maps)
  - Firestore security rules
  - Marker clustering for many events on map

---

