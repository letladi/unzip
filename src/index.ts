import { exec } from 'child_process';
import { join } from 'path';
import uniqid from 'uniqid';
import { promises as fsPromise } from 'fs';

export async function unzip(
  filepath: string,
  extractfilePath?: string,
): Promise<{ extractedFolderPath: string; files: string[] }> {
  const extractedFolderPath: string = extractfilePath || filepath + uniqid();

  return new Promise((resolve, reject) => {
    const child_ps = exec(`unzip ${filepath} -d ${extractedFolderPath}`);

    child_ps.stderr?.on('data', (data) => {
        reject({ message: 'Could not complete unzip: ' + filepath });
    });

    child_ps.on('close', async (code: number) => {
      if (code === 0) {
        try {
          const files: string[] = await listAllFiles(extractedFolderPath);
          resolve({ extractedFolderPath, files });
        } catch (err) {
          reject({ message: 'Error listing files', error: err });
        }
      } else {
        reject({ message: 'Could not complete unzip', code });
      }
    });

    child_ps.on('error', (err: any) => {
      reject({ message: 'Error executing unzip', error: err });
    });
  });
}

async function listAllFiles(dir: string): Promise<string[]> {
  const ret: string[] = [];

  try {
    const files: string[] = await fsPromise.readdir(dir);
    for (const file of files) {
      const completePath: string = join(dir, file);
      const stat = await fsPromise.lstat(completePath);

      if (stat.isDirectory()) {
        const subFiles: string[] = await listAllFiles(completePath);
        ret.push(...subFiles);
      } else if (stat.isFile()) {
        ret.push(completePath);
      }
    }
  } catch (e) {
    console.error('Error reading directory:', e);
  }

  return ret;
}
