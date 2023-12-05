import { useEffect, useState } from "react";

export default () => {
    const [windowScreenWidth, setWindowScreenWidth] = useState(
        window.innerWidth
    );
    useEffect(() => {
        function handleScreenWidth() {
            setWindowScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleScreenWidth);
        return () => {
            window.removeEventListener("resize", handleScreenWidth);
        };
    }, []);
    return windowScreenWidth;
};
