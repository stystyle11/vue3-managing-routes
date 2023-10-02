<script setup lang="ts">
import {reactive,ref,computed,onMounted} from 'vue';
import RouteInfo from '../components/RouteInfoTable.vue'

import {useRouteStore} from '../stores/routes'

interface RoutesResponse{
  distance:  number,
  travelTime:  number,
  trafficDelay:number,
  violated:  boolean

}

interface FormWaypoints {
fieldA:null,
fieldB:null


}
// Define a ref to store the form data
let routeResponse = ref<Array<RoutesResponse>>([{
  distance: null,
  travelTime:  null,
  trafficDelay:null,
  violated:  null,

}])
const formDeparture = ref<FormWaypoints>({
  fieldA:null,
  fieldB: null,

})
const formDestination = ref<FormWaypoints>({
  fieldA:null,
  fieldB: null,

})
     let dataLoaded = false; 
    let success = ref<boolean>(false)

const routeStore = useRouteStore();


    const submitForm = async ():Promise <void> => {
      
  try {
    const response = await fetch(`https://api.myptv.com/routing/v1/routes?waypoints=49.62127,6.06479&waypoints=48.998014,8.367462&apiKey=VVNfNDQyYzc3NTg4NTQ0NDc0ODgxZWI1ZWJiMzVhNWRiZTA6MzE1MzMyYzgtODUyMS00ZTlkLTkyNzUtY2IzY2YxNTI2YTY5`, {
      method: 'GET',    
 
    })

    if (response.ok) {
      const responseData = await response.json()
     

       routeResponse.value = responseData
       routeStore.fill(routeResponse.value)
       console.log(routeStore.routes);
    
      success.value = true
      console.log(' response correct:', responseData)
    } else {
      console.error('error in form:', response.status)
    }
  } catch (error) {
    console.error('error sub form:', error)
    throw error
  }
}


const isInvalid = computed(() => {
  return (
    formDeparture.value.fieldA === null ||
    formDeparture.value.fieldB === null ||
    formDestination.value.fieldA === null ||
    formDestination.value.fieldB === null 

  )
})

const toSeconds = computed(() => {
  const currentTime = routeStore.routes[0].travelTime
  return currentTime / 60 

  
})


</script>

<template>

  
    <form @submit.prevent="submitForm()">
      <div >
        <h1>Departure:</h1>
        <label >Country:</label>
        <input v-model="formDeparture.fieldA" type="number" id="fieldA" >
       
      </div>

      <div >
        <label >State:</label>
        <input v-model="formDeparture.fieldB" type="number" id="fieldB" >
      </div>

      
      <button :disabled="isInvalid" type="submit">Submit</button>

    </form>

    <form @submit.prevent="submitForm()">
      <div >
         <h1>Destination:</h1>
        <label >Country:</label>
        <input v-model="formDestination.fieldA" type="number" id="fieldA" >
       
      </div>

      <div >
        <label >State:</label>
        <input v-model="formDestination.fieldB" type="number" id="fieldB" >
      </div>

      
      <button :disabled="isInvalid" type="submit">Submit</button>

    </form>

   <!-- <RecipientsDisplay :recipients="recipients" /> --> 
<div v-if="success">
<RouteInfo

:recipients="routeStore.routes"
>
</RouteInfo>
   
<p>{{ routeStore.routes }}</p>
<p>{{toSeconds}} Minutes to destination</p>

</div>
</template>

<style scoped>


</style>

