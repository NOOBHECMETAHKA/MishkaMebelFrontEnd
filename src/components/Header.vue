<template>
  <div>
    <Dialog v-model:visible="visible" modal header="Меню навигации" :style="{ width: '25rem' }">
      <template #header>
        <img class="min-logo" src="@/assets/img/Logo.png" alt="MishkaMebelLogo">
        <span class="__modal_card_title">Мишка мебель</span>
      </template>
      <ul class="nav-mobile-menu">
        <li class="nav-mobile-menu-item">
          <a href="" class="nav-mobile-link"><span>#</span> Главная</a>
        </li>
        <li class="nav-mobile-menu-item">
          <a href="" class="nav-mobile-link"><span>#</span> Матрасы</a>
        </li>
        <li class="nav-mobile-menu-item">
          <a href="" class="nav-mobile-link"><span>#</span> Чехлы</a>
        </li>
        <li class="nav-mobile-menu-item">
          <a href="" class="nav-mobile-link"><span>#</span> Кровати</a>
        </li>
        <li class="nav-mobile-menu-item">
          <a href="" class="nav-mobile-link"><span>#</span> Хранилища вещей</a>
        </li>
        <li class="nav-mobile-menu-item">
          <a href="" class="nav-mobile-link"><span>#</span> Контакты</a>
        </li>
      </ul>
      <div class="header__tool_kit-user mobile-widget">
        <div class="header__user_info">
          <icon-user></icon-user>
          Личный кабинет
        </div>
        <prime-vue-button icon="pi pi-shopping-cart" aria-label="Submit" badge="99"/>
      </div>
      <div class="header__tool_kit-user mobile-widget">
        <div class="header__user_info">
          <i class="pi pi-spin pi-cog" style="font-size: 2rem; color: var(--primary-color)"></i>
          Панель управления
        </div>
      </div>
    </Dialog>
<!--    EndDialog-->
    <header class="header __header_bottom_line">
      <div class="header__tool_kit">
<!--        MenuButton for mobile phones-->
        <icon-menu-header @click="visible = true" class="header__nav--open--mobile"></icon-menu-header>
<!--        End MenuButton for mobile phones-->
        <img class="logo" src="@/assets/img/Logo.png" alt="MishkaMebelLogo">
<!--        Auth functions-->
        <div class="header__tool_kit-user header__nav--open">
          <div class="header__user_info">
            <icon-user></icon-user>
            Личный кабинет
          </div>
          <prime-vue-button icon="pi pi-shopping-cart" aria-label="Submit" badge="99"/>
        </div>
<!--        End Auth functions-->
<!--        Admin function-->
        <div class="header__tool_kit-user header__nav--open">
          <div class="header__user_info">
            <i class="pi pi-spin pi-cog" style="font-size: 2rem; color: var(--primary-color)"></i>
            Панель управления
          </div>
        </div>
<!--        End admin functions-->
      </div>
<!--      Computer menu-->
      <div class="header__nav header__nav--open">
        <ul class="header_nav-menu">
          <li class="nav-menu__item">
            <a href="" class="nav-menu__link">Матрасы</a>
          </li>
          <li class="nav-menu__item">
            <a href="" class="nav-menu__link">Чехлы</a>
          </li>
          <li class="nav-menu__item">
            <a href="" class="nav-menu__link">Кровати</a>
          </li>
          <li class="nav-menu__item">
            <a href="" class="nav-menu__link">Столы</a>
          </li>
          <li class="nav-menu__item">
            <a href="" class="nav-menu__link">Шкаф и комоды</a>
          </li>
          <li class="nav-menu__item">
            <a href="" class="nav-menu__link">Контакты</a>
          </li>
        </ul>
      </div>
<!--      End computer menu-->
    </header>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog';



import IconUser from "@/components/Icons/IconUser.vue";
import IconSearch from "@/components/Icons/IconSearch.vue";
import IconBasket from "@/components/Icons/IconBasket.vue";
import IconMenuHeader from "@/components/Icons/IconMenuHeader.vue";
//Components
import Button from 'primevue/button';
import Listbox from "primevue/listbox";
export default {
  components: {
    IconUser,
    IconSearch,
    IconBasket,
    IconMenuHeader,
    "PrimeVueButton": Button,
    Dialog,
    Listbox
  },
  data(){
    return {
      visible: false,
      selectPage: null,
      pages: [
        { name: 'Главная', code: 'main' },
        { name: 'Матрасы', code: 'mattress' },
        { name: 'Чехлы', code: 'mattress-cover' },
        { name: 'Кровати', code: 'beds' },
        { name: 'Хранилища вещей', code: 'storage' },
        { name: 'Контакты', code: 'contacts' }
      ]
    };
  },
}
</script>

<style>

</style>