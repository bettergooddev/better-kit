
const message = ({
  collectionName = "Testimonials1",
  collectionFolderName = "Testimonials-1",
  blockComponentName = "Testimonials1Block",
  blockComponentFolder = "Testimonials-1",

}: {
  collectionName: string
  collectionFolderName: string
  blockComponentName: string
  blockComponentFolder: string
}) =>
  `Cursor instructions: \n` +
  `1. Visit src/collections/Pages/index.ts and add 'import { ${collectionName} } from '@/blocks/${collectionFolderName}/config'.  Then, add ${collectionName} into the list of blocks found at Pages.fields[1].tabs[1].fields[0].blocks. \n` +
  `2. Visit src/blocks/RenderBlocks.tsx and add \`${blockComponentName}: ${blockComponentFolder}\` to the blockComponents object. \n` +
  `3. Run 'npx payload generate:types'. \n` +
  `4. (Optional) Run 'tsc --build' to ensure everything looks good in regards to ${collectionName}, and ${blockComponentName}. \n`



  

export default message;