const backgrounds = new BackgroundsModule(['main', 'fish']);


const S = Storage.create(
    {
        balance: 500,
        bet: 10,
        music: true,
        fish: [],
        dirt: 0
    },
    {
        bet: (value, _S) => {
            if (value < 10) {
                _S.bet = 10;
            }

            if (value > _S.balance) {
                _S.bet = Math.floor(_S.balance / 10) * 10;
            }
        },

        balance: (value, _S) => {
            if (value < 10) {
                _S.balance = 100;
            }
        }
    }
);


function play() { audioEl.play(); pauseEl.style.display = 'none'; S.music = true; }
function pause() { audioEl.pause(); pauseEl.style.display = 'block'; S.music = false; }
function pauseView() { audioEl.pause(); pauseEl.style.display = 'play'; }

/** '\x02wkz)(²\x98\x9D¢' */

new View('license',
    () => {
        backgrounds.setActive('main');
    }
);

new View('menu',
    () => {
        backgrounds.setActive('main');
    }
);

new View('game',
    () => {
        backgrounds.setActive('main');
        if (S.music) {
            play()
        } else {
            pause();
        }
    },
    () => {
        pauseView();
    }
);


const fishView = new View('fish',
    () => {
        backgrounds.setActive('fish');
    },
    () => {
    }
);
