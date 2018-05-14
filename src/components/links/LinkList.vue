<template>
  <div>
    <div>
      <h4 v-if="loading">Loading...</h4>
      <!-- this creates a link variable and index variable for each item in the list -->
      <link-item
        v-for="(link, index) in orderedLinks"
        :key="link.id"
        :link="link"
        :index="index"
        :pageNumber="pageNumber">
        >
      </link-item>
    </div>
    <div v-if="isNewPage">
      <button v-show="!isFirstPage" @click="previousPage()">Previous</button>
      <button v-show="morePages" @click="nextPage()">Next</button>
    </div>
  </div>
</template>

<script>
import { ALL_LINKS_QUERY, NEW_LINKS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from '../constants/graphql'
import LinkItem from './LinkItem'
import { LINKS_PER_PAGE } from '../constants/settings'
import _ from 'lodash'

export default {
  name: 'LinkList',
  data () {
    return {
      allLinks: [],
      count: 0,
      loading: 0
    }
  },
  components: {
    LinkItem
  },
  computed: {
    // Added computed methods are for pagination
    orderedLinks: function () {
      if (this.$route.path.includes('top')) {
        console.log('Hi')
        return _.orderBy(this.allLinks, 'votes.length').reverse()
      } else {
        console.log('Hi 2')
        return this.allLinks
      }
    },
    isFirstPage () {
      return this.$route.params.page === '1'
    },
    isNewPage () {
      return this.$route.path.includes('new')
    },
    pageNumber (index) {
      return parseInt(this.$route.params.page, 10)
    },
    morePages () {
      return parseInt(this.$route.params.page, 10) < this.count / LINKS_PER_PAGE
    }
  },
  // Since the setup is slightly more complicated now,
  // you are going to calculate the list of links to be rendered in a separate method.
  methods: {
    // All methods here are related to pagination
    // getLinksToRender (isNewPage) {
    //   if (isNewPage) {
    //     return this.$apollo.queries.allLinks
    //   }
    //   const rankedLinks = this.$apollo.queries.allLinks.slice()
    //   rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length)
    //   return rankedLinks
    // },
    nextPage () {
      const page = parseInt(this.$route.params.page, 10)
      if (page < this.count / LINKS_PER_PAGE) {
        const nextPage = page + 1
        this.$router.push({path: `/new/${nextPage}`})
      }
    },
    previousPage () {
      const page = parseInt(this.$route.params.page, 10)
      if (page > 1) {
        const previousPage = page - 1
        this.$router.push({path: `/new/${previousPage}`})
      }
    }
  },
  apollo: {
    allLinks: {
      query: ALL_LINKS_QUERY,
      // You’ve set the variables to a function which runs before the query is executed.
      // This allows you to retrieve the information about the current page
      // from the router (this.$route.params.page) and use it to calculate
      // the chunk of links that you retrieve with first and skip.
      variables () {
        const page = parseInt(this.$route.params.page, 10)
        const isNewPage = this.$route.path.includes('new')
        const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
        const first = isNewPage ? LINKS_PER_PAGE : 100
        const orderBy = isNewPage ? 'createdAt_DESC' : null
        return {
          first,
          skip,
          orderBy
        }
      },
      update (data) {
        this.count = data._allLinksMeta.count
        return data.allLinks
      },
      subscribeToMore:
      [
        {
          document: NEW_LINKS_SUBSCRIPTION,
          // mutate the previous result
          updateQuery: (previous, { subscriptionData }) => {
            const newAllLinks = [
              subscriptionData.data.Link.node,
              ...previous.allLinks
            ]
            const result = {
              ...previous,
              // Changed from allLinks: newAllLinks to the below to add pagination feature
              // This change ensures that only the most recent LINKS_PER_PAGE links
              // will be shown even after an update through subscriptions.
              allLinks: newAllLinks.slice(0, LINKS_PER_PAGE)
            }
            return result
          }
        },
        {
          document: NEW_VOTES_SUBSCRIPTION,
          updateQuery: (previous, { subscriptionData }) => {
            const votedLinkIndex = previous.allLinks.findIndex(link => link.id === subscriptionData.data.Vote.node.link.id)
            const link = subscriptionData.data.Vote.node.link
            const newAllLinks = previous.allLinks.slice()
            newAllLinks[votedLinkIndex] = link
            const result = {
              ...previous,
              allLinks: newAllLinks
            }
            return result
          }
        }
      ]
    }
  }
}
</script>
