import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Marked } from '@ts-stack/markdown';
import x_w from '../content/assets/x.svg';
import x_b from '../content/assets/x-b.svg';
import moon from '../content/assets/moon.svg';
import sun from '../content/assets/sun.svg';
import '../costyles.css';
import './style.css';

const Publication = () => {
  const data = useStaticQuery(graphql`
    query {
      intro: file(relativePath: { eq: "chapters/0-intro.md" }) {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
      chOne: file(relativePath: { eq: "chapters/1-chapter.md" }) {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
      chTwo: file(relativePath: { eq: "chapters/2-chapter.md" }) {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
      outro: file(relativePath: { eq: "chapters/3-outro.md" }) {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
      annex: file(relativePath: { eq: "chapters/4-annex.md" }) {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
    }
  `);

  const chapterStrings = [
    data.intro.childMarkdownRemark.rawMarkdownBody,
    data.chOne.childMarkdownRemark.rawMarkdownBody,
    data.chTwo.childMarkdownRemark.rawMarkdownBody,
    data.outro.childMarkdownRemark.rawMarkdownBody,
    data.annex.childMarkdownRemark.rawMarkdownBody,
  ];

  const [lightTheme, setLightTheme] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [narrowScreen, setNarrowScreen] = useState(false);
  const [activeParagraph, setActiveParagraph] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [allChapterTitles, setAllChapterTitles] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setNarrowScreen(window.innerWidth < 1250);
    };

    const calculateScrollPercentage = () => {
      let scrollTop = window.scrollY - window.innerHeight * 1.5;
      let documentHeight = document.documentElement.scrollHeight - window.innerHeight * 2.5;
      let percentage = (scrollTop / documentHeight) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      setScrollPercentage(percentage);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', calculateScrollPercentage);

    handleResize();
    calculateScrollPercentage();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', calculateScrollPercentage);
    };
  }, []);

  const setTheme = () => {
    let root = document.documentElement;
    let background = lightTheme ? '#eee' : '#0f0f0f';
    let color = lightTheme ? '#111' : '#ccc';
    let pinki = lightTheme ? '#a43f97' : '#9a4f90';
    let blurgray = lightTheme ? 70 : 30;

    root.style.setProperty('--bg-color', background);
    root.style.setProperty('--text-color', color);
    root.style.setProperty('--pinki', pinki);
    root.style.setProperty('--blur-bg', `hsla(0, 0%, ${blurgray}%, 0.4)`);
  };

  useEffect(() => {
    setTheme();
  }, [lightTheme]);

  const toggleTheme = () => {
    setLightTheme(!lightTheme);
  };

  const setNoteStyle = (p) => {
    let position = narrowScreen ? 'relative' : 'absolute';
    let top = narrowScreen ? 'calc(var(--padding-xl) * 2.7)' : p.dataset.top;
    let left = narrowScreen ? '0' : '950px';
    let width = narrowScreen ? '100%' : 'calc(100vw - 1050px)';
    let height = narrowScreen ? 'calc(100% - var(--padding-xl) * 4)' : 'auto';
    p.style.position = position;
    p.style.top = top;
    p.style.left = left;
    p.style.width = width;
    p.style.height = height;
  };

  const modifyTitle = (txt) => {
    let modifiedTitle = txt.replace('and', '<br> and <br>');
    modifiedTitle = modifiedTitle.replace('❯', '<span> ❯❯ </span> <br>');
    return modifiedTitle;
  };

  const setTitles = (chapTitles) => {
    setAllChapterTitles((prevTitles) => [...prevTitles, chapTitles]);
  };

  const resetNotes = (elements) => {
    elements.forEach((element) => {
      element.style.display = 'none';
    });
    setActiveParagraph(null);
    setActiveChapter(null);
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let chapter = entry.target;
        document.querySelectorAll('.content-item').forEach((item) => {
          if (item.id === chapter.children[1].id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '0px',
      threshold: 0.005,
    });

    document.querySelectorAll('.chapter').forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div id="book-container">
      <div className="book-cover">
        <h1>ENDLESS TWIST</h1>
        <h2>A critical autoethnographic approach to the current state of urban development</h2>
        <h3>FARZAD GOLGHASEMI</h3>
      </div>

      <div className="reading-bar">
        <span className="percentage-value">{scrollPercentage.toFixed(0)}%</span>
        <button className="theme-button" onClick={toggleTheme}>
          <img src={lightTheme ? moon : sun} alt="Theme Icon" />
        </button>
      </div>

      <div className="note-container" style={{ display: 'none' }}>
        <button className="note-close">
          <img src={lightTheme ? x_b : x_w} alt="Close Icon" />
        </button>
      </div>

      {chapterStrings.map((chapterString, i) => (
        <section key={i} className="chapter" dangerouslySetInnerHTML={{ __html: Marked.parse(chapterString) }} />
      ))}

      <div className="menu-container">
        <button className="menu-toggle">
          <span> about <i> ＋ </i> contents </span>
        </button>
        <div className="menu-body">
          <ul className="content-list">
            {allChapterTitles.map((chapter) => (
              <li key={chapter.id} className="content-item" id={chapter.id}>
                <a href={`#${chapter.id}`}>{chapter.title}</a>
                {chapter.subtitles && (
                  <ul>
                    {chapter.subtitles.map((subtitle) => (
                      <li key={subtitle.id} className="subcontent-item" id={subtitle.id}>
                        <a href={`#${subtitle.id}`}>{subtitle.title}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="imprint">
            <p> Endless Twist: <i>A critical autoethnographic approach to the current state of urban development.</i> </p>
            <p> Farzad Golghasemi </p> <br />
            <p> A thesis submitted in partial fulfillment of the requirements for the degree of Master of Arts in Digital Media (M.A.) at the University of the Arts Bremen. </p> <br />
            <p> <a href="/"> www.endlesstwist.xyz </a> </p>
            <p> © 2023 Farzad Golghasemi </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publication;
