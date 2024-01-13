import '../src/costyles.css';
import './style.css';

import { Marked } from '@ts-stack/markdown';
import introAsString from './chapters/0-intro.md?raw';
import chOneAsString from './chapters/1-chapter.md?raw';
import chTwoAsString from './chapters/2-chapter.md?raw';
import outroAsString from './chapters/3-outro.md?raw';
import annexAsString from './chapters/4-annex.md?raw';


interface Chapter {
  id: string;
  title: string;
  subtitles?: Chapter[];
}

const chapterStrings = [introAsString, chOneAsString, chTwoAsString, outroAsString, annexAsString];

const bookContainer = document.getElementById('book-container');

let narrowScreen = false;
let activeParagraph: HTMLElement | null = null;
let activeChapter: HTMLElement | null = null;

export const allChapterTitles: Chapter[] = [];


const setNoteStyle = (p: HTMLElement) => {
  let position = narrowScreen ? 'relative' : 'absolute';
  let top = narrowScreen ? 'calc(var(--padding-xl) * 3)' : p.dataset.top!;
  let left = narrowScreen ? '0' : '950px';
  let width = narrowScreen ? '100%' : 'calc(100vw - 1050px)';
  let height = narrowScreen ? 'calc(100% - var(--padding-xl) * 4)' : 'auto';
  return (
    p.style.position = position,
    p.style.top = top,
    p.style.left = left,
    p.style.width = width,
    p.style.height = height
  )
}

const modifyTitle = (txt: string) => {
  let modifiedTitle = txt.replace('and', '<br> and <br>');
  modifiedTitle = modifiedTitle.replace('❯' , '<span> ❯❯ </span> <br>');
  return modifiedTitle;
}

const setTitles = (chapTitles: Chapter) => {
  allChapterTitles.push(chapTitles);  
}


// --- COVER ELEMENTS ---
const title = document.createElement('h1');
title.innerHTML = 'ENDLESS TWIST';

const subtitle = document.createElement('h2');
subtitle.innerHTML = 'A critical autoethnographic approach to the current state of urban development';

const author = document.createElement('h3');
author.innerHTML = 'FARZAD GOLGHASEMI';

const bookCover = document.createElement('div');
bookCover.className = 'book-cover';
bookCover.appendChild(title);
bookCover.appendChild(subtitle);
bookCover.appendChild(author);

bookContainer!.appendChild(bookCover);
// --- end COVER ELEMENTS ---


// --- CREATE MOBILE NOTE ---
const noteContainer = document.createElement('div');
noteContainer.className = 'note-container';
noteContainer.style.display = 'none';

const noteClose = document.createElement('button');
noteClose.className = 'note-close';
noteClose.innerHTML = '✕';

noteContainer.appendChild(noteClose);

bookContainer!.appendChild(noteContainer);
// --- end CREATE MOBILE NOTE ---



