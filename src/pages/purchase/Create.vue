<template>
  <q-page padding>
    <div>
      <h5>Cadastrar compra</h5>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <div class="row q-col-gutter-x-sm">
          <div class="col-5">
            <q-input
              outlined
              v-model="name"
              label="De onde *"
              hint="Local de saída"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Informe o local de partida']"
            />
          </div>
          <div class="col-3">
            <q-input
              outlined
              type="number"
              v-model="age"
              label="Poltrona"
              lazy-rules
              :rules="[
          val => val !== null && val !== '' || 'Informe a poltrona',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
            />
          </div>
          <div class="col-4">
            <q-input outlined v-model="travel_date" label="Data e hora da viagem" mask="##/##/#### ##:##">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="travel_date" mask="DD/MM/YYYY HH:mm" />
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="travel_date" mask="DD/MM/YYYY HH:mm" format24h />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

        <div class="row q-col-gutter-x-sm">
          <div class="col-4">
            <q-input
              outlined
              v-model="ticket_destiny"
              label="Destino Passagem"
              :rules="[ val => val && val.length > 0 || 'Informe o local de partida']"
            />
          </div>
          <div class="col-4">
            <q-input
              outlined
              v-model="buy_destiny"
              label="Destino Comprado"
              :rules="[ val => val && val.length > 0 || 'Informe o local de partida']"
            />
          </div>
          <div class="col-4">
            <q-input
              outlined
              v-model="real_destiny"
              label="Destino Real"
              :rules="[ val => val && val.length > 0 || 'Informe o local de partida']"
            />
          </div>
        </div>

        <q-input
          outlined
          v-model="reason_travel"
          label="Motivo da Viagem"
          :rules="[ val => val && val.length > 0 || 'Informe o local de partida']"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      name: null,
      age: null,
      travel_date: '',
      ticket_destiny: '',
      buy_destiny: '',
      real_destiny: '',
      reason_travel: '',
      accept: false
    }
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'You need to acceptb  the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>
