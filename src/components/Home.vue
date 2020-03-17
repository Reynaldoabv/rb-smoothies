<template>
  <div class="home container">
    <div class="card" v-for='smoothie in smoothies' :key='smoothie.id'>
      <div class="card-content">
        <i class='material-icons delete orange-text darken-2' @click='deleteSmoothie(smoothie.id)'>delete</i>
        <h2>{{smoothie.title}}</h2>
        <ul class='ingredients'>
          <li v-for='(ingredient, index) in smoothie.ingredients' :key='index'>
            <span class='chip'>{{ingredient}}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab orange darken-2">
        <router-link :to='{name: "EditSmoothie", params: {smoothie_slug: smoothie.slug}}'>
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>    
  </div>
</template>

<script>
import db from '@/firebase/init'
// import { getHeapSnapshot } from 'v8';

export default {
  name: 'Home',
  data () {
    return {
      smoothies: []
    }
  },
  methods:{
    deleteSmoothie(id){
      db.collection('smoothies').doc(id).delete()
      .then(()=> {
        this.smoothies = this.smoothies.filter(smoothie => {
          return smoothie.id !== id
        })
      })
    }
  },
  created(){
    db.collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.home h2{
  font-size: 1.8rem;
  margin-top: 0;
  text-align: center;
}

.home .ingredients {
  margin: 30px auto
}

.home .ingredients li{
  display: inline-block;
}

.home .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  /* color: #aaa; */
  cursor: pointer;
  font-size: 1.4em;
}
</style>
