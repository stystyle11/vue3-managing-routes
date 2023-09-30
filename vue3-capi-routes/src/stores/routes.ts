import { defineStore } from 'pinia';


export const useRouteStore = defineStore("RouteStore",{

    state: () =>{

        return {

            routes:[],
        };

    },
    actions:{
      async  fill(){

            this.routes = await routes;
        },


    },
    


})