chapterStrings.forEach((chapterString, i) => {

  const chapterContainer = document.createElement('section');
  chapterContainer.className = 'chapter';
  chapterContainer.innerHTML = Marked.parse(chapterString);

  chapterContainer.querySelectorAll(':scope > p').forEach((paragraph) => paragraph.className = 'para');

  const annexContainer = i === chapterStrings.length - 1 ? chapterContainer : null;
  if (annexContainer) annexContainer.id = 'annex';

  annexContainer?.querySelectorAll(':scope > p').forEach((paragraph) => paragraph.className = 'annex-para');

  const images = chapterContainer.querySelectorAll('img');
  const superscripts = chapterContainer.querySelectorAll('sup');

  images.forEach(img => {
    img.setAttribute('loading', 'lazy');    
  });

  // --- CHAPTER TITLING ---
  const chapterTitle = chapterContainer.querySelector('h1') as HTMLHeadingElement;
  chapterTitle.className = 'chapter-title';
  let rawTitle = chapterTitle.innerHTML;  
  chapterTitle.innerHTML = modifyTitle(chapterTitle.innerHTML);
  
  const chapterType = document.createElement('div');
  chapterType.className = 'chapter-type';
  if (i === 0) chapterType.innerHTML = 'intro <span> ❯❯ </span>';
  if (i === chapterStrings.length - 2) chapterType.innerHTML = 'outro <span> ❯❯ </span>';
  chapterContainer.insertBefore(chapterType, chapterTitle);

  const annexTitle = chapterContainer.querySelector('#annex') as HTMLHeadingElement;
  if (annexTitle) {
    annexTitle.className = 'chapter-type';
    annexTitle.style.paddingTop = 'var(--padding)';
  }
  // --- end CHAPTER TITLING ---


  const chapterSubtitles = chapterContainer.querySelectorAll('h2');

  const subtitles = Array.from(chapterSubtitles).map((subtitle, i) => {
    return {
      id: subtitle.id,
      title: subtitle.innerHTML
    }
  });

  let chapterTitles = {
    id: chapterTitle.id,
    title: rawTitle,
    subtitles: subtitles
  }
  
  setTitles(chapterTitles);


  window.addEventListener('load', () => {
    // better to have height defining functions earlier on load
    
    images.forEach(img => {
      let aspectRatio = img.naturalWidth / img.naturalHeight;
      if (aspectRatio > 2) img.classList.add('long-img');
    });


    const inlineNoteRefs = Array.from(superscripts).map((node) => {
      let noteAnchor = node.children[0] as HTMLAnchorElement;      
      if (noteAnchor) {
        return {
          hash: noteAnchor.hash,
          yPos: noteAnchor.getBoundingClientRect().top
        };
      }
    });

    const noteParagraphs = inlineNoteRefs.map((ref) => {
      let hash = ref!.hash;
      let top = ref!.yPos;

      let noteHeader = chapterContainer.querySelector(hash) as HTMLHeadingElement;      
      noteHeader.innerHTML = noteHeader.innerHTML.slice(1);
      
      let paragraph = noteHeader!.nextElementSibling as HTMLElement;
      paragraph.id = hash.slice(1);
      paragraph.className = 'note-para';
      
      paragraph.setAttribute('data-num', noteHeader.innerHTML);
      paragraph.setAttribute('data-top', `${Math.round(top) + 4}px`);
      paragraph.style.display = 'none';
      
      let links = paragraph.querySelectorAll('a');
      if (links.length) {
        links.forEach((link) => {
          link.setAttribute('target', '_blank');
        });
      }
      
      noteHeader.remove();

      window.innerWidth < 1250 ? narrowScreen = true : narrowScreen = false;
      setNoteStyle(paragraph);

      return paragraph;
    });
    
    

    const resetNotes = () => {
      noteParagraphs.forEach((paragraph) => {
        paragraph.style.display = 'none';
      });
      activeParagraph = null;
      activeChapter = null;
    }


    const toggleNote = (event: MouseEvent) => {
      event.preventDefault();
      let noteAnchor = event.target as HTMLAnchorElement;
      
      if (noteAnchor.tagName === 'A' && noteAnchor.parentElement!.tagName === 'SUP') {
        let hash = noteAnchor.hash;
        let paragraph = chapterContainer.querySelector(hash) as HTMLElement;
        
        if (paragraph.style.display === 'none') {
          // SHOW NOTE
          resetNotes();
          setNoteStyle(paragraph);
          paragraph.style.display = 'block';
          activeParagraph = paragraph;
          activeChapter = chapterContainer;
          if (narrowScreen) {
            noteContainer.appendChild(paragraph);
            noteContainer.style.display = 'flex';
            document.body.classList.add('stop-scroll');
          }
        } else {
          // HIDE NOTE (DESKTOP)
          resetNotes();
        }
      }
    }


    const closeNote = () => {
      // HIDE NOTE (NARROW)
      if (activeParagraph) {
        activeChapter!.appendChild(activeParagraph);
        noteContainer.style.display = 'none';
      }
      document.body.classList.remove('stop-scroll');
      resetNotes();
    }


    const handleResize = () => {      
      window.innerWidth < 1250 ? narrowScreen = true : narrowScreen = false;
      if (activeParagraph) {
        setNoteStyle(activeParagraph);
        if (narrowScreen) {
          noteContainer.appendChild(activeParagraph);
          noteContainer.style.display = 'flex';
          document.body.classList.add('stop-scroll');
        } else {
          activeChapter!.appendChild(activeParagraph);
          noteContainer.style.display = 'none';
          document.body.classList.remove('stop-scroll');
        }
      }
    }


    superscripts.forEach((node) => node.addEventListener('click', toggleNote));
    noteClose.addEventListener('click', closeNote);

    window.addEventListener('resize', handleResize);

  });

  bookContainer!.appendChild(chapterContainer);

});



