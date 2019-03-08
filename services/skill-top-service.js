import { uid } from "../utils/uniq.js";

const observers = {};

let top = [];

const add_obs = fn => {
    const id = uid();

    observers[id] = fn;

    return id;
};

const remove_obs = id => delete observers[id];
const init = () => top.map(v => v);

const worker = async () => {
    const response = await fetch('http://nelkor.ru/api.php');

    try {
        top = await response.json();

        for (const id in observers) {
            const fn = observers[id];

            fn(top.map(v => v));
        }
    } catch (e) {}
};

worker();
setInterval(worker, 2000);

export const skill_top_service = { add_obs, remove_obs, init };
