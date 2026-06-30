# Candidate Transformer

AI-powered candidate profile consolidation pipeline that transforms candidate information from multiple sources into a single canonical JSON representation.

The pipeline combines data from:

- Resume PDF (Gemini + PyMuPDF)
- Recruiter CSV
- GitHub Profile

It produces a unified candidate profile with:

- Canonical schema
- Confidence scoring
- Provenance tracking
- Runtime configurable output schema

---

## Features

- AI-powered Resume Parsing using Google Gemini
- Recruiter CSV Parsing
- GitHub Profile Integration
- Canonical Profile Normalization
- Multi-source Merge Engine
- Confidence Score Generation
- Provenance Tracking
- Runtime Configurable Output Projection
- REST API (FastAPI)
- Modern React Frontend
- CLI Support

---

## Tech Stack

### Backend

- Python 3.12
- FastAPI
- Google Gemini
- Pandas
- PyMuPDF
- RapidFuzz
- Requests

### Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion

---

# Project Structure

```
candidate-transformer/

├── app/
├── config/
├── frontend/
├── inputs/
├── tests/
├── requirements.txt
├── pyproject.toml
├── main.py
├── .env.example
└── README.md
```

---

# Prerequisites

- Python 3.12+
- Node.js 20+
- npm
- Git

---

# Clone Repository

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/candidate-transformer.git

cd candidate-transformer
```

---

# Backend Setup

Create a virtual environment

```bash
python -m venv .venv
```

Activate it

### macOS/Linux

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

# Environment Variables

Copy the example file

```bash
cp .env.example .env
```

Fill in the following variables:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

GEMINI_MODEL=gemini-2.5-flash

GITHUB_TOKEN=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
```

---

# Running the Backend API

Start FastAPI

```bash
python -m uvicorn app.api:app --reload
```

API

```
http://127.0.0.1:8000
```

Swagger UI

```
http://127.0.0.1:8000/docs
```

---

# Running the Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend

```
http://localhost:5173
```

---

# Running via CLI

The complete transformation pipeline can also be executed directly from the terminal.

Example:

```bash
python -m app.cli.main \
    --resume inputs/resumes/f1.pdf \
    --csv inputs/csv/recruiter.csv \
    --github MrKhan092 \
    --config config/output.json
```

The CLI prints the transformed candidate JSON.

---

# Input Formats

## Resume

- PDF

## Recruiter CSV

Required columns

| Column |
|---------|
| name |
| email |
| phone |
| current_company |
| title |

Example

```csv
name,email,phone,current_company,title
John Doe,john@gmail.com,+919999999999,Google,SDE
```

## GitHub

Provide only the GitHub username.

Example

```
torvalds
```

---

# Runtime Configurable Output

The output schema is configurable at runtime. Simply edit:

```text
config/output.json
```

You can:

- Select only the required fields.
- Rename or remap fields using `"from"`.
- Enable or disable confidence and provenance.
- Configure missing value handling (`null`, `omit`, or `error`).

After updating the configuration, rerun the same CLI command—no code changes are required.

Example:

```json
{
  "fields": [
    {
      "path": "candidate_name",
      "from": "full_name"
    },
    {
      "path": "email",
      "from": "primary_email"
    }
  ],
  "include_confidence": false,
  "on_missing": "omit"
}
```

---

# REST API

### Endpoint

```
POST /transform
```

### Form Data

| Field | Type |
|--------|------|
| resume | File |
| recruiter_csv | File |
| github_username | String |

Returns

```
Canonical Candidate JSON
```

---

# Live Demo

### Frontend (Vercel)

```
https://YOUR_FRONTEND_URL.vercel.app
```

### Backend (Render)

```
https://YOUR_BACKEND_URL.onrender.com
```

---

# Example Pipeline

```
Resume PDF
      │
      ▼
Recruiter CSV
      │
      ▼
GitHub Username
      │
      ▼
Normalization
      │
      ▼
Merge Engine
      │
      ▼
Confidence Engine
      │
      ▼
Provenance Engine
      │
      ▼
Projection Engine
      │
      ▼
Canonical Candidate JSON
```

---

# Deployment

### Backend

- Render

### Frontend

- Vercel

---

# Notes

- A valid Google Gemini API key is required.
- A GitHub Personal Access Token is recommended to avoid API rate limits.
- The Render free instance may take 30–50 seconds to respond after inactivity (cold start).
- A scheduled cron job periodically pings the backend to reduce cold starts.

---


