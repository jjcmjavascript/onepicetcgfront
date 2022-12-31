import { useEffect, useState, useRef } from 'react';

const defaultOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 1,
};

export default function useIntersectionObserver(callback, options = defaultOptions) {
  const [elements, setElements] = useState([]);

  const [entries, setEntries] = useState({});

  const observer = useRef(
    new IntersectionObserver((entries) => {
      setEntries(entries);
      alert('entries', entries);
      callback(entries);
    }, options)
  );

  useEffect(() => {
    const { current: currentObserver } = observer;

    elements.forEach((element) => currentObserver.observe(element));

    return () => {
      currentObserver && currentObserver.disconnect();
    };
  }, [elements]);

  return { current: observer.current, setElements, entries };
}
