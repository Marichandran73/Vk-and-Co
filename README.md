# VK-and-Co

Modern, fully responsive Single Page Web Application for **VK-and-Co** — Quality Construction Materials & Industrial Products.

## Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **Framer Motion** (animations)
- **React Router**
- **EmailJS** (contact/lead emails)
- **react-icons**

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build & Deploy

```bash
npm run build
npm run preview   # preview production build
```

Deploy the `dist` folder to any static host (Vercel, Netlify, etc.).

## Environment (optional)

Copy `.env.example` to `.env` and set:

- **Admin**: `VITE_ADMIN_USER` and `VITE_ADMIN_PASS` (default: `admin` / `admin123`)
- **EmailJS**: Sign up at [emailjs.com](https://www.emailjs.com/), create an Email Service and Template, then set:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`

Template variables used: `to_email`, `from_name`, `from_phone`, `from_email`, `message`. Set "To Email" to `marichandran2000@gmail.com` or use the variable in the template.

## Features

- **Home**: Hero, Products (from JSON), About, Location (Google Maps), Contact buttons (Call / WhatsApp)
- **Lead popup**: After 20 seconds, modal form (Name, Phone, Email, Message); submits via EmailJS and stores leads in localStorage for Admin
- **Admin** (`/admin`): Login, then Dashboard to edit Products, Company info, and view Customer Leads. Edits are stored in localStorage (products/company appear on main site after refresh)

## Product Images

Place product images in `public/images/`:

- `nail.jpg` — Construction Nail
- `concrete-wall.jpg` — Concrete Wall Blocks
- `hollow-block.jpg` — Hollow Blocks
- `plastic-pipes.jpg` — Plastic Water Pipes

If an image is missing, a placeholder is shown. You can also set full image URLs in Admin → Products.

## Google Maps

To use an exact location on the map: open [Google Maps](https://maps.google.com), search for your address, click **Share** → **Embed a map**, copy the `src` URL and paste it in Admin → Company → Google Maps embed URL (or in `src/data/company.json` → `location.mapsEmbedUrl`).
