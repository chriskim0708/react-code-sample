import React, { FC, useEffect } from 'react';
import ChunkFiles, { ChunkFile } from '../lib/ChunkFiles';

const ChunkUpload: FC = () => {
  useEffect(() => {}, []);

  const onChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const createdObserver = (chunk: ChunkFile) => {
      console.log('test', chunk);
    };
    const files = event.currentTarget.files as FileList;
    const chunkFiles = Array.from(files).map((file) => new ChunkFiles(file, createdObserver));
    console.log('chunkFiles', chunkFiles);
  };

  return (
    <>
      <div>
        <input type="file" multiple onChange={onChange} />
      </div>
    </>
  );
};

export default ChunkUpload;
