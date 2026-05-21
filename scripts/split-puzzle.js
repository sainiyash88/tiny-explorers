const sharp = require('sharp');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../assets/images/puzzles');
const ANIMALS = ['bear', 'camel', 'cow', 'elephant', 'fish', 'horse', 'monkey', 'sheep'];

async function splitAnimal(name) {
  const input = path.join(OUT_DIR, `${name}.jpg`);
  const meta = await sharp(input).metadata();
  const { width, height } = meta;
  const sliceW = Math.floor(width / 3);
  console.log(`${name}: ${width}x${height}, slice width: ${sliceW}`);
  for (let i = 0; i < 3; i++) {
    const left = i * sliceW;
    const w = i === 2 ? width - left : sliceW;
    await sharp(input)
      .extract({ left, top: 0, width: w, height })
      .jpeg({ quality: 95 })
      .toFile(path.join(OUT_DIR, `${name}-${i}.jpg`));
    console.log(`  saved ${name}-${i}.jpg`);
  }
}

async function main() {
  for (const animal of ANIMALS) {
    await splitAnimal(animal);
  }
  console.log('All done!');
}

main().catch(console.error);
