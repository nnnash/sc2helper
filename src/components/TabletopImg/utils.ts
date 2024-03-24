import React from 'react'
import {toJpeg} from 'html-to-image'
import {Options} from 'html-to-image/es/types'

export const download = (ref: React.RefObject<HTMLElement>, name: string, options?: Options) => {
  if (ref.current === null) {
    return
  }

  toJpeg(ref.current, {cacheBust: true, pixelRatio: 1, ...options})
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = `${name}.jpg`
      link.href = dataUrl
      link.click()
    })
    .catch((err) => {
      console.log(err)
    })
}
