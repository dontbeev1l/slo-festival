function msg(t) {
    q('.msg-wrap').setHTML(`<div class="msg">${t}</div>`)
}

class Game {
    constructor() {
        this.container = q('.game__field')[0];
        this.generateField();
    }

    generateField() {
        this.container.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            this.container.appendChild(this._createRow(5 - i))
        }
    }

    _createRow(coef) {
        const row = document.createElement('div');
        row.setAttribute('data-x', `x${coef}`)
        row.setAttribute('data-coef', `${coef}`)
        const nums = new Set();
        while (nums.size < 2) {
            nums.add(random(5))
        };
        for (let i = 0; i < 5; i++) {
            const b = document.createElement('div');
            b.innerHTML = '<img src="./img/bubble_i.png">';
            b.classList.add('g_bubble');
            b.onclick = this.generateBubleClickFn(b);
            b.setAttribute('data-lose', nums.has(i) ? 1 : 0);
            row.appendChild(b);
        }
        return row;
    }

    generateBubleClickFn(el) {
        return () => {
            if (!this.activate) {
                msg('Place your bet')
                return;
            }
            if (!el.parentNode.classList.contains('active')) {
                return;
            }
            el.activate();
            const win = !(+el.getAttribute('data-lose'));
            if (win) {
                this.container.children[this.activeRow].deactivate();
                this.activeRow--;
                if (this.activeRow < 0) {
                    this.activeRow++;
                    this.end();
                    return;
                }
                this.container.children[this.activeRow].activate();
            } else {
                this.activeRow++;
                this.end();
            }
        }
    }

    end() {
        const win = 5 - this.activeRow;
        S.balance += this.bet * win;
        if (win > 0) {
            msg(`You win ${this.bet * win}!`)
        } else {
            msg('You lose.')
        }

        setTimeout(() => {
            this.generateField();
            this.activate = false;
        }, 1000)
    }




    play() {
        this.bet = S.bet;
        if (this.active) {
            return;
        }

        if (S.balance < S.bet) {
            msg('Low balance');
            return;
        }

        S.balance -= S.bet;
        this.activate = true;
        this.activeRow = 4;
        this.container.children[this.activeRow].activate();
    }
}

const game = new Game();


q('.bet_m').on('click', () => { S.bet -= 10; });
q('.bet_p').on('click', () => { S.bet += 10; });

q('.game__play').on('click', () => { game.play(); });

let foodCount = 2;
setInterval(() => {
    if (foodCount < 3) {
        foodCount++;
    }
}, 15000)


q('.food').on('click', () => {
    if (!foodCount) { msg(`Not so often!`); return; }
    foodCount--;
    for (let i = 0; i < random(50, 30); i++) {
        const part = document.createElement('div');
        part.classList.add('korm-part');
        part.style.left = `${random(100)}%`;
        part.style.top = '-16px';
        part.style.opacity = '1';
        part.style.transform = `scale(${random(100) / 100})`;


        document.body.appendChild(part);

        setTimeout(() => {
            part.style.top = `${random(100)}%`;
            part.style.opacity = '0';
            part.style.transform = `scale(0)`;
        }, 5);
    }

    const r = random(S.fish.length - 1);

    if (S.fish[r].size < 1) {
        S.fish[r].size += 0.1;
        aquarium.fish[r].size += 0.1;
        S.fish = S.fish;
    }
})


const vC = new ViewController().setView('license');