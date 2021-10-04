<template>
  <div class="add__container">
    <transition name="fade">
      <Toast v-if="isAdded">
        <div>
          <strong>{{ newLink.name }}</strong> <span>added.</span>
        </div>
      </Toast>
    </transition>
    <div class="add__container--page-link mt-2" @click="returnListHomePage()">
      <i class="fas fa-arrow-left"></i>
      <span>Return to List</span>
    </div>
    <div class="add__container--title mt-2">Add New Link</div>
    <div class="mt-2">
      <div class="add__container--label">Link Name:</div>
      <input
        class="add__container--input"
        type="text"
        v-model="newLink.name"
        placeholder="e.g. Alphabet"
      />
    </div>
    <div class="mt-2">
      <div class="add__container--label">Link URL:</div>
      <input
        class="add__container--input"
        type="email"
        v-model="newLink.link"
        placeholder="e.g. http://abc.xyz"
      />
    </div>
    <div class="add__container--btn mt-2">
      <button @click="addNewLink">Add</button>
    </div>
  </div>
</template>
<script>
import Toast from "../components/Toast.vue";
export default {
  name: "Add",
  data() {
    return {
      newLink: {
        id: null,
        name: "",
        link: "",
        vote: 0,
        date: null,
      },
      isAdded: false,
      maxFadeDuration: 1500,
    };
  },
  components: {
    Toast,
  },
  methods: {
    addNewLink() {
      this.newLink.id = new Date().getTime();
      this.newLink.date = new Date();

      let linkData = [];
      let data = [];

      if (localStorage.getItem("linkData")) {
        linkData = JSON.parse(localStorage.getItem("linkData"));
        linkData.forEach((item) => {
          item.data.unshift(this.newLink);
          item.count = item.data.length;
        });
      } else {
        linkData = [];
        data.push(this.newLink);
        linkData = [{ count: data.length, data: [...data] }];
      }
      localStorage.setItem("linkData", JSON.stringify(linkData));
      this.isAdded = true;
    },
    returnListHomePage() {
      this.$router.push("/");
    },
  },
  watch: {
    isAdded() {
      if (this.isAdded) {
        if (this.maxFadeDuration > 0) {
          setTimeout(() => {
            this.isAdded = false;
          }, this.maxFadeDuration);
        }
      }
    },
  },
};
</script>
<style>
.add__container {
  width: 50vh;
  height: 50vh;
}
</style>