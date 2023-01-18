import express, {Application, request, Response} from 'express';
import { shopRouter } from './routes';

const app:Application = express();


const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/shops", shopRouter);

app.listen(port, ():void => {
    console.log(`listening on port ${port}`);
});