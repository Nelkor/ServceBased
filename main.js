import { SkillTop } from "./components/skill-top.js";

customElements.define('skill-top', SkillTop);

document.addEventListener('click', () => {
    const el = document.createElement('skill-top');

    document.body.appendChild(el);
});
