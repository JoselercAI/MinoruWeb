import { readFile } from "node:fs/promises";
import path from "node:path";

type LegalSection = {
  title: string;
  paragraphs: string[];
};

const isUppercaseHeading = (value: string) =>
  value.length <= 120 &&
  /[A-Z]/.test(value) &&
  value === value.toUpperCase();

const isNumberedHeading = (value: string) => /^\d+\)/.test(value);

const isShortHeading = (value: string) => {
  const words = value.split(/\s+/).filter(Boolean);
  return words.length <= 8 && value.length <= 80;
};

const normalizeBlock = (block: string) =>
  block
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ")
    .trim();

const isSectionHeading = (value: string) =>
  Boolean(value) &&
  (isUppercaseHeading(value) ||
    isNumberedHeading(value) ||
    (isShortHeading(value) && !/[.!?].+\s/.test(value)));

function splitIntoSections(text: string) {
  const blocks = text
    .split(/\r?\n\s*\r?\n/)
    .map(normalizeBlock)
    .filter(Boolean);

  const sections: LegalSection[] = [];
  let current: LegalSection = {
    title: "Introducción",
    paragraphs: [],
  };

  for (const block of blocks) {
    if (!/contact/i.test(current.title) && isSectionHeading(block)) {
      if (current.paragraphs.length) {
        sections.push(current);
      }

      current = {
        title: block,
        paragraphs: [],
      };
      continue;
    }

    current.paragraphs.push(block);
  }

  if (current.paragraphs.length) {
    sections.push(current);
  }

  return sections;
}

export async function getLegalSections(filename: string) {
  const fullPath = path.join(process.cwd(), "Docs", filename);
  const content = await readFile(fullPath, "utf8");
  return splitIntoSections(content);
}
