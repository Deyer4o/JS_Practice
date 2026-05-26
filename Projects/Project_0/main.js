import { Engine } from "../../engine/engine.js";

async function main() {
    const engine = new Engine("main");

    await engine.initialize();

    engine.start();
}

document.addEventListener(
    "DOMContentLoaded",
    () => {
        main();
    }
);