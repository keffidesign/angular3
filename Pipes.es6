class PipesHub {

    static HUB = new Map();

    register(key, pipeFn) {

        PipesHub.HUB.set(key, pipeFn);

    }

    transform(value, pipe) {

        return PipesHub.HUB.get(pipe)(value);

    }

}

export const Pipes = new PipesHub();

Pipes.register('uppercase', (value) => value.toUpperCase());