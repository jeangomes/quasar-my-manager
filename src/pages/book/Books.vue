<template>
  <q-page padding>
    <!-- content -->
    <q-btn v-if="selected.length" @click="removeSelection" color="secondary" label="Remover" />
    <q-input outlined label="Data de Compra" v-model="purchase_date" mask="##/##/####">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date mask="DD-MM-YYYY" v-model="purchase_date" @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-table
      :grid="$q.screen.lt.md"
      title="Livros"
      :data="serverData"
      :columns="columns"
      :filter="filter"
      row-key="id"
      :pagination.sync="serverPagination"
      :loading="loading"
      @request="request"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
    >
    </q-table>
    <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div>
    <q-list bordered separator>
      <q-item v-for="contact in selected" :key="contact.id" class="q-my-sm" clickable v-ripple>

        <q-item-section>
          <q-item-label>{{ contact.title }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>
      <q-separator />
    </q-list>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      selected: [],
      purchase_date: '',
      modalOpen: false,
      filter: '',
      loading: false,
      serverPagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10 //  specifying this determines pagination is server-side
      },
      serverData: [],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'Id',
          align: 'left',
          field: 'id',
          sortable: true
        },
        {
          name: 'title',
          required: true,
          label: 'Título',
          align: 'left',
          field: 'title',
          sortable: true,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 175px'
        },
        {
          required: true,
          label: 'Autor',
          align: 'left',
          field: 'author',
          sortable: true
        },
        {
          required: true,
          label: 'Ebook',
          align: 'left',
          field: 'ebook',
          sortable: true
        },
        {
          required: true,
          label: 'Já li',
          align: 'left',
          field: 'is_read',
          sortable: true
        },
        {
          required: true,
          label: 'Data da Compra',
          align: 'left',
          field: 'purchase_date',
          sortable: true
        },
        {
          required: true,
          label: 'Preço',
          align: 'left',
          field: row => row.price,
          format: (val, row) => 'R$ ' + val, // `${val}%`,
          sortable: true
        }
      ]
    }
  },
  methods: {
    removeSelection () {
      this.selected.forEach(result => {
        this.$axios.patch('/api/books/' + result.id, { data: this.purchase_date })
          .then((response) => {
            this.data = response.data
          })
          .catch(() => {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
          })
      })
      this.request({
        pagination: this.serverPagination,
        filter: this.filter
      })
      this.selected = []
    },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''}
      selected of ${this.serverData.length}`
    },
    request ({ pagination, filter }) {
      // we set QTable to "loading" state
      this.loading = true
      // we do the server data fetch, based on pagination and filter receive
      // (using Axios here, but can be anything; parameters vary based on backend implementation)
      // .get(`/data/${pagination.page}?sortBy=${pagination.sortBy}&descending=${pagination.descending}&filter=${filter}`)
      // console.log(pagination.sortBy, filter)
      if (pagination.sortBy === null) {
        pagination.sortBy = '-id'
      }
      this.$axios.get(`/api/books/?page=${pagination.page}&sort=${pagination.descending ? '-' : ''}${pagination.sortBy}&filter=${filter}`)
        .then(({ data }) => {
          // updating pagination to reflect in the UI
          this.serverPagination = pagination
          // console.log(data.data)
          // we also set (or update) rowsNumber
          this.serverPagination.rowsPerPage = data.meta.per_page
          this.serverPagination.rowsNumber = data.meta.total
          // then we update the rows with the fetched ones
          this.serverData = data.data
          // finally we tell QTable to exit the "loading" state
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    }
  },
  mounted () {
    // once mounted, we need to trigger the initial server data fetch
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  }
}
</script>

<style>
</style>
