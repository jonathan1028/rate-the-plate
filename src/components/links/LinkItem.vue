<template>
  <div class="link-item">
    <div class="flex items-center">
      <span class="gray">{{linkNumber}}.</span>
      <div v-if="userId" class="ml1 gray f11 upvote" @click="voteForLink()">▲</div>
    </div>
    <div class="ml1">
      <a :href="link.url" class="link">{{link.description}} ({{link.url}})</a>
      <div class="f6 lh-copy gray">
        {{link.votes.length}} votes | by {{link.postedBy ? link.postedBy.name : 'Unknown'}} {{timeDifferenceForDate(link.createdAt)}}
      </div>
    </div>
  </div>
</template>

<script>
import { timeDifferenceForDate } from '../utils'
import { GC_USER_ID, LINKS_PER_PAGE } from '../constants/settings'
import { ALL_LINKS_QUERY, CREATE_VOTE_MUTATION } from '../constants/graphql'

export default {
  name: 'LinkItem',
  // data property added for pagination
  data () {
    return {
      linksPerPage: LINKS_PER_PAGE
    }
  },
  // Since you added pageNumber as one of the props on LinkItem,
  // you need to add it to the props array of the LinkItem component.
  props: ['link', 'index', 'pageNumber'],
  computed: {
    userId () {
      return this.$root.$data.userId
    },
    linkNumber () {
      if (this.$route.path.includes('new')) {
        return (this.pageNumber - 1) * this.linksPerPage + (this.index + 1)
      } else {
        return this.index + 1
      }
    }
  },
  methods: {
    timeDifferenceForDate,
    voteForLink () {
      const userId = localStorage.getItem(GC_USER_ID)
      const voterIds = this.link.votes.map(vote => vote.user.id)
      if (voterIds.includes(userId)) {
        alert(`User (${userId}) already voted for this link.`)
        return
      }
      const linkId = this.link.id
      this.$apollo.mutate({
        mutation: CREATE_VOTE_MUTATION,
        variables: {
          userId,
          linkId
        },
        // This will be called when the server returns the response.
        // It receives the payload of the mutation (data) and the current cache (store) as arguments.
        // You can then use this input to determine a new state for the cache.
        update: (store, { data: { createVote } }) => {
          this.updateStoreAfterVote(store, createVote, linkId)
        }
      })
    },
    updateStoreAfterVote (store, createVote, linkId) {
      // You start by reading the current state of the cached data for the ALL_LINKS_QUERY from the store.
      const data = store.readQuery({
        query: ALL_LINKS_QUERY,
        variables: {
          first: 5,
          skip: 0,
          orderBy: 'createdAt_DESC'
        }
      })

      // Now you’re retrieving the link that the user just voted for from that list.
      // You’re also manipulating that link by resetting its votes to the votes that were just returned by the server.
      const votedLink = data.allLinks.find(link => link.id === linkId)
      votedLink.votes = createVote.link.votes

      // Finally, you take the modified data and write it back into the store.
      store.writeQuery({
        query: ALL_LINKS_QUERY,
        data,
        variables: {
          first: 5,
          skip: 0,
          orderBy: 'createdAt_DESC'
        }
      })

      // The update method will now be executed and ensure that the store gets updated properly
      // after a mutation is performed.
      // The store update will trigger a re-render of the component and thus update the UI with the correct information!
    }
  }
}
</script>

<style scoped>
  .link-item{
    margin: 0.5em auto;
    border-color: black;
    background-color: white;
  }
  /* .upvote {
    cursor: pointer;
  }

  .link {
    text-decoration: none;
    color: black;
  } */
</style>
