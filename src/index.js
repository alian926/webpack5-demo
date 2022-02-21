import './styles/index.scss';

const statement = 'this is a webpack demo'

const foo = () => {
    console.log(statement)
}

const bar = () => {
    console.log(ENV)
}

function main () {
    console.log('src/index.js, say hello')
    foo();
    bar();
}



main();