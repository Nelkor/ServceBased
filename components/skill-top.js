import {skill_top_service} from "../services/skill-top-service.js";

const template =
`
<style>
    :host {
        position: relative;
        width: 200px;
        height: 100px;
        border: maroon solid 2px;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        font-family: Roboto, sans-serif;
    }

    .top1, .element {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 50px 0 10px;
    }
    
    .top1 {
        background-color: #800000;
        color: #f5deb3;
        font-size: 20px;
        height: 30px;
    }

    #other {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    
    #close {
        position: absolute;
        width: 80px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        right: -15px;
        top: 40px;
        border-radius: 6px;
        cursor: pointer;
        transform: rotate(-90deg);
        background-color: #f00;
        color: #fff;
        opacity: .8;
    }
    #close:hover {
        opacity: 1;
    }
</style>
<div class="top1">
    <div id="top1-name"></div>
    <div id="top1-skill"></div>
</div>
<div id="other"></div>
<div id="close">close</div>
`;

const element = (name, skill) => {
    return `
        <div class="element">
            <div class="name">${name}</div>
            <div class="skill">${skill}</div>
        </div>
    `;
};

export class SkillTop extends HTMLElement
{
    constructor()
    {
        super();

        this.shadow_root = this.attachShadow({ mode: 'open' });
    }

    observer(top)
    {
        if ( ! top.length) return;

        top.sort((a, b) => b.skill - a.skill);

        const first = top.shift();

        this.top1_name.innerHTML = first.name;
        this.top1_skill.innerHTML = first.skill;

        this.other.innerHTML = top.reduce((acc, cur) => {
            return acc + element(cur.name, cur.skill);
        }, '');
    }

    connectedCallback()
    {
        this.shadow_root.innerHTML = template;

        this.top1_name = this.shadow_root.querySelector('#top1-name');
        this.top1_skill = this.shadow_root.querySelector('#top1-skill');
        this.other = this.shadow_root.querySelector('#other');

        this.observer(skill_top_service.init());
        this.obs_id = skill_top_service.add_obs(this.observer.bind(this));

        this.shadow_root.querySelector('#close')
            .addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();

                this.parentNode.removeChild(this);
            });
    }

    disconnectedCallback()
    {
        skill_top_service.remove_obs(this.obs_id);
    }
}
