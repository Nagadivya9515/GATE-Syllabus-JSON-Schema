#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const Ajv2020 = require("ajv/dist/2020").default;
const addFormats = require("ajv-formats");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "data", "gate-cs-2027.json");
const schemaPath = path.join(root, "schema", "syllabus.schema.json");

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error(`Could not read or parse ${path.relative(root, filePath)}:`);
    console.error(error.message);
    process.exit(1);
  }
}

const data = readJson(dataPath);
const schema = readJson(schemaPath);

const ajv = new Ajv2020({
  allErrors: true,
  strict: true
});
addFormats(ajv);

const validate = ajv.compile(schema);
const valid = validate(data);

if (!valid) {
  console.error("Dataset validation failed:\n");
  for (const error of validate.errors) {
    const location = error.instancePath || "/";
    console.error(`- ${location}: ${error.message}`);
  }
  process.exit(1);
}

// Additional project-level integrity checks that JSON Schema alone
// does not conveniently express.
const errors = [];
const subjectIds = data.subjects.map((subject) => subject.id);
const sectionNumbers = data.subjects.map((subject) => subject.section_number);

if (new Set(subjectIds).size !== subjectIds.length) {
  errors.push("Subject IDs must be unique.");
}
if (new Set(sectionNumbers).size !== sectionNumbers.length) {
  errors.push("Section numbers must be unique.");
}

const expectedSections = Array.from({ length: data.subjects.length }, (_, i) => i + 1);
const actualSections = [...sectionNumbers].sort((a, b) => a - b);
if (JSON.stringify(actualSections) !== JSON.stringify(expectedSections)) {
  errors.push("Section numbers must be continuous, starting at 1.");
}

if (errors.length > 0) {
  console.error("Dataset integrity checks failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validation passed: ${data.subjects.length} subjects, ${data.dataset.year} syllabus.`);
