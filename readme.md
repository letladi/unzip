# @letladi/unzip

A simple utility for unzipping files in Node.js. This library allows you to unzip files and list the contents of the extracted directory.

## Installation

You can install the package via npm:

```bash
npm install @letladi/unzip
```

## Usage
### Example 1:
```js
import { unzip } from '@letladi/unzip';

async function example() {
  try {
    const { extractedFolderPath, files } = await unzip('path/to/your/file.zip', 'path/to/extract/');
    console.log('Files extracted to:', extractedFolderPath);
    console.log('Extracted files:', files);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

example();

```

### Example 2:
```js
import { unzip } from '@letladi/unzip';

async function example() {
  try {
    const { extractedFolderPath, files } = await unzip('path/to/your/file.zip');
    console.log('Files extracted to:', extractedFolderPath);
    console.log('Extracted files:', files);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

example();


```

### Example 3 (Using promises):
```js
import { unzip } from '@letladi/unzip';

// Example 1: Using .then() and .catch()
unzip('path/to/your/file.zip', 'path/to/extract/')
  .then(({ extractedFolderPath, files }) => {
    console.log('Files extracted to:', extractedFolderPath);
    console.log('Extracted files:', files);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });

// Example 2: Using .then() and .catch() with default extraction path
unzip('path/to/your/file.zip')
  .then(({ extractedFolderPath, files }) => {
    console.log('Files extracted to:', extractedFolderPath);
    console.log('Extracted files:', files);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
```

## Parameters
- `filePath`:  The path to the zip file you want to unzip.
- `extractfilePath`:  (optional): The path where the contents should be extracted. If not provided, a unique directory name will be generated.

## Returns
- `extractedFolderPath`: The path to the folder where the files were extracted.
- `files`: An array of file paths of the extracted files.

## Error Handling
The unzip function will throw an error if:
- The zip file cannot be found or opened.
- There is an issue during the extraction process.

## Development
To contribute or modify the library:

1.     Clone the repository.
2.     Install dependencies: npm install
3.     Build the project: npm run build
4.     Run tests: npm test


## Scripts
 - `build`: Compiles TypeScript code into JavaScript.
 - `test`: Runs tests using Jest.
 - `clean-up`: Cleans up temporary files after tests.

 ## License
This project is licensed under the MIT License. 

## Author
Created by Letladi Sebesho.