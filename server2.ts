const Router = require('cloudworker-router');

const router = new Router();

router.get('/', async (ctx) => {
  return new Response('Hello World');
});

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return router.handle(request, env, ctx);
  },
};
