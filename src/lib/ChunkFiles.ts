export class ChunkFile {
  constructor(public name: string, public range: string, public chunk: ArrayBuffer) {}
}

export default class ChunkFiles {
  public chunks: ChunkFile[];
  private chunkStart: number;
  private chunkEnd: number;

  readonly chunkSize: number;
  readonly reader: FileReader;

  constructor(public file: File, public observer: Function) {
    this.chunks = [];
    this.chunkSize = 1024 * 1024; // 1MB
    this.chunkStart = 0;
    this.chunkEnd = this.chunkSize;
    this.reader = new FileReader();
    this.reader.readAsArrayBuffer(file.slice(this.chunkStart, this.chunkEnd));
    this.reader.onload = this.onLoaded;
  }

  private onLoaded = () => {
    if (this.chunkEnd >= this.file.size) {
      return this.observer.call(null, this.chunks);
    }

    if (this.chunkStart > 0) {
      this.chunkEnd = Math.min(this.chunkStart + this.chunkSize, this.file.size);
    }

    const range = `bytes: ${this.chunkStart}-${this.chunkEnd - 1}/${this.file.size}`;
    this.chunks.push(new ChunkFile('test', range, this.reader.result as ArrayBuffer));
    this.reader.readAsArrayBuffer(this.file.slice(this.chunkStart, this.chunkEnd));
    this.chunkStart = this.chunkEnd;
  };

  clear() {
    this.chunks = [];
  }
}