// ------ TABLE OF CONTENTS ------

const menuContainer = document.createElement('div');
menuContainer.className = 'menu-container';

const menuBody = document.createElement('div');
menuBody.className = 'menu-body';

const contentList = document.createElement('ul');
contentList.className = 'content-list';

allChapterTitles.forEach((chapter) => {
  const chapterItem = document.createElement('li');
  chapterItem.className = 'content-item';
  chapterItem.id = chapter.id;
  const chapterLink = document.createElement('a');
  chapterLink.href = `#${chapter.id}`;
  chapterLink.innerHTML = chapter.title;
  chapterItem.appendChild(chapterLink);

  if (chapter.subtitles) {
    const subList = document.createElement('ul');
    chapter.subtitles.forEach((subtitle) => {
      const subItem = document.createElement('li');
      subItem.className = 'subcontent-item';
      subItem.id = subtitle.id;
      const subLink = document.createElement('a');
      subLink.href = `#${subtitle.id}`;
      subLink.innerHTML = subtitle.title;
      subItem.appendChild(subLink);
      subList.appendChild(subItem);
    });
    chapterItem.appendChild(subList);
  }

  contentList.appendChild(chapterItem);
});

menuBody.appendChild(contentList);


const imprint = document.createElement('div');
imprint.className = 'imprint';
let impTitle = '<p> Endless Twist: <i>A critical autoethnographic approach to the current state of urban development.</i> </p>';
let impAuthor = '<p> Farzad Golghasemi </p> <br>';
let impDesc = '<p> A thesis submitted in partial fullfilment of the requirements for the degree of Master of Arts in Digital Media (M.A.) at the University of the Arts Bremen. </p> <br>';
let impLink = '<p> <a href="/"> www.endlesstwist.xyz </a> </p>';
let impCopy = '<p> © 2021 Farzad Golghasemi </p>';
imprint.innerHTML = impTitle + impAuthor + impDesc + impLink + impCopy;

menuBody.appendChild(imprint);


const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<span> about <i> ＋ </i> contents </span>';
menuToggle.addEventListener('click', () => {
  menuContainer.classList.toggle('show');
});

document.addEventListener('click', (event) => {
  let target = event.target as HTMLElement;
  if (target !== menuToggle&& target !== menuContainer && target !== contentList && target.className !== 'content-item' && target.className !== 'subcontent-item') {
    menuContainer.classList.remove('show');
  }
});

menuContainer.appendChild(menuToggle);
menuContainer.appendChild(menuBody);

bookContainer!.appendChild(menuContainer);


// ------ INTERSECTION API ------

const options = {
  // root: null,
  rootMargin: '0px',
  threshold: 0.005
}

const handleIntersection = (entries: IntersectionObserverEntry[], observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let chapter = entry.target as HTMLElement;
      tableItems.forEach((item) => {
        if (item.id === chapter.children[1].id)  {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });
}


const tableItems = document.querySelectorAll('.content-item') as NodeListOf<HTMLElement>;
const chapterSections = Array.from(document.querySelectorAll('.chapter')) as HTMLElement[];

const chapterObserver = new IntersectionObserver(handleIntersection, options);

chapterSections.forEach((section) => chapterObserver.observe(section));