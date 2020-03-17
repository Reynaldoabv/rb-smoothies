<template>
    <div class="container edit-smoothie" v-if='smoothie'>
        <h3>Edit <strong class="orange-text darken-2">{{this.smoothie.title}}</strong> Smoothie</h3>
        <form @submit.prevent='editSmoothie'>
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" v-model='smoothie.title' name='title'>
            </div>
            <div class='field' v-for='(ing, index) in smoothie.ingredients' :key="index">
                <label for="ingredient">Ingredients:</label>
                <input type="text" name='ingredient' v-model='smoothie.ingredients[index]'>
                <i class='delete material-icons orange-text darken-2' @click='deleteIng(ing)'>delete</i>
            </div>
            <div class="field add-ingredients">
                <label for="add-ingredients">Add an Ingredients</label>
                <input type="text" name='add-ingredients' @keydown.tab.prevent='addIng' v-model="another">
            </div>
            <div class="field center-align">
                <p v-if='feedback' class='red-text'>{{feedback}}</p>
                <button class='btn orange darken-2'>Update Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data(){
        return {
            smoothie: null,
            another: null,
            feedback: null
        }
    },
    methods:{
        editSmoothie(){
            if(this.smoothie.title) {
                this.feedback = null
                // create slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                title: this.smoothie.title,
                ingredients: this.smoothie.ingredients,
                slug: this.smoothie.slug
                }).then(()=> {
                    this.$router.push({ name: 'Home'})
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.feedbak = "You must enter a smoothie title"
            }
        },
        addIng(){
            if(this.another){
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else{
                this.feedback = "You must enter an ingredients"
            }
        },
        deleteIng(ing){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    },
    created(){
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }
}
</script>

<style scoped>
    .edit-smoothie{
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }
    .edit-smoothie h3{
        font-size: 2em;
        margin: 20px auto;
    }
    .edit-smoothie .field{
        margin: 20px auto;
        position: relative;
    }

    .edit-smoothie .delete {
        position: absolute;
        right: 0px;
        bottom: 16px;
        cursor: pointer;
        font-size: 1.4em;
    }
</style>
