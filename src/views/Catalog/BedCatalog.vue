<template>
  <div>
    <Dialog v-model:visible="visible" modal header="Меню навигации" :style="{ width: '25rem' }">
      <template #header>
        <img class="min-logo" src="@/assets/img/Logo.png" alt="MishkaMebelLogo">
        <span class="__modal_card_title">Мишка мебель</span>
      </template>
      <div class="product__form-filter">
        <div>
          <p class="form-filter__title">Гарантия на товар</p>
          <ul class="form-filter__list_check_boxes">
            <li v-for="guarantee of guarantees">
              <Checkbox v-model="selectedGuarantees" :inputId="guarantee" name="guarantee" :value="guarantee" />
              <label class="form-filter__label" :for="guarantee">{{ `  ${guarantee}` }}</label>
            </li>
          </ul>
        </div>
        <div>
          <p class="form-filter__title">Минимальная цена</p>
          <InputNumber v-model="minPrice" inputId="Минимальная цена" suffix=" рублей" />
        </div>
        <div>
          <p class="form-filter__title">Максимальная цена</p>
          <InputNumber v-model="maxPrice" inputId="Максимальная цена" suffix=" рублей" />
        </div>
        <div>
          <prime-vue-button icon="pi pi-search" label="Найти"></prime-vue-button>
        </div>
      </div>
    </Dialog>
<!--    End dialog-->
    <h1 class="catalog-title">Кровати</h1>
    <div class="catalog-panel">
      <DataView :value="collectionInfo" paginator :rows="10" :layout="layout">
        <template #header>
          <div class="catalog_header_panel">
            <vue-button icon="pi pi-filter" @click.prevent="visible = true"></vue-button>
            <DataViewLayoutOptions v-model="layout" v-if="windowWidth > 1100"/>
          </div>
        </template>
        <template #empty>
          Ничего нету
        </template>
        <template #list="slotProps">
          <div class="catalog_list__list">
            <table>
              <tr v-for="(item, index) in slotProps.items">
                <td>
                  <img v-if="item.photos.length > 0" class="catalog_grid__card__img" :src="item.photos[0].link" alt="">
                  <img v-else class="catalog_grid__card__img" src="@/assets/img/Empty.jpg" alt="">
                </td>
                <td>
                  <p class="__text_main-color">{{ item.name }}</p>
                </td>
                <td>
                  <p v-if="item.discounts" class="__text_second-color"><del>{{ getPrice(item.price, item.discounts.percent) }}</del> {{ getPrice(item.price, 0) }} рублей</p>
                  <p v-else class="__text_second-color">{{ getPrice(item.price, 0) }} рублей </p>
                </td>
                <td>
                  <p><Tag severity="secondary" :value="item.guarantee"></Tag></p>
                </td>
                <td>
                  <div class="catalog_grid__card__panel">
                    <vue-button label="Добавить в корзину" icon="pi pi-cart-plus" />
                    <vue-button icon="pi pi-list"/>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </template>
        <template #grid="slotProps">
          <div class="catalog_grid__list">
            <div v-for="(item, index) in slotProps.items">
              <div class="catalog_grid__card">
                <img v-if="item.photos.length > 0" class="catalog_grid__card__img" :src="item.photos[0].link" alt="">
                <img v-else class="catalog_grid__card__img" src="@/assets/img/Empty.jpg" alt="">
                <p class="catalog_grid__card__title __text_main-color">{{ item.name }}</p>
                <p v-if="item.discounts" class="catalog_grid__card__subtitle __text_second-color"><del>{{ getPrice(item.price, item.discounts.percent) }}</del> {{ getPrice(item.price, 0) }} рублей</p>
                <p v-else class="catalog_grid__card__subtitle __text_second-color">{{ getPrice(item.price, 0) }} рублей </p>
                <p></p>
                <p><Tag severity="secondary" :value="item.guarantee"></Tag></p>
                <div class="catalog_grid__card__panel">
                  <vue-button label="Добавить в корзину" icon="pi pi-cart-plus" />
                  <vue-button icon="pi pi-list"/>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>

<script>
import Checkbox from "primevue/checkbox";
import InputNumber from "primevue/inputnumber";
import AutoComplete from "primevue/autocomplete";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import {FilterMatchMode} from "primevue/api";
import { PrimeIcons } from 'primevue/api';
import IconUser from "@/components/Icons/IconUser.vue";
import Dialog from "primevue/dialog";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Tag from "primevue/tag";
export default {
  components: {
    IconUser,
    Checkbox,
    InputNumber,
    AutoComplete,
    "PrimeVueButton": Button,
    DataTable,
    Column,
    InputText,
    VueButton: Button,
    PrimeIcons,
    Dialog,
    DataView,
    DataViewLayoutOptions,
    Tag
  },
  data(){
    return {
      layout: 'grid',
      windowWidth: window.innerWidth,

      collectionInfo: null,
      count: 0,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      loading: true,
      selectedElement: null,
      visible: false,

      products: null,
      nameProduct: '',
      minPrice: null,
      maxPrice: null,
      selectedGuarantees: [],
      guarantees: [
        'Нету гарантии',
        '3 месяца',
        '1 год',
        '2 года',
        '3 года',
        '5 лет',
      ],
    };
  },
  mounted() {
    this.getProducts();
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    getProducts(){
      this.axios.get('/products', { params: {'category': 'beds'} }).then(resp => {
        this.collectionInfo = resp.data.data;
        this.count = resp.data.data.length;
        this.loading = false;
        console.log(resp);
      });
    },
    getPrice(value, percent){
      return Math.round(value - (value / 100 * percent)).toLocaleString();
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      if(this.windowWidth < 1100){
        this.layout = 'grid';
      }
    }
  }

//
}
</script>