import {images} from './data/images'

// eslint-disable-next-line
// @ts-ignore
export const getImgUrl = (img: string) => (img.match(/^http/) ? img : images[img])
