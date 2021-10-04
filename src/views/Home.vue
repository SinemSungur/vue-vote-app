<template>
  <div class="home__container">
    <transition name="fade">
      <Toast v-if="isRemove">
        <div>
          <strong>{{ removeCardData.name }}</strong> <span>removed.</span>
        </div>
      </Toast>
    </transition>
    <div class="home__container--title">
      <button @click="addLinkPage()">+</button>
      <div class="home__container--content">Submit a link</div>
    </div>
    <div class="border-bottom__container"></div>
    <div class="home__wrapper" v-if="linkData.length > 0">
      <select @change="orderBy()" v-model="selectedOption">
        <option value="" disabled selected hidden>Order By</option>
        <option value="mostVoted">Most Voted (Z -> A)</option>
        <option value="lessVoted">Less Voted (A -> Z)</option>
      </select>
      <div class="card__wrapper" v-for="(item, key) in linkData" :key="key">
        <div class="card__wrapper--delete" @click="removeActivated(item)">
          <i class="fas fa-minus-circle"></i>
        </div>
        <div class="card__wrapper--score">
          <div class="card__wrapper--score-point">{{ item.vote }}</div>
          <div class="card__wrapper--score-name">Points</div>
        </div>
        <div class="card__wrapper--info">
          <div class="card__wrapper--info-name">{{ item.name }}</div>
          <div class="card__wrapper--info-link">{{ item.link }}</div>
          <div class="card__wrapper--info-vote">
            <div @click="increment(item)">
              <i class="fas fa-arrow-up"></i> <span>Up Vote</span>
            </div>
            <div @click="decrement(item)">
              <i class="fas fa-arrow-down"></i> <span>Down Vote</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination__container" v-show="pageNumbers !== 0">
        <div class="pagination-list" @click="selectedPageNo($event)">
          <a class="pagination-list-item previous">Previous</a>

          <div
            class="pagination-list-numbers"
            v-for="(number, key) in pageNumbers"
            :key="key"
          >
            <span :class="{ select: number === activePage }">
              {{ number }}
            </span>
          </div>

          <a class="pagination-list-item next">Next</a>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="isModal" class="modal--mask">
          <div class="modal--wrapper">
            <div class="modal--container">
              <div class="modal--header">
                Remove Link
                <i
                  class="modal--icon fa fa-times"
                  role="button"
                  @click="closeModal"
                  @keyup.esc="closeModal"
                ></i>
              </div>

              <div class="modal--body">
                <div class="modal--body--content">
                  <div class="modal--body--content-message">
                    Do you want to remove:
                  </div>
                  <div class="modal--body--content-name">
                    {{ removeCardData.name }}
                  </div>
                </div>
              </div>

              <div class="modal--footer">
                <div class="modal--footer--wrapper">
                  <button class="modal--footer--wrapper-btn" @click="remove">
                    OK
                  </button>
                  <button
                    class="modal--footer--wrapper-btn"
                    @click="closeModal()"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Toast from "../components/Toast.vue";
export default {
  name: "Home",
  data() {
    return {
      links: [],
      activePage: 1,
      selectedOption: "",
      isRemove: false,
      removeCardData: "",
      isModal: false,
      maxFadeDuration: 1500,
    };
  },
  components: {
    Toast,
  },
  methods: {
    addLinkPage() {
      this.$router.push("/add");
    },
    increment(event) {
      this.links[0].data.forEach((item) => {
        if (item.id === event.id) {
          return item.vote++;
        }
      });
      localStorage.setItem("linkData", JSON.stringify(this.links));
    },
    decrement(event) {
      this.links[0].data.forEach((item) => {
        if (item.id === event.id) {
          item.vote === 0 ? 0 : item.vote--;
        }
      });
      localStorage.setItem("linkData", JSON.stringify(this.links));
    },
    remove() {
      this.links[0].data = this.links[0].data.filter(
        (item) => item.id !== this.removeCardData.id
      );
      this.links[0].count--;
      localStorage.setItem("linkData", JSON.stringify(this.links));
      this.isRemove = true;
      this.closeModal();
    },
    removeActivated(event) {
      this.removeCardData = event;
      this.isModal = true;
    },
    closeModal() {
      this.isModal = false;
    },
    selectedPageNo(event) {
      if (event.target.textContent === "Previous") {
        this.activePage === 1 ? 1 : this.activePage--;
      } else if (event.target.textContent === "Next") {
        this.activePage === this.pageNumbers
          ? this.pageNumbers
          : this.activePage++;
      } else {
        this.activePage = +event.target.textContent;
      }
    },
    orderBy() {
      if (this.selectedOption === "lessVoted") {
        this.links[0].data
          .sort((a, b) => (a.vote > b.vote ? 1 : b.vote > a.vote ? -1 : 0))
          .slice((this.activePage - 1) * 6, this.activePage * 6);
      } else {
        this.links[0].data
          .sort((a, b) => (b.vote > a.vote ? 1 : a.vote > b.vote ? -1 : 0))
          .slice((this.activePage - 1) * 6, this.activePage * 6);
      }
    },
  },
  computed: {
    pageNumbers() {
      return Math.ceil(this.links[0].count / 5);
    },
    linkData() {
      return this.links[0].data.slice(
        (this.activePage - 1) * 5,
        this.activePage * 5
      );
    },
  },
  created() {
    this.links = JSON.parse(localStorage.getItem("linkData") || "[]");
    if (this.links.length === 0) {
      this.addLinkPage();
    }
  },
  watch: {
    isRemove() {
      if (this.isRemove) {
        if (this.maxFadeDuration > 0) {
          setTimeout(() => {
            this.isRemove = false;
          }, this.maxFadeDuration);
        }
      }
    },
  },
};
</script>
<style>
</style>