const ALL = new Map();

export const Pipes = {

    register(key, pipeFn) {

        ALL.set(key, pipeFn);
    },

    transform(value, pipeId) {

        const pipe = ALL.get(pipeId);

        return pipe? pipe(value): value;
    }
};

Pipes.register('upper', (value) => value.toUpperCase());