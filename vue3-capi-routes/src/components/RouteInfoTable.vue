<script setup lang="ts">
import {reactive,ref,computed,onMounted} from 'vue';

// Define Props //
export interface RoutesResponse{
  distance:  number,
  travelTime:  number,
  violated:  boolean

}
//const props = defineProps<{
  //recipients: Array<string>
//}>()

const props = defineProps<{
  recipients:RoutesResponse
}>()

let routeResponse = ref (props.recipients)
console.log('reciepíent da props',props.recipients)
</script>

<template>
    <div>
     
         
         <div>
           <h1 ></h1>
           Travel Time : {{routeResponse.travelTime}}
         </div>
         <div>
           <h1 ></h1>
           Distance: {{ routeResponse.distance }}
         </div>
         <div>
         <h1 ></h1>
           Violated: {{ routeResponse.violated }}
        </div>
        
         
  
    </div>
</template>

<style scoped>

</style>