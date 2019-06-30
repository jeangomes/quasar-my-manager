<template>
  <q-page padding>
    <!-- content -->
    <q-table
      title="Livros"
      :data="serverData"
      :columns="columns"
      :filter="filter"
      row-key="id"
      :pagination.sync="serverPagination"
      :loading="loading"
      @request="request"
    >
    </q-table>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
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
          sortable: true
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
          field: row => 'R$ ' + row.price.toFixed(2).replace('.', ','),
          sortable: true
        }
      ]
    }
  },
  methods: {
    request ({ pagination, filter }) {
      // we set QTable to "loading" state
      this.loading = true
      // we do the server data fetch, based on pagination and filter receive
      // (using Axios here, but can be anything; parameters vary based on backend implementation)
      // .get(`/data/${pagination.page}?sortBy=${pagination.sortBy}&descending=${pagination.descending}&filter=${filter}`)
      // console.log(pagination.sortBy, filter)
      if (pagination.sortBy === null) {
        pagination.sortBy = '-created_at'
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
