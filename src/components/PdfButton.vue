<template>
  <b-button v-on:click="generate">Generate PDF</b-button>
</template>

<script>
import html2pdf from 'html2pdf.js'

export default {
  name: 'pdf',
  props: ['element'],
  data () {
    return {}
  },
  methods: {
    generate () {
      const opt = {
        // jsPDF: { unit: 'in' },
        // margin: 1,
        filename: 'gris.pdf',
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      }
      // console.debug('Generating PDF from ' + this.element)
      const element = document.getElementById(this.element)
      // console.debug(element)
      html2pdf().set(opt).from(element.innerHTML).save()
    }
  }
}
</script>

<style>

</style>
