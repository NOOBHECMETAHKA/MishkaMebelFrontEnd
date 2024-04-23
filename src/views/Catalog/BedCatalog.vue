<template>
  <Toast />
  <div>
<!--    Product info-->
    <Dialog v-model:visible="detailProductIsActive" @close="" modal header="Меню навигации" :style="{ width: '50rem' }">
      <template #header>
        <img class="min-logo" src="@/assets/img/Logo.png" alt="MishkaMebelLogo">
        <span class="__modal_card_title">Мишка мебель</span>
      </template>
      <div v-if="selectedProduct">
        <div v-if="selectedProduct.photos">
          <Galleria :value="selectedProduct.photos" :numVisible="5" containerStyle="max-width: 640px" :showThumbnails="false"
                    :showIndicators="true" :changeItemOnIndicatorHover="true" :showIndicatorsOnItem="inside" :indicatorsPosition="position">
            <template #item="slotProps">
              <img class="catalog_grid__card__img" :src="slotProps.item.link" alt="Попытка" style="" />
            </template>
          </Galleria>
        </div>
        <table class="table-detail-product">
          <tr>
            <td class="__text_main-color">Наименование:</td>
            <td class="__text_second-color">{{ selectedProduct.name }}</td>
          </tr>
          <tr>
            <td class="__text_main-color">Описание:</td>
            <td class="__text_second-color">{{ selectedProduct.description }}</td>
          </tr>
          <tr>
            <td class="__text_main-color">Цена:</td>
            <td v-if="selectedProduct.discounts" class="__text_second-color"><del>{{ getPrice(selectedProduct.price, selectedProduct.discounts.percent) }}</del> {{ getPrice(selectedProduct.price, 0) }} рублей</td>
            <td v-else class="__text_second-color">{{ getPrice(selectedProduct.price, 0) }} рублей </td>
          </tr>
          <tr>
            <td class="__text_main-color">Гарантия:</td>
            <td><Tag severity="secondary" :value="selectedProduct.guarantee"></Tag></td>
          </tr>
          <tr>
            <td>
              <vue-button label="Добавить в корзину" icon="pi pi-cart-plus" @click="addProductInBasket(selectedProduct.id, selectedProduct.name)"/>
            </td>
          </tr>
        </table>
      </div>
    </Dialog>
<!--    End Product info-->
<!--    Filter-->
    <Dialog v-model:visible="filterIsActive" modal header="Меню навигации" :style="{ width: '25rem' }">
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
<!--    End Filter-->
<!--    End dialog-->
    <h1 class="catalog-title">Кровати</h1>
    <div class="catalog-panel">
      <DataView :value="collectionInfo" paginator :rows="10" :layout="layout">
        <template #header>
          <div class="catalog_header_panel">
            <vue-button icon="pi pi-filter" @click.prevent="filterIsActive = true"></vue-button>
            <DataViewLayoutOptions v-model="layout" v-if="windowWidth > 1100"/>
          </div>
        </template>
        <template #empty>
          <empty-content :is-finished="loading"></empty-content>
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
                    <vue-button label="Добавить в корзину" icon="pi pi-cart-plus" @click="addProductInBasket(item.id, item.name)"/>
                    <vue-button icon="pi pi-list" @click="chooseProductForInformation(item, true)"/>
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
                  <vue-button label="Добавить в корзину" icon="pi pi-cart-plus" @click="addProductInBasket(item.id, item.name)"/>
                  <vue-button icon="pi pi-list" @click="chooseProductForInformation(item, true)"/>
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
import EmptyContent from "@/components/EmptyContent.vue";
import Galleria from 'primevue/galleria';
import Cart from "@/store/Cart.js";

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
//Functions
import { store } from "@/store/index.js";

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
    Tag,
    EmptyContent,
    Galleria,
    Toast,
    useToast
  },
  data(){
    return {
      //View catalog params
      layout: 'grid',
      windowWidth: window.innerWidth,
      inside: false,
      position: 'bottom',
      positionOptions: [
        {
          label: 'Bottom',
          value: 'bottom'
        },
        {
          label: 'Top',
          value: 'top'
        },
        {
          label: 'Left',
          value: 'left'
        },
        {
          label: 'Right',
          value: 'right'
        }
      ],
      //Basket
      basket: new Cart(),

      //Bases loading
      collectionInfo: null,
      count: 0,
      loading: true,
      
      //Dialog visible
      filterIsActive: false,
      detailProductIsActive: false,
      
      selectedProduct: null,
      
      //Filter params
      nameProduct: '',
      minPrice: null,
      maxPrice: null,
      selectedGuarantees: [],
      
      //Filter content
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
    useToast();
  },
  methods: {
    /**
     * Метод получения данных с сервера
     * { params: { 'category': 'beds'}}
     */
    getProducts(){
      this.axios.get('/products', ).then(resp => {
        this.collectionInfo = resp.data.data;
        this.count = resp.data.data.length;
        this.loading = false;
      }).catch(bug => {
        this.loading = false;
      });
    },
    /**
     * Метод подготовки ценообразования
     */
    getPrice(value, percent){
      return Math.round(value - (value / 100 * percent)).toLocaleString();
    },
    /**
     * Метод получения максимального размера окна
     */
    handleResize() {
      this.windowWidth = window.innerWidth;
      if(this.windowWidth < 1100){
        this.layout = 'grid';
      }
    },
    /**
     * Метод получения подробной информации о товаре
     */
    chooseProductForInformation(selectedProduct, isActive){
      this.selectedProduct = selectedProduct;
      this.detailProductIsActive = isActive;
    },
    /**
     * Метод добавления товара в корзину
     */
    addProductInBasket(IDProduct, helpFullName){
      if(store.personalBasket.cartItemsCount < 10) {
        store.personalBasket.addToCart(IDProduct);
        if(helpFullName){
          this.$toast.add({ severity: 'success', summary: '👍 Успешно', detail: `Товар "${helpFullName}" успешно добавлен в корзину!`, life: 3000 });
        } else {
          this.$toast.add({ severity: 'success', summary: '👍 Успешно', detail: `Товар успешно добавлен в корзину!`, life: 3000 });
        }
      } else {
        this.$toast.add({ severity: 'warn', summary: 'Ошибка', detail: `Больше товаров нельзя добавить в корзину, так как это уже крупный заказ!`, life: 3000 });
      }
    }
  }
}
</script>