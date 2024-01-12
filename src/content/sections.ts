import { Section } from './types';
import { Vector3 } from 'three';

// first is "x" for up-down look (vertical rotation)
// second "y" is for left-right (horizontal rotation)

export const sections: Section[] = [
  {
    eventCode: 'Digit1',
    timeStamp: 110,
    lookVector: new Vector3(-0.36, -0.28, 0)
  },
  {
    eventCode: 'Digit2',
    timeStamp: 200,
    lookVector: new Vector3(0, -0.6, 0)
  },
  {
    eventCode: 'Digit3',
    timeStamp: 310,
    lookVector: new Vector3(-0.4, 0.1, 0)
  },
  {
    eventCode: 'Digit4',
    timeStamp: 410,
    lookVector: new Vector3(-0.4, -2.2, 0)
  },
  {
    eventCode: 'Digit5',
    timeStamp: 546,
    lookVector: new Vector3(0.36, 1.63, 0)
  },
  {
    eventCode: 'Digit6',
    timeStamp: 626,
    lookVector: new Vector3(-0.1, 2.2, 0)
  },
  {
    eventCode: 'Digit7',
    timeStamp: 700,
    lookVector: new Vector3(-0.38, 2.458, 0)
  },
  {
    eventCode: 'Digit8',
    timeStamp: 790,
    lookVector: new Vector3(0.16, -0.6, 0)
  },
  {
    eventCode: 'Digit9',
    timeStamp: 900,
    lookVector: new Vector3(-0.5, -0.2, 0)
  },
]