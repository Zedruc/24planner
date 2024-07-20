<template>
  <div>
    <input type="text" @input="onChange" @change="onChangeReal" v-model="search" @keydown.down="onArrowDown"
      @keydown.up="onArrowUp" @keydown.enter="onEnter" :placeholder="customPlaceHolder" @blur="onEnter"/>

    <div class="autocomplete">
      <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
        <li class="loading" v-if="isLoading">
          Loading results...
        </li>
        <li v-else v-for="(result, i) in results" :key="i" @click="setResult(result)" class="autocomplete-result"
          :class="{ 'is-active': i === arrowCounter }">
          {{ result }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchAutocomplete',
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
    customPlaceHolder: {
      type: String,
      required: false,
      default: 'ZZZZ'
    },
  },
  data() {
    return {
      isOpen: false,
      results: [],
      search: '',
      isLoading: false,
      arrowCounter: -1,
    };
  },
  watch: {
    items: function (value, oldValue) {
      if (value.length !== oldValue.length) {
        this.results = value;
        this.isLoading = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.$emit('result', result);
    },
    filterResults() {
      this.results = this.items.filter((item) => {
        return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
    onChange() {
      this.$emit('input', this.search);

      if (this.isAsync) {
        this.isLoading = true;
      } else {
        this.filterResults();
        this.isOpen = true;
      }
    },
    onChangeReal() {
      this.$emit('input', this.search);
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      if (this.results[this.arrowCounter] != undefined) {
        this.search = this.results[this.arrowCounter];
      }
      this.isOpen = false;
      this.arrowCounter = -1;
    },
  },
};
</script>

<style scoped>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  box-shadow: 1px 1px 10px rgb(0 0 0 / 50%);
  padding: .5rem;
  border-radius: 4px;
  height: 120px;
  width: 10rem;
  overflow: auto;
  position: absolute;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:not(:last-child) {
  border-bottom: 1px solid var(--slate-gray);
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

input {
  width: 100%;
  height: auto;
  padding: .3rem;

  outline: none;
  border: 1px solid var(--input-border);
  border-radius: 4px;
  margin-top: .3rem;
  background-color: var(--input-background);
  color: aliceblue;

  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
}
</style>