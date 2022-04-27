import * as alias from 'module-alias';
import * as ClientComponent from './Client';

alias.addAliases({
    '@': __dirname
});

export { ClientComponent };
