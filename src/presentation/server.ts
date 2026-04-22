import express, { Router } from 'express';
import path from 'node:path';


interface Options {

    port: number;
    routes: Router;
    public_path?: string;

}

export class Server{

    private app = express();
    private readonly port: number;
    private readonly routes: Router; 
    private readonly publicPath: string;

    constructor(options : Options){
        const { port, routes ,public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){

        // Middlewares
        this.app.use( express.json());
        this.app.use( express.urlencoded({ extended: true })); // x-www-form-urlencoded

        // Public Forlder
        this.app.use( express.static( this.publicPath));


        // Routes
        this.app.use(this.routes);


        // SPA
        this.app.get('*', (req, res ) => {
            const indexPath = path.join(process.cwd(), this.publicPath, 'index.html');
            res.sendFile(indexPath);
        })


        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })

    }

}