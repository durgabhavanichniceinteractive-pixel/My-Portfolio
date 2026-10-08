# Bhavani — Personal Developer Portfolio

> **Frontend Developer • QA Specialist • AI-Assisted Developer**  
> *"Building, testing and refining digital experiences that look stunning and perform reliably."*

---

## 🌟 Overview

This is a bespoke, editorial dark-mode personal portfolio website crafted specifically for **Bhavani**. It combines high-end visual elegance with a developer-first and QA-testing identity.

### 🎨 Design Highlights
- **Palette**: Deep Charcoal & Matte Black (`#060607`, `#0a0a0c`, `#111114`) accented with refined architectural Champagne Gold (`#d4af37`), derived directly from Bhavani's monogram logo.
- **Typography**: Space Grotesk (Expressive Display), Plus Jakarta Sans (Crisp Body), and JetBrains Mono (Technical/QA Telemetry).
- **Subtle Micro-Interactions**: Magnetic buttons, 3D browser tilt on mouse move, contextual custom cursor (desktop only), and smooth GSAP entrance reveals.
- **Zero Heavy Framework Lock-in**: Clean, modular Vanilla HTML5, modern CSS3 (Custom Properties & Grid), and pure JavaScript.

---

## 📁 File Structure

```text
bc/
├── index.html              # Complete semantic portfolio markup
├── style.css               # Bespoke design system & responsive styling
├── script.js               # Interactivity, GSAP reveals, QA simulator, modal, copy toast
├── server.js               # Zero-dependency local Node.js static server
├── README.md               # Customization and deployment instructions
└── assets/
    ├── images/
    │   ├── bhavani-logo.jpg          # Bhavani's authentic monogram logo
    │   ├── bhavani-logo.png          # Logo PNG alias
    │   └── portrait-placeholder.jpg   # Editorial portrait placeholder
    ├── projects/
    │   ├── project-01.png            # Nexa AI Lab screenshot
    │   ├── project-02.png            # Project 02 showcase screenshot
    │   └── project-03.png            # Project 03 showcase screenshot
    └── icons/                        # Project icons directory
```

---

## 🚀 How to Run Locally

You can run the portfolio locally using the included zero-dependency Node.js server:

```bash
# In the project directory:
node server.js
```

Then open your browser at:
👉 **[http://127.0.0.1:3000](http://127.0.0.1:3000)**

Or open `index.html` directly in any web browser.

---

## ✏️ Customization & Easy Replacements

All editable areas in `index.html` are marked with `[EDIT THIS]` for effortless replacement:

### 1. Replacing Project Screenshots
Simply place your screenshots into the `assets/projects/` folder:
- **Project 01**: `assets/projects/project-01.png` (Nexa AI Lab)
- **Project 02**: `assets/projects/project-02.png` (Your second website)
- **Project 03**: `assets/projects/project-03.png` (Your third website or future project)

### 2. Updating Project Descriptions
In `index.html`, find `<article class="project-card" id="project-02">`:
- Replace `[PROJECT NAME]` with your website title.
- Replace the description text and feature bullet points.
- Update the GitHub link and live site URL.

### 3. Updating Portrait Image
Replace `assets/images/portrait-placeholder.jpg` with your personal photograph if desired.

### 4. Updating Social Links & Email
In `index.html`:
- Replace `[EDIT-THIS-LINKEDIN]` with your LinkedIn profile URL (e.g., `https://linkedin.com/in/bhavani-dev`).
- Update your contact email (`bhavani.dev@example.com`) in the contact section and modal.

### 5. Updating Journey / Experience
In `index.html`, find `<section id="journey">`:
- Replace the `[ROLE / TITLE]`, `[COMPANY / INSTITUTION]`, and `[YEAR – YEAR]` placeholders with your actual work experience or education milestones.

---

## 🌐 Deploying to the Web

### Deploy with GitHub Pages (Recommended)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Bhavani portfolio"
   git branch -M main
   git remote add origin https://github.com/durgabhavanichniceinteractive-pixel/portfolio.git
   git push -u origin main
   ```
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your site will be live at `https://durgabhavanichniceinteractive-pixel.github.io/portfolio/`!

### Deploy with Vercel or Netlify
- Drag and drop the project folder directly onto [Netlify Drop](https://app.netlify.com/drop) or import into [Vercel](https://vercel.com) for instant SSL deployment with zero build steps required.

---

© 2026 Bhavani. Built with care, craft, and precision.
