<!--suppress CheckEmptyScriptTag -->
<template>
  <q-page padding>
    <div>
      <h5>Cadastrar livro</h5>
      <q-form
        @submit="postBook"
        @reset="onReset"
        class="q-gutter-md"
      >
        <div class="row q-col-gutter-x-sm">
          <div class="col-6">
            <q-input
              outlined
              v-model="book.title"
              label="Título"
              :rules="[ val => val && val.length > 0 || 'Informação requirida']"
            />
          </div>
          <div class="col-6">
            <q-select outlined v-model="book.author_id" :options="options"
                      use-input input-debounce="0" @filter="filterFn" label="Autor" />
          </div>
        </div>

        <div class="row q-col-gutter-x-sm">
          <div class="col-4">
            <q-input v-if="false" v-model="book.purchase_date" type="date" outlined stack-label="Data de Compra" />
<!--            :rules="[ val => val && val.length > 0 || 'Informe']"-->
            <q-input outlined label="Data de Compra" v-model="book.purchase_date" mask="##/##/####">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date mask="DD-MM-YYYY" v-model="book.purchase_date" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-4">
            <q-input
              outlined
              v-model="book.price"
              label="Valor"
              mask="#,##"
              reverse-fill-mask
              hint="Mask: #.##"
              input-class="text-right"
              :rules="[ val => val && val.length > 0 || 'Informe']"
            />
          </div>
        </div>

        <div class="q-gutter-sm">
          <q-radio v-model="book.ebook" :val="false" label="Versão física" color="teal" />
          <q-radio v-model="book.ebook" :val="true" label="Ebook" color="teal" />
        </div>

        <div class="row q-col-gutter-x-sm">
          <div class="col-4">
            <q-input
              outlined
              type="number"
              v-model="book.page_number"
              label="Nº de Páginas"
              :rules="[val => val !== null && val !== '' || 'Informe']"
            />
          </div>
          <div class="col-4">
            <q-input
              outlined
              v-model="book.owner"
              label="Dono"
              :rules="[ val => val && val.length > 0 || 'Informe o local de partida']"
            />
          </div>
          <div class="col-4">
            <q-input
              outlined
              v-model="book.origin"
              label="Origem"
              :rules="[ val => val && val.length > 0 || 'Informe o local de partida']"
            />
          </div>
        </div>

        <q-toggle v-model="book.is_read" label="Eu já li"/>

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
        </div>
      </q-form>
      <pre v-if="false">{{book}}</pre>
      <pre v-if="false">{{authors}}</pre>
    </div>
    <pre>{{this.testVuex}}</pre>
  </q-page>
</template>

<script>
import { create } from '../../services/books'

export default {
  // name: 'PageName',
  data () {
    return {
      book: {
        title: '',
        author_id: null,
        page_number: '',
        purchase_date: '',
        price: '',
        is_read: false,
        owner: 'Jean',
        origin: 'Amazo',
        ebook: true
      },
      authors: [],
      options: []
    }
  },
  computed: {
    testVuex: function () {
      return this.$store.state.jean.book
    }
  },
  mounted () {
    this.loadAuthors()
    // console.log(this.$store)
  },
  methods: {
    postBook: function () {
      create(this.$axios, this.book)
    },
    loadAuthors () {
      this.$axios.get('/api/authors')
        .then(({ data }) => {
          this.authors = data
        })
        .catch(error => {
          console.log(error)
        })
    },
    onReset () {
      this.$store.commit('jean/someMutation', this.book)
      this.book = {}
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.authors
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.authors.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
