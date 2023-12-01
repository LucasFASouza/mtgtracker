<template>
  <div class="home">
    <GamesTable />
  </div>
</template>

<script>
// @ is an alias to /src
import GamesTable from '@/components/GamesTable.vue'

export default {
  name: 'GameTable',
  components: {
    GamesTable
  }
}
</script>
