/Candidate-Search-Tool
│
├── /environment
│   └── .env
│
├── /public
│   └── vite.svg
│
├── /src
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   │
│   ├── /api
│   │   └── API.tsx
│   │
│   ├── /assets
│   │   └── react.svg
│   │
│   ├── /components
│   │   └── Nav.tsx
│   │
│   ├── /interfaces
│   │   └── Candidate.interface.tsx
│   │
│   └── /pages
│       ├── CandidateSearch.tsx
│       ├── ErrorPage.tsx
│       └── SavedCandidate.tsx
│
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── LICENSE
├── package.json
├── README.md
├── tsconfig.json
|-- tsconfig.node.json
└── vite.config.ts

curl --request GET \
--url "https://api.github.com/octocat" \
--header "Authorization: Bearer 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" \
--header "X-GitHub-Api-Version: 2022-11-28"