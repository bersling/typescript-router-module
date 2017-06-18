import {Router, Request, Response, NextFunction} from 'express';
import * as passport from 'passport';

export class LoginRouter {
  router: Router;

  /**
   * Take login handler and attach to login endpoint, but precede it with authentication
   */
  init() {
    this.router.post('/login', passport.authenticate(
      'local',
      {
        session: false,
        failWithError: true
      }),
      this.loginHandler,
      this.errorHandler);
  }

  /**
   * Initialize the login
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  public loginHandler(req: Request, res: Response, next: NextFunction) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.

    res.status(200).send({
      message: 'Success',
      status: res.status,
      data: req.user
    });

  }

  errorHandler(err, req, res, next) {
    console.log('handling error');
    res.statusMessage = 'Wrong username or password.';
    res.status(err.status).send();
  }



}

// Create the CrudRouter, and export its configured Express.Router
const intialRouter = new LoginRouter();
intialRouter.init();

export const loginRouter = intialRouter.router;
