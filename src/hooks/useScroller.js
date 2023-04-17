import Scroll from "react-scroll";
import {useLocation} from "react-router-dom";

export function useScroller() {
    const scroller = Scroll.scroller;
    const location = useLocation();
    const effectFunction = () => {
        const sectionId = location.hash.slice(1);
        if (!sectionId) {
            return;
        }
        console.log("here")
        scroller.scrollTo(sectionId, {
            duration: 500,
            smooth: true,
            offset: -116
        });
    }

    const resetFunc = () => {
        window.history.replaceState('', document.title, window.location.pathname)
    }
    return [effectFunction, resetFunc]

}