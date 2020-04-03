<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'

// register child components for our template to use
export default {
  components: {
    EventCard
  }
}
</script>
