import { initialData } from "./seed";

async function main() {
    console.log('Seeding database...');

    

}

(()=> {

    // If we are in production, we don't want to seed the database. That's destructive.
    if( process.env.NODE_ENV === 'production' ) return;

    console.log(initialData)

    main();
})();