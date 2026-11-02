# GATE CS Syllabus Dataset

A machine-readable dataset for the GATE Computer Science and Information Technology (CS) syllabus.

## Current coverage

- Exam: GATE
- Paper: CS — Computer Science and Information Technology
- Year: 2027
- Organizing institute named in the source: IIT Madras
- Subjects: 10

The dataset is intended to make syllabus information easier to consume in study trackers, syllabus explorers, analytics tools and educational applications.

## Repository structure

```text
gate-cs-syllabus/
├── data/
│   └── gate-cs-2027.json
├── schema/
│   └── syllabus.schema.json
├── scripts/
│   └── validate.js
├── package.json
├── README.md
└── CONTRIBUTING.md
```

## Use the JSON directly

```javascript
const response = await fetch(
  "https://raw.githubusercontent.com/Nagadivya9515/GATE-Syllabus-JSON-Schema/main/data/gate-cs-2027.json"
);

if (!response.ok) {
  throw new Error(`Unable to load syllabus: ${response.status}`);
}

const syllabus = await response.json();
console.log(syllabus.subjects);
```

Replace `OWNER` in the `$schema` and schema `$id` URLs with your GitHub username after creating the repository. Replace `OWNER/REPOSITORY` in the fetch example with your actual GitHub owner and repository name.

## Validate locally

Requirements: Node.js 18 or later.

```bash
npm install
npm run validate
```

The validator checks:
- JSON Schema conformance.
- Unique subject IDs.
- Unique section numbers.
- Continuous section numbering beginning at 1.

Expected success output:

```text
Validation passed: 10 subjects, 2027 syllabus.
```

## Data modelling notes

`syllabus_statements` contains statements transcribed from the source syllabus. It intentionally does not claim that every phrase is an independently official topic or subtopic.

A future community-curated learning taxonomy can be added separately, with its own provenance and metadata, without changing the meaning of the official syllabus statements.

## Source and attribution

Source document supplied for this extraction: **GATE 2027 — Computer Science and Information Technology syllabus**, identifying IIT Madras as the organizing institute. The extracted syllabus statements are based on pages 1–2 of that document.

This repository is an independent community data project. It is not affiliated with, endorsed by, or maintained by IIT Madras or the GATE authorities. Verify the source document and applicable terms before redistributing official source material.

## License

The package currently declares `UNLICENSED` because redistribution rights for the source-derived syllabus data have not yet been established. Before public release, choose and document an appropriate license for original code/schema and clarify the terms applicable to the dataset.
