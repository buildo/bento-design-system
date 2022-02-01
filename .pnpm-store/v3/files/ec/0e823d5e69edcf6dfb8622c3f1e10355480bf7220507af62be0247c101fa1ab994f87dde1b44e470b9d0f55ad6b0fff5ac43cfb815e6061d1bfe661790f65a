import { getOptions } from 'loader-utils';

function virtualResourceLoader() {
  const {
    source
  } = getOptions(this);
  return Buffer.from(source, 'base64').toString('utf-8');
}

export default virtualResourceLoader;
