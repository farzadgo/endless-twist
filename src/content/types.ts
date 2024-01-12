import { Vector3 } from 'three';


// MIXED-MEDIA

export interface DataObject {
  time: number;
  body: string;
}

export interface ImageDataObject {
  image: string;
  t1: number;
  t2: number;
}

export interface Section {
  eventCode: string;
  timeStamp: number;
  lookVector: Vector3;  
}


// PUBLICATION

export enum ParagraphType {
  MAIN = 'main',
  QUOTE = 'quote',
  POETIC = 'poetic',
  HEADER = 'header',
}

export interface Note {
  id: string;
  body: string;
}

export interface Paragraph {
  id: string;
  body: string;
  type: ParagraphType;
}

export interface Chapter {
  id: string;
  title: string;
  paragraphs?: Paragraph[];
  subchapters?: Chapter[];
}