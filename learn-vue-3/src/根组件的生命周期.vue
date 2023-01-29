<script>
export default {
  beforeCreate() {
    console.log(document.getElementById("app").outerHTML, "beforeCreate~~~");
  },
  created() {
    console.log(document.getElementById("app").outerHTML, "created~~~");
  },
  beforeMount() {
    console.log(document.getElementById("app").outerHTML, "beforeMount~~~");
  },
  mounted() {
    console.log(document.getElementById("app").outerHTML, "mounted~~~");
  },
  beforeUpdate() {
    console.log(document.getElementById("app").outerHTML, "beforeUpdate~~~");
  },
  updated() {
    console.log(document.getElementById("app").outerHTML, "updated~~~");
  },
  beforeUnMount() {
    console.log(document.getElementById("app").outerHTML, "beforeUnMount~~~");
  },
  unmounted() {
    console.log(document.getElementById("app").outerHTML, "unmounted~~~");
  },
  beforeDestroy() {
    console.log(document.getElementById("app").outerHTML, "beforeDestroy~~~");
  },
  destroyed() {
    console.log(document.getElementById("app").outerHTML, "destroyed~~~");
  },
  data() {
    return {
      msg: "hh",
    };
  },
  inject: {
    _unmount_: {
      from: "unmount",
      default: () => void 0,
    },
  },
  methods: {
    triggerUpdate() {
      this.msg = Math.random();
    },
    triggerUnmount() {
      //   this.unmount();
      this._unmount_();
      console.log(
        this.unmount === this._unmount_,
        "this.unmount === this._unmount_"
      );
    },
  },
};
</script>
