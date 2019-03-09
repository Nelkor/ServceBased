import { SkillTop } from "./components/skill-top.js";

customElements.define('skill-top', SkillTop);

const color = () => {
    const variants = [
        'red',
        'green',
        'blue',
        'cyan',
        'magenta',
        'orange',
    ];

    return variants[Math.floor(Math.random() * variants.length)];
};

document.addEventListener('click', () => {
    const el = document.createElement('skill-top');

    el.setAttribute('color', color());

    document.body.appendChild(el);
});
