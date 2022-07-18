const backgrounds = new BackgroundsModule(['main', 'game']);


const S = Storage.create(
    {
        balance: 500,
        bet: 10,
        music: true
    }
);

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
    },
    () => {
    }
);
