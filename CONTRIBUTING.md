# Contributing

Thank you for considering a contribution.

## Before opening a pull request

1. Explain the proposed change in an issue or discussion when it affects the data model.
2. Keep official syllabus statements faithful to the cited source.
3. Include source document details and page references for changes to extracted syllabus content.
4. Do not add inferred learning subtopics to `syllabus_statements`.
5. Put community-created learning taxonomies in a separately identified structure with clear provenance.
6. Run `npm install` and `npm run validate`.
7. Describe the changes and the source used in your pull request.

## Data quality rules

- Subject IDs must be stable, lowercase, and kebab-case.
- Section numbers must be unique and continuous within a paper/year dataset.
- Do not silently rename or remove existing IDs.
- Keep year-specific datasets separate.
- Preserve the distinction between official source statements and community annotations.
