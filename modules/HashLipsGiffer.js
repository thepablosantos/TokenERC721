const GifEncoder = require("gif-encoder-2");
const { writeFile } = require("fs");

// Classe responsável por criar GIFs a partir de um contexto de canvas
class HashLipsGiffer {
  // Construtor da classe
  constructor(_canvas, _ctx, _fileName, _repeat, _quality, _delay) {
    this.canvas = _canvas;
    this.ctx = _ctx;
    this.fileName = _fileName;
    this.repeat = _repeat;
    this.quality = _quality;
    this.delay = _delay;
    this.initGifEncoder(); // Inicializa o codificador de GIF
  }

  // Inicializa o codificador de GIF
  initGifEncoder = () => {
    this.gifEncoder = new GifEncoder(this.canvas.width, this.canvas.height);
    this.gifEncoder.setQuality(this.quality);
    this.gifEncoder.setRepeat(this.repeat);
    this.gifEncoder.setDelay(this.delay);
  };

  // Inicia a gravação do GIF
  start = () => {
    this.gifEncoder.start();
  };

  // Adiciona um frame ao GIF
  add = () => {
    this.gifEncoder.addFrame(this.ctx);
  };

  // Encerra a gravação do GIF e salva o arquivo
  stop = () => {
    this.gifEncoder.finish();
    const buffer = this.gifEncoder.out.getData();
    writeFile(this.fileName, buffer, (error) => {
      if (error) {
        console.error(`Error creating gif at ${this.fileName}:`, error);
      } else {
        console.log(`Created gif at ${this.fileName}`);
      }
    });
  };
}

// Exporta a classe para ser utilizada em outros módulos
module.exports = HashLipsGiffer;
