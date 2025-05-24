import { Vector3 } from 'three'


// MIXED-MEDIA

export type DataObject = {
  time: number
  body: string
}

export type ImageDataObject = {
  image: string
  t1: number
  t2: number
}

export type Section = {
  eventCode: string
  timeStamp: number
  lookVector: Vector3  
}

export type BaseVideo = {
  id: string
  url: string
  startTime: number
  started?: boolean
  ended?: boolean
}

export type OverlayVideo = BaseVideo & {
  element: HTMLVideoElement
}


// PUBLICATION

export enum ParagraphType {
  MAIN = 'main',
  QUOTE = 'quote',
  POETIC = 'poetic',
  HEADER = 'header',
}

export type Note = {
  id: string
  body: string
}

export type Paragraph = {
  id: string
  body: string
  type: ParagraphType
}

export type Chapter = {
  id: string
  title: string
  paragraphs?: Paragraph[]
  subchapters?: Chapter[]
}