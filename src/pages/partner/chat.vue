<template>
  <v-container class=" full-screen">
    <v-card class="full-screen" flat rounded="lg">
      <v-card-text class="pa-0 full-screen">
        <v-row class="ma-0 full-screen">
          <!-- Sidebar with client list -->
          <v-col cols="12" md="4">
            <div class="client-list">
              <v-card
                v-for="(client, index) in clients"
                :key="index"
                class="border-md rounded-lg ma-2"
                variant="outlined"
              >
                <v-card-text class="d-flex justify-space-between align-center">
                  <div class="d-flex align-center">
                    <v-avatar class="me-4" color="#8E8E8E" size="60">
                      <!-- Placeholder avatar -->
                    </v-avatar>
                    <div>
                      <p class="mb-0 font-weight-bold">{{ client.name }}</p>
                      <p class="mb-0 text-caption text-grey">{{ client.lastMessage }}</p>
                    </div>
                  </div>
                  <div class="d-flex justify-end">
                    <v-chip v-if="client.unreadCount" color="green" small text-color="white">
                      {{ client.unreadCount }}
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-divider class="d-none d-md-block" vertical />
          <v-divider class="d-md-none" />
          <!-- Chat section -->
          <v-col class="d-flex flex-column  full-screen" cols="12" md="8">
            <v-card class="mt-2 " flat rounded="lg" style="background-color: #F1F1F1;">
              <v-card-title>Client 1</v-card-title>
              <v-card-text>
                <div class="d-flex align-center">
                  <v-sheet
                    class="me-2"
                    color="success"
                    :height="20"
                    rounded="circle"
                    :width="20"
                  />
                  <span style="color: green;">online</span>
                </div>
              </v-card-text>
            </v-card>
            <!-- Messages (scrollable area) -->
            <v-card class="flex-grow-1 overflow-y-auto" flat>
              <div class="mt-4">
                <div
                  v-for="(message, index) in messages"
                  :key="index"
                  :class="message.isSent ? 'text-right' : 'text-left'"
                >
                  <v-chip
                    class="ma-1"
                    :color="message.isSent ? 'blue' : 'orange'"
                    text-color="white"
                  >
                    {{ message.text }}
                  </v-chip>
                  <span class="text-caption">{{ message.time }}</span>
                </div>
              </div>
            </v-card>
            <!-- Message input (fixed at bottom) -->
            <div class="d-flex justify-center align-center pa-2 flex-shrink-0">
              <v-text-field
                v-model="newMessage"
                append-icon="mdi-send"
                class="mt-2"
                placeholder="Aa"
                rounded
                variant="outlined"
                @click:append="sendMessage"
                @keyup.enter="sendMessage"
              />
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        clients: [
          { name: 'Client 1', lastMessage: 'Hellooooo', unreadCount: 1 },
          { name: 'Client 2', lastMessage: 'Hi', unreadCount: 0 },
          { name: 'Client 2', lastMessage: 'Hi', unreadCount: 0 },
          { name: 'Client 2', lastMessage: 'Hi', unreadCount: 0 },
        ],
        messages: [
          { text: 'Hellooooo', time: '12:25 PM', isSent: false },
          { text: 'Hiiii', time: '12:26 PM', isSent: true },
        ],
        newMessage: '', // For the input field
      };
    },
    methods: {
      sendMessage () {
        if (this.newMessage.trim()) {
          // Add the new message to the messages array
          this.messages.push({
            text: this.newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSent: true,
          });
          // Update the last message for the client
          this.clients[0].lastMessage = this.newMessage;
          // Clear the input field
          this.newMessage = '';
        }
      },
    },
  };
</script>

<style scoped>
/* Full-screen layout */


/* Ensure the client list is scrollable if needed */
.client-list {
  height: 100%;
  overflow-y: auto;
}

.text-caption {
  font-size: 0.75rem;
  color: #666;
}

</style>
