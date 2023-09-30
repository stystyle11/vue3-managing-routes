<script setup lang="ts">
import {reactive,ref,computed,onMounted} from 'vue';
import RouteInfo from '../components/RouteInfoTable.vue'
interface RoutesResponse{
  distance:  number,
  travelTime:  number,
  violated:  boolean

}

interface FormWaypoints {
fieldA:null,
fieldB:null


}
// Define a ref to store the form data
let routeResponse = ref<RoutesResponse>({
  distance: null,
  travelTime:  null,
  violated:  null,
  



})
const formB = ref<FormWaypoints>({
  fieldA:null,
  fieldB: null,

})
     let dataLoaded = false; 
    let success = ref<boolean>(false)

    const submitForm = async ():Promise <void> => {
      
  try {
    const response = await fetch(`https://api.myptv.com/routing/v1/routes?waypoints=49.62127,6.06479&waypoints=48.998014,8.367462&apiKey=VVNfNDQyYzc3NTg4NTQ0NDc0ODgxZWI1ZWJiMzVhNWRiZTA6MzE1MzMyYzgtODUyMS00ZTlkLTkyNzUtY2IzY2YxNTI2YTY5`, {
      method: 'GET',    
 
    })

    if (response.ok) {
      const responseData = await response.json()
     

       routeResponse.value = responseData
    
    
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
    formB.value.fieldA === null ||
    formB.value.fieldB === null     
  )
})


</script>

<template>

  
    <form @submit.prevent="submitForm()">
      <div >
        <label >Country:</label>
        <input v-model="formB.fieldA" type="number" id="fieldA" >
       
      </div>

      <div >
        <label >State:</label>
        <input v-model="formB.fieldB" type="number" id="fieldB" >
      </div>

      
      <button :disabled="isInvalid" type="submit">Submit</button>

    </form>

   <!-- <RecipientsDisplay :recipients="recipients" /> --> 
<RouteInfo
v-if="success "
:recipients="routeResponse"
>
</RouteInfo>
   

</template>

<style scoped>


</style>

