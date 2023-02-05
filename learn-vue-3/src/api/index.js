import request from "@/utils/request";
import { readonly, unref } from "vue";

export function getMockData(params)
{
  console.log({ params }, 'onCleanup');
  params = readonly(params)
  const controller = new AbortController();
  const { abort, signal } = controller;
  return [request({
    url: '/user/list',
    method: 'get',
    params,
    signal
  }), () =>
  {
    console.log('onCleanup...');
    // abort(); Uncaught(in promise) TypeError: Illegal invocation
    controller.abort();
  }]
}
