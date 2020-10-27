import {Router} from 'express';

const router:Router = Router();

import {gramaticaController} from '../controller/gramatica.controller';

router.post('/',gramaticaController.ejecutar);

export default router;