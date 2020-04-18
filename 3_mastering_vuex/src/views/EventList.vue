<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event">
      <h4 slot="slot-1">I am the content for slot 1 in heading form</h4>
      <p slot="slot-2">I am the content for slot 2 in the shape of a p tag</p>
    </EventCard>
    <BaseIcon />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

// register child components for our template to use
export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    }
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log('there was an error: ' + error.response)
      })
  }
}
</script>
