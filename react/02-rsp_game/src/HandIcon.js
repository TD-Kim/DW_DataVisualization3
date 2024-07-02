import scissorImg from "./assets/scissor.svg";
import rockImg from "./assets/rock.svg";
import paperImg from "./assets/paper.svg";

const IMAGES = {
    rock: rockImg,
    scissor: scissorImg,
    paper: paperImg
}

function HandIcon({value, className}) {
    const src = IMAGES[value];
    return (
        <img src={src} className={className} />
    );
}

export default HandIcon;