import { reactive } from "vue";

const state = /* reactive */ {
  name: "杨兵",
  annualSalary: 10000000,
};

setTimeout(() => {
  console.log("工资变化了~");
  state.annualSalary = Math.random() * 99999999999;
}, 9999);

export default state;
