async function LoginCheck(ctx, next)
{
  if (ctx.session && ctx.session.user)
  {
    await next();
    return;
  }
  ctx.response.status = 403;
}

module.exports = {
  LoginCheck
}
