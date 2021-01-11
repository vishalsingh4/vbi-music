import { init } from '@rematch/core';
import createRematchPersist from '@rematch/persist';

import models from '../models';

const persistPlugin = createRematchPersist({
    whitelist: ['songs'],
    throttle: 5000,
    version: 1,
    debug: true
});

const store = init({ 
    models,
    plugins: [persistPlugin]
 });

export default store;