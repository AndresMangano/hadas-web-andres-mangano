import { createRef, useEffect, useState } from 'react';

export function useVisibility<E extends HTMLElement>(offset: number): [boolean, React.RefObject<E>] {
    const [isVisible, setIsVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const currentElement = createRef<E>();
    
    useEffect(() => {
        if (!loaded) {
            onScroll();
            setLoaded(true);
        }
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
        
        function onScroll() {
            if (!currentElement.current) {
                setIsVisible(false);
            } else {
                const bottom = currentElement.current.getBoundingClientRect().bottom;
                const visible = bottom + offset >= 0 && bottom - offset <= window.innerHeight;
                if (visible) {
                    window.removeEventListener("scroll", onScroll);
                }
                setIsVisible(visible);
            }
        }
    }, [currentElement, offset, loaded]);

  return [isVisible, currentElement];
}