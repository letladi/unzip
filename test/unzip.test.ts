import { unzip } from '../src/index'; // Adjust the path as needed
import { promises as fsPromise } from 'fs';
import { join } from 'path';

describe('unzip', () => {
  const zipFilePath = 'node_modules.zip'; // Adjust path if necessary
  const extractedFolderPath = 'extracted_node_modules';

  afterAll(async () => {
    // Clean up created files and directories
    try {
      await fsPromise.rm(extractedFolderPath, { recursive: true, force: true });
    } catch (error) {
      console.error('Error cleaning up test files:', error);
    }
  });

  it('should unzip a file and list all files', async () => {
    const result = await unzip(zipFilePath, extractedFolderPath);

    expect(result).toHaveProperty('extractedFolderPath');
    expect(result).toHaveProperty('files');
    expect(result.files).toBeInstanceOf(Array);

    // Ensure files were extracted
    const extractedFiles = await fsPromise.readdir(result.extractedFolderPath);
    expect(extractedFiles).toBeTruthy(); // Ensure files exist

    // Optionally, check if some specific files are present
    expect(result.files.some(file => file.endsWith('package.json'))).toBe(true);
  });

  it('should handle errors gracefully', async () => {
    await expect(unzip('invalid/path/to/zip.zip')).rejects.toHaveProperty('message', 'Could not complete unzip: invalid/path/to/zip.zip');
  });
});
