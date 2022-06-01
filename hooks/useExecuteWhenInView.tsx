import { RefObject, useEffect, useRef } from "react";

/*
* @params: keepInView: boolean - when inViewPort is set to true, it will not be reset back to false when the element falls out of the view port
* @params: percentTillReveal: decimal 0-1 - % in decimal of element that needs to be in viewport until inViewPort is set to true
* @returns: elementRef: ref - ref to place on the element you want to observe
* @returns: inViewPort: boolean - bool value that notifies when element is in the viewport
*/

const useExecuteWhenInView = (callBack:()=>void, percentTillReveal: number = 1, removeAfterExecution = false): [elementRef: RefObject<HTMLElement>] => {
    const elementRef = useRef<HTMLElement>(null);
    const options = useRef({
        root: null,
        rootMargin: "0px",
        threshold: percentTillReveal, // 1 whole item must be in viewport, .01 1% of item must be in viewport
    })

    useEffect(() => {
        if (!elementRef.current) {
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if(entry.isIntersecting){
                callBack();
                if(removeAfterExecution){
                    observer.unobserve(elementRef.current!);
                }
            }
        }, options.current)

        observer.observe(elementRef.current);
        return () => {
            if (!elementRef.current) {
                return;
            }
            observer.unobserve(elementRef.current);
        }
    }, [elementRef])

    return [elementRef];
}

export { useExecuteWhenInView };