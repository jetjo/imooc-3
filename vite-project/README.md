# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


工程创建步骤：
1、sudo yarn create vite //这一步后，工程目录默认属于root用户
2、cd到工程目录的父目录
3、sudo chown -R $(whoami) .//设置当前目录下所有文件所有者为当前用户
4、sudo yarn //安装依赖
5、yarn dev
