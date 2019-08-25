/*
  React uses request animation state to batch updates to the dom
  hooks fall into this same category. Here we are pollyfilling
  request animation. To allow our hooks to run on the extension
  background.
*/
import 'raf/polyfill'
