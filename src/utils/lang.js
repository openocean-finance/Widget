import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueCookies from 'vue-cookies';

console.log('VueI18n', VueI18n);
Vue.use(VueI18n)
Vue.use(VueCookies)

const CACHE_NAME = 'otLanguage';

const i18n = new VueI18n({
  locale: VueCookies.get(CACHE_NAME) || 'en-US',
  messages: {
    'en-US': require('@/locales/en-US.json')
  }
})

export const switchLang = (lang) => {
  document.body.classList.remove('lang-' + i18n.locale.toLowerCase());
  document.body.classList.add('lang-' + lang.toLowerCase());
  i18n.locale = lang;
  VueCookies.set(CACHE_NAME, lang, 3600 * 24 * 365, '/', process.env.VUE_APP_DOMAIN);
  VueCookies.set('userLanguage', lang === 'en-US' ? 'en' : lang, 3600 * 24 * 365, '/', process.env.VUE_APP_DOMAIN);
};

export const getLanguages = () => [
  {
    label: 'English',
    value: 'en-US',
  }
];

export default i18n