import {createReadStream} from 'fs';

const inputStream = createReadStream('helloworld.txt');

inputStream.on('data', (piece) => {
  process.stdout.write(piece);
});

inputStream.on('error', (err) => {
  process.stderr.write(err.message);
});