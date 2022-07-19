const LEFT = 0;
const RIGHT = 1;
const MAX_FISH_SIZE = 20;


class Fish {
    constructor(size, texture, parent) {
        this.size = size;
        this.texture = texture;
        this.direction = random(1);
        this.speed = random(1000) / 9000;
        this.pos = { x: random(100), y: random(10, 90) };


        const fishEl = document.createElement('img');
        fishEl.src = this.texture;
        fishEl.classList.add('fish-el');
        this.fishEl = fishEl;
        parent.appendChild(fishEl);
    }

    tick() {
        if (this.direction === RIGHT) {
            this.pos.x += this.speed;
            if (this.pos.x > (100 - this.size * MAX_FISH_SIZE)) {
                this.direction = LEFT;
            }
        } else {
            this.pos.x -= this.speed;
            if (this.pos.x < 0) {
                this.direction = RIGHT;
            }
        }
        this.drow();
    }

    drow() {
        this.fishEl.style.left = `${this.pos.x}%`;
        this.fishEl.style.top = `${this.pos.y}%`;
        this.fishEl.style.width = `${this.size * MAX_FISH_SIZE}%`;
        if (this.direction === RIGHT) {
            this.fishEl.classList.add('to-right');
            this.fishEl.classList.remove('to-left');
        } else {
            this.fishEl.classList.remove('to-right');
            this.fishEl.classList.add('to-left');
        }
    }
}

class Aquarium {
    constructor(fish) {
        this.container = q('.aquarium')[0];
        this.container.innerHTML = '';
        this.fish = fish.map(f => new Fish(f.size, f.texture, this.container));
        this.start();
    }

    destroy() {
        this.destroyed = true;
        this.container.innerHTML = '';
    }

    start() {
        const tick = () => {
            if (this.destroyed) { return; }
            requestAnimationFrame(tick);
            this.fish.forEach(f => f.tick())
        }
        tick();
    }
}

let aquarium;

function buyFish(i) {
    const price = i * 1000;
    if (price < S.balance) {
        S.balance -= price;
    } else {
        msg(`You need more money`);
        return;
    }

    S.fish.push({ texture: `./img/fish_${i}.png`, size: 0.15 });
    S.fish = S.fish;
    aquarium.fish.push(new Fish(0.15, `./img/fish_${i}.png`, aquarium.container));
}

let dirtActive = false;

function showDirt() {
    dirtActive = true;
    q('.dirt')[0].style.opacity = S.dirt;
}

function hideDirt() {
    dirtActive = false;
    q('.dirt')[0].style.opacity = '0';
}

hideDirt();

q('.sponch').on('click', () => {
    S.dirt -= 0.05;
    if (S.dirt < 0) {
        S.dirt = 0;
    }
    if (dirtActive) {
        showDirt();
    }
})

setInterval( () => {
    S.dirt += 0.015;
    if (S.dirt > 1) {
        S.dirt = 1;
    }
    if (dirtActive) {
        showDirt();
    }
}, 7000);


fishView.on('activate', () => { aquarium = new Aquarium(S.fish); showDirt() });
fishView.on('deactivate', () => { aquarium.destroy(); hideDirt() });