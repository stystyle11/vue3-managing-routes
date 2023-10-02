import { defineStore } from 'pinia';


export const useRouteStore = defineStore("RouteStore",{

    state: () =>{

        return {

            routes:[],
        };

    },
    actions:{
      async  fill(routesData){

            this.routes.push(routesData);
        },


    },
    


})