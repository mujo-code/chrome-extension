/*
  React uses request animation state to batch updates to the dom
  hooks fall into this same category. Here we are pollyfilling
  request animation. To allow our hooks to run on the extension
  background. Original "raf" library always defaults to native we
  do not want that here.

  MAINTAINING FORK

  https://github.com/mujo-code/raf
*/

import '@mujo/raf/polyfill'
