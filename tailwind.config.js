import {fileURLToPath} from 'node:url';
const appRoot=fileURLToPath(new URL('.',import.meta.url)).replaceAll('\\','/');
export default {content:[`${appRoot}index.html`,`${appRoot}src/**/*.{js,jsx}`],theme:{extend:{colors:{ink:'#10263f',gold:'#d79b32',cream:'#f7f5ef'},fontFamily:{sans:['Roboto','sans-serif'],display:['Roboto','sans-serif']}}},plugins:[]}
