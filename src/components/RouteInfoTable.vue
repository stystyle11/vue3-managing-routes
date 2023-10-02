<script setup lang="ts">
import {reactive,ref,computed,onMounted,defineProps} from 'vue';

// Define Props //
export interface RoutesResponse{
  distance:  number,
  travelTime:  number,
  trafficDelay:number,
  violated:  boolean

}
//const fetchedData = ref<Contact[]>(null)

const props = defineProps<{
  recipients:RoutesResponse[]
}>()






console.log('reciepíent da props', props.recipients)
</script>

<template>
    <div v-for="item in  props.recipients"  >
            
           <h1 >
           Travel Time : {{item.travelTime}}
          </h1>
        
           <h1 >
           Distance: {{ item.distance }}
          </h1>
       
         <h1 >
           Violated: {{item.violated }}
          </h1>
        
         
  
    </div>
</template>

<style scoped>

</style>