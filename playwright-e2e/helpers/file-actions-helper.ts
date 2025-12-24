import { readFile as readFileFs, writeFile } from 'node:fs/promises';

export async function readFile(filePath: string): Promise<string> {
  return readFileFs(filePath, 'utf8');
}

export async function writeTofile(filePath: string, content: string): Promise<void> {
  await writeFile(filePath, content, 'utf8');
}

export async function writeToFile(filePath: string, content: string): Promise<void> {
  await writeTofile(filePath, content);
}
