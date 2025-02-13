import { Router } from 'express';

export function mockPatchingRouter(router: Router) {
  /**
   *  Monck patching
   *  this strategy consists in, modify a function or method in runtime
   *  in this case, add a log to shows a route registered
   *
   */

  const _get = router.get; // gets original function
  const _post = router.post;
  const _delete = router.delete;
  const _patch = router.patch;
  const _put = router.put;

  router.get = function () {
    console.log(`Route {GET}${arguments[0]} binding successfully`);

    return _get.apply(this, arguments);
  };

  router.post = function () {
    console.log(`Route {POST}${arguments[0]} binding successfully`);

    return _post.apply(this, arguments);
  };

  router.delete = function () {
    console.log(`Route {DELETE}${arguments[0]} binding successfully`);

    return _delete.apply(this, arguments);
  };

  router.patch = function () {
    console.log(`Route {PATCH}${arguments[0]} binding successfully`);

    return _patch.apply(this, arguments);
  };
  router.put = function () {
    console.log(`Route {PUT}${arguments[0]} binding successfully`);

    return _put.apply(this, arguments);
  };
  return router;
}
