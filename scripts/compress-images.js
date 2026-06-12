const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node compress-images.js <input_path> <output_filename_no_ext>');
  process.exit(1);
}

const inputPath = args[0];
const outputName = args[1];
const outputDir = path.join(__dirname, '..', 'public', 'assets', 'images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, `${outputName}.webp`);

sharp(inputPath)
  .resize(500, 500, {
    fit: 'cover',
    position: 'center'
  })
  .webp({ quality: 80 })
  .toFile(outputPath)
  .then(info => {
    console.log(`Successfully compressed image to WebP: ${outputPath}`);
    console.log(`Size: ${(info.size / 1024).toFixed(2)} KB`);
  })
  .catch(err => {
    console.error('Error compressing image:', err);
    process.exit(1);
  });
